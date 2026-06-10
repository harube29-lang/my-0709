import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import ContactInfo from './ContactInfo'
import GuestbookForm from './GuestbookForm'
import GuestbookList from './GuestbookList'

const ContactSection = () => {
  const [refresh, setRefresh] = useState(0)

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        bgcolor: '#F8FAFC',
        py: { xs: 10, sm: 14, md: 18 },
        px: { xs: 3, sm: 5, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>

        {/* 섹션 헤더 */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="caption"
            sx={{
              color: '#FF7A00',
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              display: 'block',
              mb: 1.5,
            }}
          >
            Contact
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: '#0F172A',
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.6rem' },
              lineHeight: 1.2,
              mb: 2,
              wordBreak: 'keep-all',
            }}
          >
            함께 이야기해요 👋
          </Typography>
          {/* 4색 언더라인 */}
          <Box sx={{ display: 'flex', width: 72, height: 4, borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ flex: 1, bgcolor: '#FF7A00' }} />
            <Box sx={{ flex: 1, bgcolor: '#F04438' }} />
            <Box sx={{ flex: 1, bgcolor: '#E66E00' }} />
            <Box sx={{ flex: 1, bgcolor: '#D92D20' }} />
          </Box>
        </Box>

        {/* 연락처 정보 */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: '1px solid #F1F5F9',
            bgcolor: '#fff',
            mb: { xs: 5, md: 6 },
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          }}
        >
          <ContactInfo />
        </Paper>

        {/* 방명록 그리드 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '400px 1fr' },
            gap: { xs: 4, md: 5 },
            alignItems: 'start',
          }}
        >
          {/* 폼 */}
          <Box sx={{ position: { md: 'sticky' }, top: { md: 88 } }}>
            <GuestbookForm onSuccess={() => setRefresh(r => r + 1)} />
          </Box>

          {/* 목록 */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: '#0F172A', fontSize: { xs: '1.05rem', md: '1.15rem' }, whiteSpace: 'nowrap' }}
              >
                방명록 💬
              </Typography>
              <Box sx={{ flex: 1, height: 2, background: 'linear-gradient(90deg, #FF7A0030, transparent)', borderRadius: 1 }} />
            </Box>
            <GuestbookList refresh={refresh} />
          </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default ContactSection
