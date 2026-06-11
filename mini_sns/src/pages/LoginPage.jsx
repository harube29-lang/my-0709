import { useState } from 'react'
import { Box, Typography, TextField, Button, CircularProgress, Alert, IconButton } from '@mui/material'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const LoginPage = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await signIn(form.email, form.password)
    if (error) {
      if (error.message?.includes('Email not confirmed'))
        setError('이메일 인증이 필요합니다. 가입 시 받은 메일의 링크를 클릭해주세요.')
      else if (error.message?.includes('Invalid login credentials'))
        setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      else
        setError(`오류: ${error.message}`)
    }
    setLoading(false)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
      <Box sx={{
        width: '100%',
        maxWidth: 400,
        bgcolor: '#fff',
        borderRadius: 3,
        p: { xs: 3, sm: 5 },
        boxShadow: '0 4px 32px rgba(109,76,65,0.1)',
      }}>
        {/* 로고 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Box sx={{
            width: 80, height: 80, borderRadius: '50%', bgcolor: '#6D4C41',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            mb: 2, boxShadow: '0 4px 16px rgba(109,76,65,0.3)',
          }}>
            <LocalCafeIcon sx={{ color: '#fff', fontSize: 44 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#6D4C41', letterSpacing: '-0.5px' }}>
            Cafe Notes
          </Typography>
          <Typography variant="body2" sx={{ color: '#BCAAA4', mt: 0.5 }}>
            카페 리뷰를 기록하고 공유해요 ☕
          </Typography>
        </Box>

        {/* 로그인 폼 */}
        <Box component="form" onSubmit={handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
          <TextField
            fullWidth name="email" label="이메일" type="email"
            value={form.email} onChange={handleChange} required
            sx={{ mb: 2 }} size="small"
          />
          <TextField
            fullWidth name="password" label="비밀번호" type="password"
            value={form.password} onChange={handleChange} required
            sx={{ mb: 3 }} size="small"
          />
          <Button
            fullWidth type="submit" variant="contained" disabled={loading}
            sx={{ bgcolor: '#6D4C41', '&:hover': { bgcolor: '#4B2C20' }, py: 1.2, fontSize: '1rem', mb: 2 }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : '로그인'}
          </Button>
          <Button
            fullWidth variant="outlined" onClick={() => navigate('/register')}
            sx={{ borderColor: '#BCAAA4', color: '#6D4C41', py: 1.2, fontSize: '1rem' }}
          >
            회원가입
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage
