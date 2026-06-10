import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import InstagramIcon from '@mui/icons-material/Instagram'

const ContactInfo = () => (
  <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>

    {/* 이메일 */}
    <Box
      component="a"
      href="mailto:harube29@naver.com"
      sx={{
        flex: '1 1 220px',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        background: 'linear-gradient(135deg, #FF7A00, #F04438)',
        borderRadius: 3,
        px: 3,
        py: 2.5,
        color: '#fff',
        textDecoration: 'none',
        boxShadow: '0 4px 20px #FF7A0040',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 10px 28px #FF7A0055',
        },
      }}
    >
      <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <EmailRoundedIcon sx={{ fontSize: 22 }} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: '0.7rem', opacity: 0.75, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>이메일</Typography>
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>harube29@naver.com</Typography>
      </Box>
    </Box>

    {/* 인스타그램 */}
    <Box
      component="a"
      href="https://www.instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        flex: '0 1 auto',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        background: 'linear-gradient(135deg, #F58529 0%, #DD2A7B 55%, #8134AF 100%)',
        borderRadius: 3,
        px: 3,
        py: 2.5,
        color: '#fff',
        textDecoration: 'none',
        boxShadow: '0 4px 20px #DD2A7B40',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-3px) rotate(-2deg)',
          boxShadow: '0 10px 28px #DD2A7B55',
        },
      }}
    >
      <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <InstagramIcon sx={{ fontSize: 22 }} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: '0.7rem', opacity: 0.75, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>SNS</Typography>
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Instagram</Typography>
      </Box>
    </Box>

  </Box>
)

export default ContactInfo
