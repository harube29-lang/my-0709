import { useState } from 'react'
import {
  Box, Avatar, Typography, IconButton, Chip
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CommentModal from './CommentModal'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { formatDistanceToNow } from '../utils/dateUtils'

const PostCard = ({ post, onLikeUpdate }) => {
  const { user } = useAuth()
  const [commentOpen, setCommentOpen] = useState(false)
  const [liked, setLiked] = useState(post.user_liked || false)
  const [likesCount, setLikesCount] = useState(post.likes_count || 0)

  const handleLike = async () => {
    if (!user) return
    if (liked) {
      await supabase.from('likes').delete().eq('post_id', post.id).eq('user_id', user.id)
      setLiked(false)
      setLikesCount((c) => c - 1)
    } else {
      await supabase.from('likes').insert({ post_id: post.id, user_id: user.id })
      setLiked(true)
      setLikesCount((c) => c + 1)
    }
    onLikeUpdate?.()
  }

  const hashtags = post.hashtags ? post.hashtags.split(' ').filter(Boolean) : []

  return (
    <>
      <Box sx={{ bgcolor: '#fff', mb: 1, borderBottom: '1px solid #F5EBE8' }}>
        {/* 상단: 프로필 + 위치 */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, gap: 1.2 }}>
          <Avatar
            src={post.profiles?.profile_image_url}
            sx={{ width: 38, height: 38, border: '2px solid #EFD9D4' }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#3E2723', lineHeight: 1.3 }}>
              {post.profiles?.nickname}
            </Typography>
            {post.location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                <LocationOnIcon sx={{ fontSize: 12, color: '#BCAAA4' }} />
                <Typography variant="caption" sx={{ color: '#BCAAA4' }}>{post.location}</Typography>
              </Box>
            )}
          </Box>
          <Typography variant="caption" color="text.secondary">
            {formatDistanceToNow(post.created_at)}
          </Typography>
        </Box>

        {/* 이미지 */}
        <Box
          component="img"
          src={post.image_url}
          alt="post"
          sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
          onError={(e) => { e.target.src = `https://picsum.photos/seed/${post.id}/400/400` }}
        />

        {/* 하단: 좋아요/댓글 */}
        <Box sx={{ px: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" onClick={handleLike} sx={{ color: liked ? '#e53935' : '#795548' }}>
              {liked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            </IconButton>
            <Typography variant="caption" sx={{ color: '#795548', mr: 1.5, fontWeight: 600 }}>
              {likesCount}
            </Typography>
            <IconButton size="small" onClick={() => setCommentOpen(true)} sx={{ color: '#795548' }}>
              <ChatBubbleOutlinedIcon fontSize="small" />
            </IconButton>
            <Typography variant="caption" sx={{ color: '#795548', fontWeight: 600 }}>
              {post.comments_count || 0}
            </Typography>
          </Box>

          {/* 캡션 */}
          {post.caption && (
            <Box sx={{ px: 1, pb: 1 }}>
              <Typography variant="body2" sx={{ color: '#3E2723' }}>
                <strong>{post.profiles?.nickname}</strong> {post.caption}
              </Typography>
            </Box>
          )}

          {/* 해시태그 */}
          {hashtags.length > 0 && (
            <Box sx={{ px: 1, pb: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {hashtags.map((tag, i) => (
                <Typography key={i} variant="caption" sx={{ color: '#6D4C41', fontWeight: 500 }}>
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </Typography>
              ))}
            </Box>
          )}

          {/* 최근 댓글 2개 */}
          {post.recent_comments?.slice(0, 2).map((c) => (
            <Box key={c.id} sx={{ px: 1, pb: 0.5 }}>
              <Typography variant="caption" sx={{ color: '#3E2723' }}>
                <strong>{c.profiles?.nickname}</strong> {c.content}
              </Typography>
            </Box>
          ))}

          {(post.comments_count || 0) > 2 && (
            <Box sx={{ px: 1, pb: 1 }}>
              <Typography
                variant="caption"
                sx={{ color: '#BCAAA4', cursor: 'pointer' }}
                onClick={() => setCommentOpen(true)}
              >
                댓글 {post.comments_count}개 모두 보기
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <CommentModal open={commentOpen} onClose={() => setCommentOpen(false)} postId={post.id} />
    </>
  )
}

export default PostCard
