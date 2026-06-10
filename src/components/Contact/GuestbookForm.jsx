import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import { supabase } from '../../lib/supabase'

const orangeTheme = createTheme({ palette: { primary: { main: '#FF7A00' } } })

const EMOJIS    = ['🚀', '⚡', '💡', '🎯', '✨', '🔥', '🛠️', '💬']
const REGIONS   = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주']
const AGE_GROUPS = ['10대', '20대', '30대', '40대', '50대 이상']
const HOW_FOUND  = ['SNS', '지인 소개', '검색', '기타']
const INIT = {
  author_name: '', message: '', affiliation: '',
  email: '', is_public_email: false, emoji: '🚀',
  region: '', age_group: '', how_found: '', keyword: '', rating: 0,
}

/* 별점 컴포넌트 */
const StarRating = ({ value, onChange }) => (
  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
    {[1, 2, 3, 4, 5].map(n => (
      <Box
        key={n}
        onClick={() => onChange(value === n ? 0 : n)}
        sx={{
          fontSize: '1.6rem',
          cursor: 'pointer',
          color: n <= value ? '#FF7A00' : '#E5E7EB',
          transition: 'color 0.15s, transform 0.15s',
          lineHeight: 1,
          userSelect: 'none',
          '&:hover': { color: '#FF7A00', transform: 'scale(1.15)' },
        }}
      >
        ★
      </Box>
    ))}
    {value > 0 && (
      <Typography variant="caption" sx={{ color: '#9CA3AF', ml: 0.5 }}>{value}점</Typography>
    )}
  </Box>
)

/* 섹션 레이블 */
const FieldLabel = ({ children }) => (
  <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 400, letterSpacing: 0.4, display: 'block', mb: 1 }}>
    {children}
  </Typography>
)

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
      author_name:    form.author_name.trim() || '익명',
      message:        form.message.trim(),
      affiliation:    form.affiliation.trim() || null,
      email:          form.email.trim() || null,
      is_public_email: form.email.trim() ? form.is_public_email : false,
      emoji:          form.emoji,
      region:         form.region || null,
      age_group:      form.age_group || null,
      how_found:      form.how_found || null,
      keyword:        form.keyword.trim() || null,
      rating:         form.rating || null,
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

      <ThemeProvider theme={orangeTheme}>
        <Box component="form" onSubmit={handleSubmit}
          sx={{ bgcolor: '#fff', px: 3, py: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}
        >
          {/* 기본 정보 */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField label="이름 (비워두면 익명)" value={form.author_name} onChange={set('author_name')} size="small" sx={{ flex: 1, minWidth: 130 }} />
            <TextField label="소속 / 직업 (선택)" value={form.affiliation} onChange={set('affiliation')} size="small" sx={{ flex: 1, minWidth: 130 }} />
          </Box>

          {/* 이모지 */}
          <Box>
            <FieldLabel>이모지 선택</FieldLabel>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {EMOJIS.map(em => (
                <Box key={em} onClick={() => setForm(p => ({ ...p, emoji: em }))}
                  sx={{
                    width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.3rem', borderRadius: 2, cursor: 'pointer',
                    border: form.emoji === em ? '2.5px solid #FF7A00' : '2px solid #E2E8F0',
                    bgcolor: form.emoji === em ? '#FFF4EB' : '#F8FAFC',
                    transform: form.emoji === em ? 'scale(1.2)' : 'scale(1)',
                    transition: 'all 0.18s cubic-bezier(.34,1.56,.64,1)',
                    '&:hover': { transform: 'scale(1.15)', bgcolor: '#FFF4EB' },
                  }}
                >{em}</Box>
              ))}
            </Box>
          </Box>

          {/* 메시지 */}
          <TextField label="메시지" value={form.message} onChange={set('message')} multiline rows={3} required placeholder="방문 인사를 남겨주세요!" />

          <Divider sx={{ borderStyle: 'dashed' }} />

          {/* 추가 정보 */}
          <Box>
            <FieldLabel>추가 정보 (선택)</FieldLabel>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField select label="거주 지역" value={form.region} onChange={set('region')} size="small" sx={{ flex: 1, minWidth: 120 }}>
                <MenuItem value=""><em>선택 안 함</em></MenuItem>
                {REGIONS.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
              </TextField>
              <TextField select label="나이대" value={form.age_group} onChange={set('age_group')} size="small" sx={{ flex: 1, minWidth: 110 }}>
                <MenuItem value=""><em>선택 안 함</em></MenuItem>
                {AGE_GROUPS.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
              </TextField>
              <TextField select label="알게된 경로" value={form.how_found} onChange={set('how_found')} size="small" sx={{ flex: 1, minWidth: 120 }}>
                <MenuItem value=""><em>선택 안 함</em></MenuItem>
                {HOW_FOUND.map(h => <MenuItem key={h} value={h}>{h}</MenuItem>)}
              </TextField>
            </Box>
          </Box>

          {/* 재미있는 정보 */}
          <Box>
            <FieldLabel>재미있는 정보 (선택)</FieldLabel>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <TextField label="한마디 키워드" value={form.keyword} onChange={set('keyword')} size="small" placeholder="예: 감사해요, 멋져요…" sx={{ flex: 1, minWidth: 150 }} />
              <Box sx={{ pb: 0.5 }}>
                <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 400, display: 'block', mb: 0.8 }}>별점</Typography>
                <StarRating value={form.rating} onChange={(v) => setForm(p => ({ ...p, rating: v }))} />
              </Box>
            </Box>
          </Box>

          {/* 이메일 */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField label="이메일 (선택)" value={form.email} onChange={set('email')} size="small" type="email" sx={{ flex: 1, minWidth: 180 }} />
            {form.email && (
              <FormControlLabel
                control={<Checkbox checked={form.is_public_email} onChange={set('is_public_email')} size="small" />}
                label={<Typography variant="caption" sx={{ color: '#6B7280' }}>이메일 공개</Typography>}
              />
            )}
          </Box>

          {error && <Alert severity="error" sx={{ py: 0.5 }}>{error}</Alert>}
          {done && <Alert severity="success" sx={{ py: 0.5 }}>방명록이 등록되었습니다! 감사합니다 ✨</Alert>}

          <Button type="submit" disabled={loading} fullWidth sx={{
            py: 1.5,
            background: loading ? '#E2E8F0' : 'linear-gradient(135deg, #FF7A00, #F04438)',
            color: loading ? '#94A3B8' : '#fff',
            fontWeight: 600, fontSize: '0.95rem', borderRadius: 2,
            boxShadow: loading ? 'none' : '0 4px 18px #F0443840',
            '&:hover': { background: 'linear-gradient(135deg, #E66E00, #D92D20)', transform: 'translateY(-2px)', boxShadow: '0 8px 24px #F0443850' },
            '&:disabled': { background: '#E2E8F0', boxShadow: 'none', transform: 'none' },
            transition: 'all 0.22s ease',
          }}>
            {loading ? '저장 중...' : '방명록 남기기 →'}
          </Button>
        </Box>
      </ThemeProvider>
    </Box>
  )
}

export default GuestbookForm
