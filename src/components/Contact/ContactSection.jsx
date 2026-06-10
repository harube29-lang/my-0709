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
        bgcolor: '#F9FAFB',
        py: { xs: 10, sm: 14, md: 18 },
        px: { xs: 3, sm: 5, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>

        {/* 헤더 */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="caption"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: '0.72rem', display: 'block', mb: 1.5 }}
          >
            Contact
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 700, color: '#111827', fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' }, lineHeight: 1.2, mb: 2, wordBreak: 'keep-all' }}
          >
            커뮤니티
          </Typography>
          <Box sx={{ width: 40, height: 3, background: 'linear-gradient(90deg, #FF7A00, #F04438)', borderRadius: 1 }} />
        </Box>

        {/* 연락처 */}
        <Paper
          elevation={0}
          sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid #E5E7EB', bgcolor: '#fff', mb: { xs: 5, md: 6 } }}
        >
          <ContactInfo />
        </Paper>

        {/* 방명록 그리드 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '380px 1fr' },
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
              <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: { xs: '1rem', md: '1.1rem' }, whiteSpace: 'nowrap' }}>
                방명록
              </Typography>
              <Box sx={{ flex: 1, height: 1, bgcolor: '#E5E7EB', borderRadius: 1 }} />
            </Box>
            <GuestbookList refresh={refresh} />
          </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default ContactSection
