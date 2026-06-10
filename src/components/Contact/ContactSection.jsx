import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import ContactInfo from './ContactInfo'
import GuestbookForm from './GuestbookForm'
import GuestbookList from './GuestbookList'

const C = { primary: '#6D28D9', secondary: '#9333EA', accent: '#FFB703', accent2: '#FB7185' }

const ContactSection = () => {
  const [refresh, setRefresh] = useState(0)

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        background: 'linear-gradient(175deg, #F8FAFC 0%, #F3F0FF 60%, #FDF4FF 100%)',
        py: { xs: 10, sm: 14, md: 18 },
        px: { xs: 3, sm: 5, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 9 } }}>
          <Typography
            variant="caption"
            sx={{
              display: 'inline-block',
              color: C.primary,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              mb: 2,
            }}
          >
            Contact
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              fontWeight: 700,
              color: '#0F172A',
              mb: 2.5,
              wordBreak: 'keep-all',
              lineHeight: 1.25,
            }}
          >
            함께 이야기해요 👋
          </Typography>
          <Divider
            sx={{
              width: 52,
              mx: 'auto',
              borderWidth: 3,
              borderRadius: 2,
              borderColor: C.accent,
            }}
          />
        </Box>

        {/* 연락처 정보 카드 */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4.5 },
            borderRadius: 4,
            border: `1px solid #E9D5FF`,
            backgroundColor: '#fff',
            mb: { xs: 5, md: 7 },
            boxShadow: `0 4px 24px ${C.primary}0A`,
          }}
        >
          <ContactInfo />
        </Paper>

        {/* 방명록 영역 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '420px 1fr' },
            gap: { xs: 4, md: 5 },
            alignItems: 'start',
          }}
        >
          {/* 방명록 폼 */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              border: `1px solid #E9D5FF`,
              backgroundColor: '#fff',
              position: { md: 'sticky' },
              top: { md: 88 },
              boxShadow: `0 4px 24px ${C.primary}0A`,
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: '#0F172A', fontSize: { xs: '1.1rem', md: '1.2rem' }, mb: 0.5 }}
              >
                방명록 남기기 ✍️
              </Typography>
              <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                익명으로도 남길 수 있어요!
              </Typography>
            </Box>
            <GuestbookForm onSuccess={() => setRefresh(r => r + 1)} />
          </Paper>

          {/* 방명록 목록 */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: '#0F172A', fontSize: { xs: '1.1rem', md: '1.2rem' } }}
              >
                방명록 💬
              </Typography>
              <Box
                sx={{
                  height: 3,
                  flex: 1,
                  background: `linear-gradient(90deg, ${C.primary}30, transparent)`,
                  borderRadius: 2,
                }}
              />
            </Box>
            <GuestbookList refresh={refresh} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ContactSection
