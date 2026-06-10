import { useState, useEffect } from 'react'
import {
  Box, Avatar, Typography, Grid, IconButton, CircularProgress,
  Modal, Backdrop, Fade
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from '../utils/dateUtils'
import CommentModal from '../components/CommentModal'

const MyPage = () => {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)
  const [commentOpen, setCommentOpen] = useState(false)

  useEffect(() => {
    if (user) fetchMyPosts()
    else setLoading(false)
  }, [user])

  const fetchMyPosts = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('posts')
      .select('*, profiles(nickname, profile_image_url)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  if (!user) {
    return (
      <Layout>
        <Box sx={{ textAlign: 'center', pt: 8 }}>
          <Typography variant="body1" sx={{ color: '#795548', mb: 2 }}>로그인이 필요합니다</Typography>
          <Typography variant="body2" sx={{ color: '#BCAAA4', cursor: 'pointer' }} onClick={() => navigate('/login')}>
            로그인하러 가기 →
          </Typography>
        </Box>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* 프로필 영역 */}
      <Box sx={{ bgcolor: '#fff', px: 3, pt: 3, pb: 2, mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
          <Avatar
            src={profile?.profile_image_url || `https://picsum.photos/seed/${user.id}/100/100`}
            sx={{ width: 80, height: 80, border: '3px solid #EFD9D4' }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#3E2723', lineHeight: 1.3 }}>
              {profile?.nickname || '카페러버'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#BCAAA4' }}>{user.email}</Typography>
            <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3E2723' }}>{posts.length}</Typography>
                <Typography variant="caption" sx={{ color: '#BCAAA4' }}>게시물</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3E2723' }}>{profile?.follower_count || 0}</Typography>
                <Typography variant="caption" sx={{ color: '#BCAAA4' }}>팔로워</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3E2723' }}>{profile?.follow_count || 0}</Typography>
                <Typography variant="caption" sx={{ color: '#BCAAA4' }}>팔로잉</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          onClick={handleSignOut}
          sx={{
            display: 'inline-block',
            px: 2,
            py: 0.5,
            borderRadius: 10,
            border: '1px solid #EFD9D4',
            cursor: 'pointer',
          }}
        >
          <Typography variant="caption" sx={{ color: '#BCAAA4' }}>로그아웃</Typography>
        </Box>
      </Box>

      {/* 3열 그리드 */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
          <CircularProgress sx={{ color: '#6D4C41' }} />
        </Box>
      ) : posts.length === 0 ? (
        <Box sx={{ textAlign: 'center', pt: 6 }}>
          <Typography variant="body2" sx={{ color: '#BCAAA4' }}>아직 올린 게시물이 없어요</Typography>
        </Box>
      ) : (
        <Grid container spacing={0.3}>
          {posts.map((post) => (
            <Grid item xs={4} key={post.id}>
              <Box
                component="img"
                src={post.image_url}
                alt="post thumb"
                onClick={() => setSelectedPost(post)}
                sx={{
                  width: '100%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  display: 'block',
                  '&:hover': { opacity: 0.85 },
                }}
                onError={(e) => { e.target.src = `https://picsum.photos/seed/${post.id}/200/200` }}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* 게시물 상세 모달 */}
      <Modal
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { sx: { backdropFilter: 'blur(3px)', bgcolor: 'rgba(0,0,0,0.7)' } } }}
      >
        <Fade in={!!selectedPost}>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: 480,
              height: 'calc(100vh - 60px)',
              bgcolor: '#fff',
              overflowY: 'auto',
              outline: 'none',
            }}
          >
            {selectedPost && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, borderBottom: '1px solid #EFD9D4' }}>
                  <IconButton size="small" onClick={() => setSelectedPost(null)} sx={{ color: '#6D4C41', mr: 1 }}>
                    <CloseIcon />
                  </IconButton>
                  <Avatar src={selectedPost.profiles?.profile_image_url} sx={{ width: 32, height: 32, mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#3E2723' }}>
                    {selectedPost.profiles?.nickname}
                  </Typography>
                </Box>
                <Box
                  component="img"
                  src={selectedPost.image_url}
                  alt="post"
                  sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = `https://picsum.photos/seed/${selectedPost.id}/400/400` }}
                />
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <FavoriteBorderIcon sx={{ color: '#795548', fontSize: 22 }} />
                    <Typography variant="body2" sx={{ color: '#795548', fontWeight: 600 }}>{selectedPost.likes_count}</Typography>
                    <IconButton size="small" onClick={() => setCommentOpen(true)} sx={{ color: '#795548', ml: 0.5 }}>
                      <ChatBubbleOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  {selectedPost.caption && (
                    <Typography variant="body2" sx={{ color: '#3E2723', mb: 0.5 }}>
                      <strong>{selectedPost.profiles?.nickname}</strong> {selectedPost.caption}
                    </Typography>
                  )}
                  {selectedPost.hashtags && (
                    <Typography variant="caption" sx={{ color: '#6D4C41' }}>{selectedPost.hashtags}</Typography>
                  )}
                  <Typography variant="caption" sx={{ color: '#BCAAA4', display: 'block', mt: 1 }}>
                    {formatDistanceToNow(selectedPost.created_at)}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>

      {selectedPost && (
        <CommentModal open={commentOpen} onClose={() => setCommentOpen(false)} postId={selectedPost.id} />
      )}
    </Layout>
  )
}

export default MyPage
