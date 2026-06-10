import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { supabase } from '../../lib/supabase'

const C = { primary: '#6D28D9', secondary: '#9333EA', accent: '#FFB703' }

const purpleTheme = createTheme({ palette: { primary: { main: C.primary } } })

const EMOJIS = ['😊', '😍', '🔥', '✨', '👍', '💜', '🎉', '🌟']
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
    if (err) { setError('저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'); return }

    setForm(INIT)
    setDone(true)
    onSuccess?.()
    setTimeout(() => setDone(false), 4000)
  }

  return (
    <ThemeProvider theme={purpleTheme}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="이름 (비워두면 익명)"
            value={form.author_name}
            onChange={set('author_name')}
            size="small"
            sx={{ flex: 1, minWidth: 140 }}
          />
          <TextField
            label="소속 / 직업 (선택)"
            value={form.affiliation}
            onChange={set('affiliation')}
            size="small"
            sx={{ flex: 1, minWidth: 140 }}
          />
        </Box>

        {/* 이모지 선택 */}
        <Box>
          <Typography variant="caption" sx={{ color: '#6B7280', mb: 1, display: 'block', fontWeight: 500 }}>
            이모지 선택
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {EMOJIS.map(em => (
              <Chip
                key={em}
                label={em}
                onClick={() => setForm(p => ({ ...p, emoji: em }))}
                sx={{
                  fontSize: '1.25rem',
                  height: 40,
                  cursor: 'pointer',
                  border: form.emoji === em ? `2px solid ${C.primary}` : '2px solid #E9D5FF',
                  backgroundColor: form.emoji === em ? `${C.primary}12` : 'transparent',
                  transform: form.emoji === em ? 'scale(1.15)' : 'scale(1)',
                  transition: 'all 0.2s cubic-bezier(.34,1.56,.64,1)',
                  '&:hover': { backgroundColor: `${C.secondary}12`, transform: 'scale(1.1)' },
                }}
              />
            ))}
          </Box>
        </Box>

        <TextField
          label="메시지"
          value={form.message}
          onChange={set('message')}
          multiline
          rows={3}
          required
          placeholder="방문 인사를 남겨주세요! 익명으로도 괜찮아요 😊"
        />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            label="이메일 (선택)"
            value={form.email}
            onChange={set('email')}
            size="small"
            type="email"
            sx={{ flex: 1, minWidth: 180 }}
          />
          {form.email && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.is_public_email}
                  onChange={set('is_public_email')}
                  size="small"
                />
              }
              label={<Typography variant="caption" sx={{ color: '#64748B' }}>이메일 공개</Typography>}
            />
          )}
        </Box>

        {error && <Alert severity="error" sx={{ py: 0.5, fontSize: '0.85rem' }}>{error}</Alert>}
        {done && <Alert severity="success" sx={{ py: 0.5, fontSize: '0.85rem' }}>방명록이 등록되었습니다! 감사합니다 🎉</Alert>}

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          fullWidth
          sx={{
            py: 1.5,
            background: loading ? '#D1D5DB' : `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
            fontWeight: 700,
            fontSize: '1rem',
            borderRadius: 2,
            boxShadow: `0 4px 20px ${C.primary}35`,
            letterSpacing: 0.5,
            '&:hover': {
              background: `linear-gradient(135deg, #5B21B6, #7C3AED)`,
              transform: 'translateY(-2px)',
              boxShadow: `0 8px 25px ${C.primary}45`,
            },
            '&:disabled': { background: '#D1D5DB', boxShadow: 'none', transform: 'none' },
            transition: 'all 0.25s ease',
          }}
        >
          {loading ? '저장 중...' : '방명록 남기기 ✉️'}
        </Button>
      </Box>
    </ThemeProvider>
  )
}

export default GuestbookForm
