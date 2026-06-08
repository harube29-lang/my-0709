import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

const ProjectsPage = () => {
  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: 2, py: { xs: 8, md: 12 } }}>
      <Typography
        variant="caption"
        sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', display: 'block', mb: 1 }}
      >
        Projects
      </Typography>
      <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2 }}>
        Projects 페이지
      </Typography>
      <Divider sx={{ width: 60, borderColor: 'primary.main', borderWidth: 2, mb: 4 }} />

      <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
        Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
      </Typography>

      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Grid item xs={12} sm={6} md={4} key={n}>
            <Card sx={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.disabled">프로젝트 {n}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProjectsPage
