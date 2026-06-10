import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { supabase } from '../../lib/supabase'

// 카드마다 다른 포인트 색상 (오렌지 계열 4종)
const ACCENTS = [
  { border: '#FF7A00', bg: '#FFF4EB', shadow: '#FF7A0022' },
  { border: '#F04438', bg: '#FFF1F0', shadow: '#F0443822' },
  { border: '#E66E00', bg: '#FFF8F0', shadow: '#E66E0022' },
  { border: '#D92D20', bg: '#FFF3F2', shadow: '#D92D2022' },
]

const formatDate = (iso) => {
  const d = new Date(iso)
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`
}

const EntryCard = ({ entry, index }) => {
  const ac = ACCENTS[index % ACCENTS.length]
  return (
    <Box
      sx={{
        bgcolor: ac.bg,
        borderLeft: `4px solid ${ac.border}`,
        borderRadius: '0 12px 12px 0',
        p: { xs: 2.5, md: 3 },
        boxShadow: `0 2px 12px ${ac.shadow}`,
        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        '&:hover': {
          transform: 'translateX(4px)',
          boxShadow: `0 6px 22px ${ac.shadow}`,
        },
      }}
    >
      {/* 상단: 아바타 + 이름 + 날짜 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            bgcolor: ac.border,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            flexShrink: 0,
            boxShadow: `0 3px 10px ${ac.shadow}`,
          }}
        >
          {entry.emoji || '😊'}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem', lineHeight: 1.2 }}>
            {entry.author_name}
          </Typography>
          {entry.affiliation && (
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                bgcolor: ac.border,
                color: '#fff',
                fontSize: '0.68rem',
                fontWeight: 700,
                px: 0.8,
                py: 0.2,
                borderRadius: 1,
                mt: 0.3,
                letterSpacing: 0.3,
              }}
            >
              {entry.affiliation}
            </Box>
          )}
        </Box>
        <Typography variant="caption" sx={{ color: '#94A3B8', flexShrink: 0, fontSize: '0.72rem' }}>
          {formatDate(entry.created_at)}
        </Typography>
      </Box>

      {/* 메시지 */}
      <Typography
        variant="body2"
        sx={{ color: '#334155', lineHeight: 1.85, wordBreak: 'keep-all', whiteSpace: 'pre-wrap' }}
      >
        {entry.message}
      </Typography>

      {/* 이메일 (공개 시) */}
      {entry.is_public_email && entry.email && (
        <Typography variant="caption" sx={{ color: '#94A3B8', mt: 1.2, display: 'block' }}>
          📧 {entry.email}
        </Typography>
      )}
    </Box>
  )
}

const GuestbookList = ({ refresh }) => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('guestbook')
        .select('id, author_name, message, affiliation, email, is_public_email, emoji, created_at')
        .order('created_at', { ascending: false })
      setEntries(data || [])
      setLoading(false)
    }
    load()
  }, [refresh])

  if (loading) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {[1, 2, 3].map(i => <Skeleton key={i} variant="rectangular" height={110} sx={{ borderRadius: '0 12px 12px 0' }} />)}
    </Box>
  )

  if (entries.length === 0) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography sx={{ fontSize: '3rem', mb: 1.5 }}>✉️</Typography>
      <Typography variant="body1" sx={{ color: '#94A3B8', fontWeight: 600 }}>아직 방명록이 없어요.</Typography>
      <Typography variant="body2" sx={{ color: '#CBD5E1', mt: 0.5 }}>첫 번째 방명록을 남겨주세요!</Typography>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>
        총 {entries.length}개의 방명록
      </Typography>
      {entries.map((entry, i) => <EntryCard key={entry.id} entry={entry} index={i} />)}
    </Box>
  )
}

export default GuestbookList
