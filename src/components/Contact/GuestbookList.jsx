import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { supabase } from '../../lib/supabase'

const ACCENTS = [
  { border: '#FF7A00', bg: '#FFFBF7' },
  { border: '#F04438', bg: '#FFF9F9' },
  { border: '#E66E00', bg: '#FFFCF7' },
  { border: '#D92D20', bg: '#FFF9F8' },
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
        borderLeft: `3px solid ${ac.border}`,
        borderRadius: '0 10px 10px 0',
        p: { xs: 3, md: 4 },
        border: '1px solid #E5E7EB',
        borderLeft: `3px solid ${ac.border}`,
        transition: 'box-shadow 0.2s ease',
        '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.07)' },
      }}
    >
      {/* 상단: 아바타 + 이름 + 날짜 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: ac.border,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            flexShrink: 0,
          }}
        >
          {entry.emoji || '😊'}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 500, color: '#1F2937', fontSize: '0.9rem', lineHeight: 1.3 }}>
            {entry.author_name}
          </Typography>
          {entry.affiliation && (
            <Typography variant="caption" sx={{ color: ac.border, fontWeight: 400, display: 'block', mt: 0.2 }}>
              {entry.affiliation}
            </Typography>
          )}
        </Box>
        <Typography variant="caption" sx={{ color: '#9CA3AF', flexShrink: 0, fontSize: '0.72rem', fontWeight: 300 }}>
          {formatDate(entry.created_at)}
        </Typography>
      </Box>

      {/* 메시지 */}
      <Typography
        variant="body2"
        sx={{ color: '#1F2937', lineHeight: 1.75, wordBreak: 'keep-all', whiteSpace: 'pre-wrap', fontWeight: 400 }}
      >
        {entry.message}
      </Typography>

      {/* 이메일 (공개 시) */}
      {entry.is_public_email && entry.email && (
        <Typography variant="caption" sx={{ color: '#9CA3AF', mt: 1.2, display: 'block', fontWeight: 400 }}>
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
      {[1, 2, 3].map(i => <Skeleton key={i} variant="rectangular" height={100} sx={{ borderRadius: '0 10px 10px 0' }} />)}
    </Box>
  )

  if (entries.length === 0) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography sx={{ fontSize: '2.5rem', mb: 1.5 }}>✉️</Typography>
      <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 400 }}>아직 방명록이 없어요.</Typography>
      <Typography variant="caption" sx={{ color: '#9CA3AF', mt: 0.5, display: 'block' }}>첫 번째 방명록을 남겨주세요!</Typography>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="caption" sx={{ color: '#9CA3AF', fontWeight: 400 }}>
        총 {entries.length}개
      </Typography>
      {entries.map((entry, i) => <EntryCard key={entry.id} entry={entry} index={i} />)}
    </Box>
  )
}

export default GuestbookList
