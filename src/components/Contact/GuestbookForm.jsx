import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { supabase } from '../../lib/supabase'

const orangeTheme = createTheme({ palette: { primary: { main: '#FF7A00' } } })

const EMOJIS = ['😊', '😍', '🔥', '✨', '👍', '🎉', '💪', '🌟']
const INIT = { author_name: '', message: '', affiliation: '', email: '', is_public_email: false, emoji: '😊' }

const GuestbookForm = ({ onSuccess }) => {
  const [form, setForm] = useState(INIT)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const set = (key) => (e) =>
    setForm(p => ({ ...p, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.message.trim()) { setError('메시지를 입력해주세요.'); return }
    setError(''); setLoading(true)

    const { error: err } = await supabase.from('guestbook').insert({
      author_name: form.author_name.trim() || '익명',
      message: form.message.trim(),
      affiliation: form.affiliation.trim() || null,
      email: form.email.trim() || null,
      is_public_email: form.email.trim() ? form.is_public_email : false,
      emoji: form.emoji,
    })

    setLoading(false)
    if (err) { setError('저장 중 오류가 발생했습니다.'); return }
    setForm(INIT); setDone(true)
    onSuccess?.()
    setTimeout(() => setDone(false), 4000)
  }

  return (
    <Box sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 24px rgba(255,122,0,0.14)' }}>

      {/* 헤더 */}
      <Box sx={{ background: 'linear-gradient(135deg, #FF7A00, #F04438)', px: 3, py: 2.5 }}>
        <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '1.05rem', mb: 0.3 }}>
          방명록 남기기 ✍️
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem' }}>
          익명으로도 남길 수 있어요!
        </Typography>
      </Box>

      {/* 폼 바디 */}
      <ThemeProvider theme={orangeTheme}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ bgcolor: '#fff', px: 3, py: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}
        >
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField label="이름 (비워두면 익명)" value={form.author_name} onChange={set('author_name')} size="small" sx={{ flex: 1, minWidth: 130 }} />
            <TextField label="소속 / 직업 (선택)" value={form.affiliation} onChange={set('affiliation')} size="small" sx={{ flex: 1, minWidth: 130 }} />
          </Box>

          {/* 이모지 선택 */}
          <Box>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 400, letterSpacing: 0.5, display: 'block', mb: 1 }}>
              이모지 선택
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {EMOJIS.map(em => (
                <Box
                  key={em}
                  onClick={() => setForm(p => ({ ...p, emoji: em }))}
                  sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    borderRadius: 2,
                    cursor: 'pointer',
                    border: form.emoji === em ? '2.5px solid #FF7A00' : '2px solid #E2E8F0',
                    bgcolor: form.emoji === em ? '#FFF4EB' : '#F8FAFC',
                    transform: form.emoji === em ? 'scale(1.2)' : 'scale(1)',
                    transition: 'all 0.18s cubic-bezier(.34,1.56,.64,1)',
                    '&:hover': { transform: 'scale(1.15)', bgcolor: '#FFF4EB' },
                  }}
                >
                  {em}
                </Box>
              ))}
            </Box>
          </Box>

          <TextField label="메시지" value={form.message} onChange={set('message')} multiline rows={3} required placeholder="방문 인사를 남겨주세요!" />

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField label="이메일 (선택)" value={form.email} onChange={set('email')} size="small" type="email" sx={{ flex: 1, minWidth: 180 }} />
            {form.email && (
              <FormControlLabel
                control={<Checkbox checked={form.is_public_email} onChange={set('is_public_email')} size="small" />}
                label={<Typography variant="caption" sx={{ color: '#64748B' }}>이메일 공개</Typography>}
              />
            )}
          </Box>

          {error && <Alert severity="error" sx={{ py: 0.5 }}>{error}</Alert>}
          {done && <Alert severity="success" sx={{ py: 0.5 }}>방명록이 등록되었습니다! 감사합니다 🎉</Alert>}

          <Button
            type="submit"
            disabled={loading}
            fullWidth
            sx={{
              py: 1.5,
              background: loading ? '#E2E8F0' : 'linear-gradient(135deg, #FF7A00, #F04438)',
              color: loading ? '#94A3B8' : '#fff',
              fontWeight: 600,
              fontSize: '0.95rem',
              borderRadius: 2,
              letterSpacing: 0.3,
              boxShadow: loading ? 'none' : '0 4px 18px #F0443840',
              '&:hover': {
                background: 'linear-gradient(135deg, #E66E00, #D92D20)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px #F0443850',
              },
              '&:disabled': { background: '#E2E8F0', boxShadow: 'none', transform: 'none' },
              transition: 'all 0.22s ease',
            }}
          >
            {loading ? '저장 중...' : '방명록 남기기 ✉️'}
          </Button>
        </Box>
      </ThemeProvider>
    </Box>
  )
}

export default GuestbookForm
