import { useState, useEffect } from 'react'
import {
  Box, Typography, TextField, Button, IconButton,
  CircularProgress, Alert, Skeleton
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RefreshIcon from '@mui/icons-material/Refresh'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import TagIcon from '@mui/icons-material/Tag'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

const UNSPLASH_SEEDS = ['coffee', 'cafe', 'latte', 'espresso', 'cappuccino', 'bakery', 'pastry', 'dessert']

const getRandomImageUrl = (seed) => {
  const s = seed || UNSPLASH_SEEDS[Math.floor(Math.random() * UNSPLASH_SEEDS.length)]
  const id = Math.floor(Math.random() * 1000)
  return `https://loremflickr.com/400/400/${s}?lock=${id}`
}

const CreatePostPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [form, setForm] = useState({ caption: '', hashtags: '', location: '' })
  const [imageUrl, setImageUrl] = useState('')
  const [imageLoading, setImageLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadNewImage()
  }, [])

  const loadNewImage = () => {
    setImageLoading(true)
    const url = getRandomImageUrl()
    setImageUrl(url)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) { setError('로그인이 필요합니다.'); return }
    if (!imageUrl) { setError('이미지를 선택해주세요.'); return }
    setSubmitting(true)
    setError('')
    const { error } = await supabase.from('posts').insert({
      user_id: user.id,
      caption: form.caption,
      hashtags: form.hashtags,
      location: form.location,
      image_url: imageUrl,
    })
    if (error) {
      setError('게시물 등록 중 오류가 발생했습니다.')
      setSubmitting(false)
    } else {
      navigate('/')
    }
  }

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', bgcolor: '#FFF8F5', minHeight: '100vh', pb: 3 }}>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 1, borderBottom: '1px solid #EFD9D4', bgcolor: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: '#6D4C41' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#3E2723', flex: 1, textAlign: 'center' }}>
          새 게시물
        </Typography>
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          sx={{ color: '#6D4C41', fontWeight: 700, minWidth: 'auto', pr: 2 }}
        >
          {submitting ? <CircularProgress size={18} /> : '공유'}
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mx: 2, mt: 1, borderRadius: 2 }}>{error}</Alert>}

      {/* 이미지 미리보기 */}
      <Box sx={{ position: 'relative' }}>
        {imageLoading && (
          <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: '1/1' }} />
        )}
        <Box
          component="img"
          src={imageUrl}
          alt="preview"
          onLoad={() => setImageLoading(false)}
          onError={() => { setImageUrl(`https://picsum.photos/seed/${Date.now()}/400/400`); setImageLoading(false) }}
          sx={{
            width: '100%',
            aspectRatio: '1/1',
            objectFit: 'cover',
            display: imageLoading ? 'none' : 'block',
          }}
        />
        <IconButton
          onClick={loadNewImage}
          sx={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            bgcolor: 'rgba(255,255,255,0.85)',
            color: '#6D4C41',
            '&:hover': { bgcolor: '#fff' },
            boxShadow: 2,
          }}
        >
          <RefreshIcon />
        </IconButton>
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            bgcolor: 'rgba(109,76,65,0.75)',
            color: '#fff',
            borderRadius: 10,
            px: 1.5,
            py: 0.3,
          }}
        >
          <Typography variant="caption">이미지 변경 →</Typography>
        </Box>
      </Box>

      {/* 입력 폼 */}
      <Box component="form" onSubmit={handleSubmit} sx={{ px: 2, pt: 2 }}>
        <TextField
          fullWidth
          name="caption"
          label="카페 리뷰를 작성해보세요..."
          multiline
          minRows={3}
          value={form.caption}
          onChange={handleChange}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
        <TextField
          fullWidth
          name="hashtags"
          label="해시태그 (#카페 #아메리카노)"
          value={form.hashtags}
          onChange={handleChange}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          InputProps={{ startAdornment: <TagIcon sx={{ color: '#BCAAA4', mr: 1, fontSize: 18 }} /> }}
          size="small"
        />
        <TextField
          fullWidth
          name="location"
          label="위치 추가"
          value={form.location}
          onChange={handleChange}
          sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          InputProps={{ startAdornment: <LocationOnIcon sx={{ color: '#BCAAA4', mr: 1, fontSize: 18 }} /> }}
          size="small"
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={submitting}
          sx={{ bgcolor: '#6D4C41', '&:hover': { bgcolor: '#4B2C20' }, py: 1.3, borderRadius: 20, fontSize: '1rem' }}
        >
          {submitting ? <CircularProgress size={22} color="inherit" /> : '게시물 등록'}
        </Button>
      </Box>
    </Box>
  )
}

export default CreatePostPage
