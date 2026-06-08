import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const AboutPage = () => {
  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: 'auto',
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 6, sm: 8, md: 12 },
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: 'primary.main',
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
          display: 'block',
          mb: 1,
          fontSize: { xs: '0.65rem', sm: '0.75rem' },
        }}
      >
        About Me
      </Typography>
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }, mb: 2, wordBreak: 'keep-all' }}
      >
        About Me 페이지
      </Typography>
      <Divider sx={{ width: 60, borderColor: 'primary.main', borderWidth: 2, mb: 4 }} />

      <Card sx={{ maxWidth: { xs: '100%', md: 800 } }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 2, wordBreak: 'keep-all', fontSize: { xs: '0.9rem', md: '1rem' } }}
          >
            About Me 페이지가 개발될 공간입니다.
            <br /><br />
            상세한 자기소개가 들어갈 예정입니다.
            개발 경력, 교육 배경, 개인 프로젝트 이야기, 관심 기술 등
            풍부한 내용으로 채워질 예정입니다.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AboutPage
