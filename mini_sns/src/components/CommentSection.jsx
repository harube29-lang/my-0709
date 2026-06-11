import { useState, useEffect, useRef } from 'react'
import {
  Box, Typography, Avatar, TextField, IconButton,
  CircularProgress, Menu, MenuItem, Divider
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { formatDistanceToNow } from '../utils/dateUtils'

const CommentSection = ({ postId, onCountChange }) => {
  const { user, profile } = useAuth()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editContent, setEditContent] = useState('')
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [menuCommentId, setMenuCommentId] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!postId) return

    fetchComments()

    // 실시간 구독 — INSERT / UPDATE / DELETE 모두 반영
    const channel = supabase
      .channel(`sns_comments_${postId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sns_comments', filter: `post_id=eq.${postId}` },
        () => fetchComments()
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [postId])

  const fetchComments = async () => {
    const { data } = await supabase
      .from('sns_comments')
      .select('*, sns_profiles(nickname, profile_image_url)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
    const list = data || []
    setComments(list)
    setLoading(false)
    onCountChange?.(list.length)
  }

  // 댓글 작성
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim() || !user) return
    setSubmitting(true)
    const { error } = await supabase.from('sns_comments').insert({
      post_id: postId,
      user_id: user.id,
      content: newComment.trim(),
    })
    if (!error) setNewComment('')
    setSubmitting(false)
    // realtime이 자동으로 fetchComments 호출
  }

  // ... 메뉴
  const handleMenuOpen = (e, commentId) => {
    e.stopPropagation()
    setMenuAnchor(e.currentTarget)
    setMenuCommentId(commentId)
  }
  const handleMenuClose = () => {
    setMenuAnchor(null)
    setMenuCommentId(null)
  }

  // 수정 시작
  const handleEditStart = () => {
    const comment = comments.find(c => c.id === menuCommentId)
    if (comment) { setEditingId(comment.id); setEditContent(comment.content) }
    handleMenuClose()
  }
  const handleEditCancel = () => { setEditingId(null); setEditContent('') }

  // 수정 저장 — updated_at은 DB 트리거가 자동 갱신
  const handleEditSave = async (commentId) => {
    if (!editContent.trim()) return
    await supabase
      .from('sns_comments')
      .update({ content: editContent.trim() })
      .eq('id', commentId)
      .eq('user_id', user.id)   // RLS 보조
    setEditingId(null)
    setEditContent('')
  }

  // 삭제
  const handleDelete = async () => {
    const id = menuCommentId
    handleMenuClose()
    await supabase
      .from('sns_comments')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)   // RLS 보조
  }

  return (
    <Box sx={{ borderTop: '1px solid #EFD9D4' }}>

      {/* 섹션 헤더 */}
      <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 700, color: '#3E2723', fontSize: '0.85rem' }}>
          댓글 {comments.length > 0 ? comments.length : ''}
        </Typography>
      </Box>

      {/* 댓글 목록 */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress size={20} sx={{ color: '#6D4C41' }} />
        </Box>
      ) : comments.length === 0 ? (
        <Box sx={{ px: 2, py: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#BCAAA4', fontSize: '0.82rem' }}>
            첫 댓글을 남겨보세요 ☕
          </Typography>
        </Box>
      ) : (
        <Box sx={{ px: 2, pb: 0.5 }}>
          {comments.map((comment, idx) => (
            <Box key={comment.id}>
              {idx > 0 && <Divider sx={{ borderColor: '#F9F0EE' }} />}
              <Box sx={{ display: 'flex', gap: 1, py: 1.2, alignItems: 'flex-start' }}>

                {/* 아바타 */}
                <Avatar
                  src={comment.sns_profiles?.profile_image_url}
                  sx={{ width: 28, height: 28, flexShrink: 0, mt: 0.2 }}
                />

                {/* 본문 */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.8, flexWrap: 'wrap', mb: 0.2 }}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#3E2723' }}>
                      {comment.sns_profiles?.nickname}
                    </Typography>
                    <Typography sx={{ fontSize: '0.68rem', color: '#BCAAA4' }}>
                      {formatDistanceToNow(comment.created_at)}
                    </Typography>
                    {comment.updated_at && comment.updated_at !== comment.created_at && (
                      <Typography sx={{ fontSize: '0.65rem', color: '#BCAAA4' }}>(수정됨)</Typography>
                    )}
                  </Box>

                  {editingId === comment.id ? (
                    /* 수정 모드 */
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3 }}>
                      <TextField
                        fullWidth size="small"
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        autoFocus multiline maxRows={4}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleEditSave(comment.id) }
                          if (e.key === 'Escape') handleEditCancel()
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: '0.82rem' } }}
                      />
                      <IconButton size="small" onClick={() => handleEditSave(comment.id)}
                        sx={{ color: '#6D4C41', p: 0.5, flexShrink: 0 }}>
                        <CheckIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <IconButton size="small" onClick={handleEditCancel}
                        sx={{ color: '#BCAAA4', p: 0.5, flexShrink: 0 }}>
                        <ClearIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  ) : (
                    /* 일반 모드 */
                    <Typography sx={{ fontSize: '0.85rem', color: '#3E2723', lineHeight: 1.5, wordBreak: 'break-word' }}>
                      {comment.content}
                    </Typography>
                  )}
                </Box>

                {/* 수정/삭제 버튼 — 본인 댓글만 */}
                {user?.id === comment.user_id && editingId !== comment.id && (
                  <IconButton
                    size="small"
                    onClick={e => handleMenuOpen(e, comment.id)}
                    sx={{ color: '#BCAAA4', p: 0.3, flexShrink: 0, '&:hover': { color: '#6D4C41' } }}
                  >
                    <MoreVertIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* 수정 / 삭제 드롭다운 메뉴 */}
      <Menu
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={handleMenuClose}
        PaperProps={{ sx: { borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.12)', minWidth: 110 } }}
      >
        <MenuItem onClick={handleEditStart} sx={{ fontSize: '0.85rem', color: '#3E2723', py: 1 }}>
          수정하기
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ fontSize: '0.85rem', color: '#ef5350', py: 1 }}>
          삭제하기
        </MenuItem>
      </Menu>

      {/* 댓글 입력창 */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          px: 2, py: 1.2,
          borderTop: '1px solid #EFD9D4',
          display: 'flex', alignItems: 'center', gap: 1,
        }}
      >
        <Avatar src={profile?.profile_image_url} sx={{ width: 28, height: 28, flexShrink: 0 }} />
        <TextField
          inputRef={inputRef}
          fullWidth size="small"
          placeholder={user ? '댓글 달기...' : '로그인 후 댓글을 달 수 있어요'}
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          disabled={!user || submitting}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e) }
          }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 20, fontSize: '0.85rem' } }}
        />
        <IconButton
          type="submit"
          disabled={!newComment.trim() || !user || submitting}
          sx={{ color: newComment.trim() && user ? '#6D4C41' : '#BCAAA4', p: 0.5, flexShrink: 0 }}
        >
          {submitting ? <CircularProgress size={16} /> : <SendIcon sx={{ fontSize: 20 }} />}
        </IconButton>
      </Box>

    </Box>
  )
}

export default CommentSection
