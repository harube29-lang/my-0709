import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import { supabase } from '../../lib/supabase'

const C = { primary: '#6D28D9', secondary: '#9333EA', accent2: '#FB7185' }

const formatDate = (iso) => {
  const d = new Date(iso)
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`
}

const EntryCard = ({ entry, index }) => (
  <Card
    sx={{
      border: '1px solid #E9D5FF',
      boxShadow: 'none',
      borderRadius: 3,
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      animationDelay: `${index * 0.05}s`,
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: `0 10px 28px ${C.primary}18`,
        borderColor: `${C.primary}50`,
      },
    }}
  >
    <CardContent sx={{ p: { xs: 2.5, md: 3 }, '&:last-child': { pb: { xs: 2.5, md: 3 } } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography sx={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0 }}>
            {entry.emoji || '😊'}
          </Typography>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
              {entry.author_name}
            </Typography>
            {entry.affiliation && (
              <Typography variant="caption" sx={{ color: C.secondary, fontWeight: 600 }}>
                {entry.affiliation}
              </Typography>
            )}
          </Box>
        </Box>
        <Typography variant="caption" sx={{ color: '#CBD5E1', flexShrink: 0, ml: 1 }}>
          {formatDate(entry.created_at)}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{ color: '#334155', lineHeight: 1.9, wordBreak: 'keep-all', whiteSpace: 'pre-wrap' }}
      >
        {entry.message}
      </Typography>

      {entry.is_public_email && entry.email && (
        <Typography variant="caption" sx={{ color: '#94A3B8', mt: 1.5, display: 'block' }}>
          📧 {entry.email}
        </Typography>
      )}
    </CardContent>
  </Card>
)

const GuestbookList = ({ refresh }) => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEntries = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('guestbook')
        .select('id, author_name, message, affiliation, email, is_public_email, emoji, created_at')
        .order('created_at', { ascending: false })
      setEntries(data || [])
      setLoading(false)
    }
    loadEntries()
  }, [refresh])

  if (loading) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {[1, 2, 3].map(i => (
        <Skeleton key={i} variant="rectangular" height={110} sx={{ borderRadius: 3 }} />
      ))}
    </Box>
  )

  if (entries.length === 0) return (
    <Box sx={{ textAlign: 'center', py: 8, px: 3 }}>
      <Typography sx={{ fontSize: '3.5rem', mb: 2 }}>✉️</Typography>
      <Typography variant="body1" sx={{ color: '#94A3B8', fontWeight: 500 }}>
        아직 방명록이 없어요.
      </Typography>
      <Typography variant="body2" sx={{ color: '#CBD5E1', mt: 0.5 }}>
        첫 번째 방명록을 남겨주세요!
      </Typography>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 500 }}>
        총 {entries.length}개의 방명록
      </Typography>
      {entries.map((entry, i) => (
        <EntryCard key={entry.id} entry={entry} index={i} />
      ))}
    </Box>
  )
}

export default GuestbookList
