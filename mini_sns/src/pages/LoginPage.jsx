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
    if (error) setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    setLoading(false)
  }

  return (
    <Box
      sx={{
        maxWidth: 480,
        mx: 'auto',
        minHeight: '100vh',
        bgcolor: '#FFF8F5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
      }}
    >
      {/* 로고 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5 }}>
        <Box
          sx={{
            width: 90,
            height: 90,
            borderRadius: '50%',
            bgcolor: '#6D4C41',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            boxShadow: '0 4px 16px rgba(109,76,65,0.3)',
          }}
        >
          <LocalCafeIcon sx={{ color: '#fff', fontSize: 48 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#6D4C41', letterSpacing: '-0.5px' }}>
          느좋카페
        </Typography>
        <Typography variant="body2" sx={{ color: '#BCAAA4', mt: 0.5 }}>
          좋은 카페, 함께 나눠요 ☕
        </Typography>
      </Box>

      {/* 로그인 폼 */}
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
        <TextField
          fullWidth
          name="email"
          label="이메일"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
          size="small"
        />
        <TextField
          fullWidth
          name="password"
          label="비밀번호"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          sx={{ mb: 3 }}
          size="small"
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ bgcolor: '#6D4C41', '&:hover': { bgcolor: '#4B2C20' }, py: 1.2, fontSize: '1rem', mb: 2 }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : '로그인'}
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => navigate('/register')}
          sx={{ borderColor: '#BCAAA4', color: '#6D4C41', py: 1.2, fontSize: '1rem' }}
        >
          회원가입
        </Button>
      </Box>
    </Box>
  )
}

export default LoginPage
