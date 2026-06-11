import { useState, useEffect } from 'react'
import {
  Drawer, Box, Typography, Avatar, TextField, IconButton,
  List, ListItem, ListItemAvatar, CircularProgress
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { formatDistanceToNow } from '../utils/dateUtils'

const CommentModal = ({ open, onClose, postId }) => {
  const { user, profile } = useAuth()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editContent, setEditContent] = useState('')

  useEffect(() => {
    if (open && postId) fetchComments()
  }, [open, postId])

  const fetchComments = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('sns_comments')
      .select('*, sns_profiles(nickname, profile_image_url)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
    setComments(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim() || !user) return
    setSubmitting(true)
    await supabase.from('sns_comments').insert({ post_id: postId, user_id: user.id, content: newComment.trim() })
    setNewComment('')
    await fetchComments()
    setSubmitting(false)
  }

  const handleEditStart = (comment) => {
    setEditingId(comment.id)
    setEditContent(comment.content)
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditContent('')
  }

  const handleEditSave = async (commentId) => {
    if (!editContent.trim()) return
    await supabase
      .from('sns_comments')
      .update({ content: editContent.trim() })
      .eq('id', commentId)
    setEditingId(null)
    setEditContent('')
    await fetchComments()
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
              <ListItem key={comment.id} alignItems="flex-start" sx={{ py: 1, pr: 0 }}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                  <Avatar src={comment.sns_profiles?.profile_image_url} sx={{ width: 32, height: 32 }} />
                </ListItemAvatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#3E2723' }}>
                      {comment.sns_profiles?.nickname}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDistanceToNow(comment.created_at)}
                    </Typography>
                  </Box>

                  {editingId === comment.id ? (
                    /* 수정 모드 */
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        autoFocus
                        multiline
                        maxRows={3}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: '0.875rem' } }}
                      />
                      <IconButton size="small" onClick={() => handleEditSave(comment.id)} sx={{ color: '#6D4C41' }}>
                        <CheckIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={handleEditCancel} sx={{ color: '#BCAAA4' }}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ) : (
                    /* 일반 모드 */
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#3E2723', flex: 1 }}>{comment.content}</Typography>
                      {user?.id === comment.user_id && (
                        <IconButton
                          size="small"
                          onClick={() => handleEditStart(comment)}
                          sx={{ color: '#BCAAA4', p: 0.3, ml: 0.5, '&:hover': { color: '#6D4C41' } }}
                        >
                          <EditIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      )}
                    </Box>
                  )}
                </Box>
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
