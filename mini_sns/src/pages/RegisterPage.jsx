import { useState } from 'react'
import { Box, Typography, TextField, Button, CircularProgress, Alert, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [form, setForm] = useState({ email: '', password: '', nickname: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await signUp(form.email, form.password, form.nickname)
    if (error) {
      setError(error.message === 'User already registered' ? '이미 등록된 이메일입니다.' : `오류: ${error.message}`)
    } else {
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
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
        position: 'relative',
      }}>
        {/* 뒤로가기 버튼 */}
        <IconButton onClick={() => navigate('/login')} sx={{ position: 'absolute', top: 12, left: 12, color: '#6D4C41' }}>
          <ArrowBackIcon />
        </IconButton>

        {/* 로고 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, pt: 2 }}>
          <Box sx={{
            width: 64, height: 64, borderRadius: '50%', bgcolor: '#6D4C41',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            mb: 1.5, boxShadow: '0 4px 16px rgba(109,76,65,0.3)',
          }}>
            <LocalCafeIcon sx={{ color: '#fff', fontSize: 36 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#6D4C41' }}>회원가입</Typography>
          <Typography variant="body2" sx={{ color: '#BCAAA4', mt: 0.5 }}>Cafe Notes와 함께해요 ☕</Typography>
        </Box>

        {/* 회원가입 폼 */}
        <Box component="form" onSubmit={handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>회원가입 완료! 로그인 페이지로 이동합니다.</Alert>}
          <TextField
            fullWidth name="email" label="이메일 (아이디)" type="email"
            value={form.email} onChange={handleChange} required
            sx={{ mb: 2 }} size="small"
          />
          <TextField
            fullWidth name="password" label="비밀번호 (6자 이상)" type="password"
            value={form.password} onChange={handleChange} required
            inputProps={{ minLength: 6 }} sx={{ mb: 2 }} size="small"
          />
          <TextField
            fullWidth name="nickname" label="닉네임"
            value={form.nickname} onChange={handleChange} required
            sx={{ mb: 3 }} size="small"
          />
          <Button
            fullWidth type="submit" variant="contained" disabled={loading || success}
            sx={{ bgcolor: '#6D4C41', '&:hover': { bgcolor: '#4B2C20' }, py: 1.2, fontSize: '1rem', mb: 2 }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : '회원가입'}
          </Button>
          <Button
            fullWidth variant="text" onClick={() => navigate('/login')}
            sx={{ color: '#9C786C' }}
          >
            이미 계정이 있으신가요? 로그인
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default RegisterPage
