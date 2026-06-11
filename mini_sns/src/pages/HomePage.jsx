import { useState, useEffect } from 'react'
import {
  Box, Typography, CircularProgress, Avatar,
  Modal, Backdrop, Fade, IconButton
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined'
import CloseIcon from '@mui/icons-material/Close'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import CommentSection from '../components/CommentSection'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { formatDistanceToNow } from '../utils/dateUtils'

import { CAFE_IMAGES, resolvePostImage } from '../utils/cafeImages'

const getPostImage = resolvePostImage

const HomePage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [commentCount, setCommentCount] = useState(0)

  useEffect(() => {
    fetchPosts()
  }, [user])

  useEffect(() => {
    if (selectedPost) {
      setLiked(selectedPost.user_liked || false)
      setLikesCount(selectedPost.likes_count || 0)
      setCommentCount(selectedPost.comments_count || 0)
    }
  }, [selectedPost])

  const fetchPosts = async () => {
    setLoading(true)
    const { data: postsData } = await supabase
      .from('sns_posts')
      .select('*, sns_profiles(nickname, profile_image_url)')
      .order('created_at', { ascending: false })

    if (!postsData) { setLoading(false); return }

    const enriched = await Promise.all(
      postsData.map(async (post) => {
        const { count } = await supabase
          .from('sns_comments')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', post.id)

        let userLiked = false
        if (user) {
          const { data: likeData } = await supabase
            .from('sns_likes')
            .select('id')
            .eq('post_id', post.id)
            .eq('user_id', user.id)
            .maybeSingle()
          userLiked = !!likeData
        }
        return { ...post, comments_count: count || 0, user_liked: userLiked }
      })
    )

    setPosts(enriched)
    setLoading(false)
  }

  const handleLike = async () => {
    if (!selectedPost) return
    if (!user) { navigate('/login'); return }
    if (liked) {
      await supabase.from('sns_likes').delete().eq('post_id', selectedPost.id).eq('user_id', user.id)
      setLiked(false)
      setLikesCount((c) => c - 1)
    } else {
      await supabase.from('sns_likes').insert({ post_id: selectedPost.id, user_id: user.id })
      setLiked(true)
      setLikesCount((c) => c + 1)
    }
  }

  const profile = selectedPost?.sns_profiles

  return (
    <Layout>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
          <CircularProgress sx={{ color: '#6D4C41' }} />
        </Box>
      ) : posts.length === 0 ? (
        <Box sx={{ textAlign: 'center', pt: 8, px: 3 }}>
          <Typography variant="h6" sx={{ color: '#BCAAA4', mb: 1 }}>☕</Typography>
          <Typography variant="body1" sx={{ color: '#795548' }}>아직 게시물이 없어요</Typography>
          <Typography variant="body2" sx={{ color: '#BCAAA4', mt: 0.5 }}>첫 번째 카페 리뷰를 올려보세요!</Typography>
        </Box>
      ) : (
        <Box sx={{ px: 2, pt: 2, pb: 1 }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
          }}>
            {posts.map((post, idx) => (
              <Box
                key={post.id}
                onClick={() => setSelectedPost(post)}
                sx={{
                  position: 'relative', cursor: 'pointer',
                  borderRadius: '8px', overflow: 'hidden',
                  '&:hover .overlay': { opacity: 1 },
                }}
              >
                <Box
                  component="img"
                  src={getPostImage(post.image_url, idx)}
                  alt="post"
                  sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = CAFE_IMAGES[0] }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute', inset: 0,
                    bgcolor: 'rgba(0,0,0,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5,
                    opacity: 0, transition: 'opacity 0.2s',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                    <FavoriteIcon sx={{ color: '#fff', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700 }}>{post.likes_count}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                    <ChatBubbleOutlinedIcon sx={{ color: '#fff', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700 }}>{post.comments_count}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* 게시물 상세 모달 */}
      <Modal
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { sx: { backdropFilter: 'blur(3px)', bgcolor: 'rgba(0,0,0,0.6)' } } }}
      >
        <Fade in={!!selectedPost}>
          <Box sx={{
            position: 'fixed',
            top: '52px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 480,
            height: 'calc(100vh - 112px)',
            bgcolor: '#fff',
            overflowY: 'auto',
            outline: 'none',
            borderRadius: '0 0 12px 12px',
          }}>
            {selectedPost && (
              <>
                {/* 모달 헤더 */}
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.2, borderBottom: '1px solid #EFD9D4', position: 'sticky', top: 0, bgcolor: '#fff', zIndex: 1 }}>
                  <Avatar src={profile?.profile_image_url} sx={{ width: 32, height: 32, mr: 1.2, border: '2px solid #EFD9D4' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#3E2723', lineHeight: 1.2 }}>
                      {profile?.nickname}
                    </Typography>
                    {selectedPost.location && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                        <LocationOnIcon sx={{ fontSize: 11, color: '#BCAAA4' }} />
                        <Typography variant="caption" sx={{ color: '#BCAAA4', fontSize: '0.68rem' }}>{selectedPost.location}</Typography>
                      </Box>
                    )}
                  </Box>
                  <Typography variant="caption" sx={{ color: '#BCAAA4', mr: 1 }}>{formatDistanceToNow(selectedPost.created_at)}</Typography>
                  <IconButton size="small" onClick={() => setSelectedPost(null)} sx={{ color: '#9C786C' }}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>

                {/* 이미지 */}
                <Box
                  component="img"
                  src={getPostImage(selectedPost.image_url, selectedPost.id)}
                  alt="post"
                  sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = CAFE_IMAGES[0] }}
                />

                {/* 좋아요·댓글 카운트 */}
                <Box sx={{ px: 1.5, pt: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="small" onClick={handleLike} sx={{ color: liked ? '#e53935' : '#795548' }}>
                      {liked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                    </IconButton>
                    <Typography variant="caption" sx={{ color: '#795548', fontWeight: 600, mr: 1.5 }}>{likesCount}</Typography>
                    <ChatBubbleOutlinedIcon sx={{ fontSize: 18, color: '#795548', mr: 0.5 }} />
                    <Typography variant="caption" sx={{ color: '#795548', fontWeight: 600 }}>{commentCount}</Typography>
                  </Box>

                  {selectedPost.caption && (
                    <Box sx={{ px: 0.5, pb: 1 }}>
                      <Typography variant="body2" sx={{ color: '#3E2723' }}>
                        <strong>{profile?.nickname}</strong> {selectedPost.caption}
                      </Typography>
                    </Box>
                  )}
                  {selectedPost.hashtags && (
                    <Box sx={{ px: 0.5, pb: 1 }}>
                      <Typography variant="caption" sx={{ color: '#6D4C41', fontWeight: 500 }}>{selectedPost.hashtags}</Typography>
                    </Box>
                  )}
                </Box>

                {/* 댓글 섹션 — 인라인 */}
                <CommentSection
                  postId={selectedPost.id}
                  onCountChange={setCommentCount}
                />
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Layout>
  )
}

export default HomePage
