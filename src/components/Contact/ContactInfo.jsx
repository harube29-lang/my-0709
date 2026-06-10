import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import InstagramIcon from '@mui/icons-material/Instagram'

const C = {
  primary: '#6D28D9',
  secondary: '#9333EA',
}

const ContactInfo = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      gap: { xs: 3, sm: 5 },
      alignItems: { xs: 'flex-start', sm: 'center' },
      justifyContent: 'center',
      flexWrap: 'wrap',
    }}
  >
    {/* 이메일 */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 4px 14px ${C.primary}40`,
        }}
      >
        <EmailRoundedIcon sx={{ color: '#fff', fontSize: 22 }} />
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', lineHeight: 1, mb: 0.3 }}>
          이메일
        </Typography>
        <Typography
          component="a"
          href="mailto:harube29@naver.com"
          variant="body1"
          sx={{
            color: '#0F172A',
            fontWeight: 600,
            textDecoration: 'none',
            '&:hover': { color: C.primary },
            transition: 'color 0.2s',
          }}
        >
          harube29@naver.com
        </Typography>
      </Box>
    </Box>

    {/* SNS */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box>
        <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', lineHeight: 1, mb: 0.3 }}>
          SNS
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B' }}>
          인스타그램에서 찾아오세요!
        </Typography>
      </Box>
      <IconButton
        component="a"
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          width: 48,
          height: 48,
          background: 'linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)',
          color: '#fff',
          flexShrink: 0,
          boxShadow: '0 4px 14px rgba(221,42,123,0.35)',
          '&:hover': {
            transform: 'scale(1.12) rotate(-5deg)',
            boxShadow: '0 6px 20px rgba(221,42,123,0.45)',
          },
          transition: 'all 0.25s cubic-bezier(.34,1.56,.64,1)',
        }}
      >
        <InstagramIcon sx={{ fontSize: 24 }} />
      </IconButton>
    </Box>
  </Box>
)

export default ContactInfo
