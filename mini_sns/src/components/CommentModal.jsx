import { useState, useEffect } from 'react'
import {
  Drawer, Box, Typography, Avatar, TextField, IconButton,
  List, ListItem, ListItemAvatar, ListItemText, Divider, CircularProgress
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { formatDistanceToNow } from '../utils/dateUtils'

const CommentModal = ({ open, onClose, postId }) => {
  const { user, profile } = useAuth()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (open && postId) fetchComments()
  }, [open, postId])

  const fetchComments = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('comments')
      .select('*, profiles(nickname, profile_image_url)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
    setComments(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim() || !user) return
    setSubmitting(true)
    await supabase.from('comments').insert({ post_id: postId, user_id: user.id, content: newComment.trim() })
    setNewComment('')
    await fetchComments()
    setSubmitting(false)
  }

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          maxWidth: 480,
          mx: 'auto',
          maxHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      sx={{ '& .MuiBackdrop-root': { backdropFilter: 'blur(2px)', bgcolor: 'rgba(0,0,0,0.5)' } }}
    >
      {/* 헤더 */}
      <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #EFD9D4' }}>
        <Box sx={{ width: 40, height: 4, bgcolor: '#BCAAA4', borderRadius: 2, mx: 'auto', position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 8 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#3E2723' }}>댓글</Typography>
        <IconButton size="small" onClick={onClose}><CloseIcon fontSize="small" /></IconButton>
      </Box>

      {/* 댓글 목록 */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 1 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress size={24} sx={{ color: '#6D4C41' }} /></Box>
        ) : comments.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">첫 댓글을 남겨보세요!</Typography>
          </Box>
        ) : (
          <List disablePadding>
            {comments.map((comment) => (
              <ListItem key={comment.id} alignItems="flex-start" sx={{ py: 1 }}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                  <Avatar src={comment.profiles?.profile_image_url} sx={{ width: 32, height: 32 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#3E2723' }}>
                        {comment.profiles?.nickname}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDistanceToNow(comment.created_at)}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: '#3E2723', mt: 0.3 }}>{comment.content}</Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* 댓글 입력 */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ px: 2, py: 1.5, borderTop: '1px solid #EFD9D4', display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Avatar src={profile?.profile_image_url} sx={{ width: 32, height: 32 }} />
        <TextField
          fullWidth
          size="small"
          placeholder={user ? '댓글 달기...' : '로그인 후 댓글을 달 수 있어요'}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!user || submitting}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 20, fontSize: '0.875rem' } }}
        />
        <IconButton type="submit" disabled={!newComment.trim() || !user || submitting} sx={{ color: '#6D4C41' }}>
          {submitting ? <CircularProgress size={18} /> : <SendIcon />}
        </IconButton>
      </Box>
    </Drawer>
  )
}

export default CommentModal
