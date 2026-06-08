import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'

const Section = ({ id, bg, children }) => (
  <Box
    id={id}
    component="section"
    sx={{
      backgroundColor: bg || 'background.default',
      py: { xs: 8, md: 12 },
      px: 2,
    }}
  >
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      {children}
    </Box>
  </Box>
)

const SectionTag = ({ children }) => (
  <Typography
    variant="caption"
    sx={{
      display: 'inline-block',
      color: 'primary.main',
      fontWeight: 700,
      letterSpacing: 2,
      textTransform: 'uppercase',
      mb: 1,
    }}
  >
    {children}
  </Typography>
)

const HomePage = () => {
  return (
    <Box>
      {/* ── 1. Hero ── */}
      <Section id="hero" bg="#F4F4F2">
        <Box sx={{ textAlign: 'center', py: { xs: 4, md: 8 } }}>
          <SectionTag>Hero Section</SectionTag>
          <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, mb: 2 }}>
            여기는 Hero 섹션입니다.
          </Typography>
          <Divider sx={{ width: 60, borderColor: 'primary.main', borderWidth: 2, mx: 'auto', mb: 3 }} />
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.8 }}>
            메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
            <br />
            포트폴리오의 첫 인상을 결정하는 가장 중요한 공간입니다.
          </Typography>
        </Box>
      </Section>

      {/* ── 2. About Me ── */}
      <Section id="about" bg="#FFFFFF">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 6 }}>
          <Box sx={{ flex: 1 }}>
            <SectionTag>About Me</SectionTag>
            <Typography variant="h2" sx={{ mb: 2 }}>여기는 About Me 섹션입니다.</Typography>
            <Divider sx={{ width: 40, borderColor: 'primary.main', borderWidth: 2, mb: 3 }} />
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, mb: 4 }}>
              간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
              <br />
              개발자로서의 경험, 관심사, 목표 등을 이 공간에 담을 예정입니다.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/about"
              size="large"
              sx={{ px: 4 }}
            >
              더 알아보기
            </Button>
          </Box>
          <Card sx={{ flex: 1, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="text.disabled" variant="body2">프로필 이미지 / 소개 카드 영역</Typography>
            </CardContent>
          </Card>
        </Box>
      </Section>

      {/* ── 3. Skill Tree ── */}
      <Section id="skills" bg="#F4F4F2">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <SectionTag>Skill Tree</SectionTag>
          <Typography variant="h2">여기는 Skill Tree 섹션입니다.</Typography>
          <Divider sx={{ width: 40, borderColor: 'primary.main', borderWidth: 2, mx: 'auto', mt: 2 }} />
        </Box>
        <Grid container spacing={3}>
          {['Frontend', 'Backend', 'Tools & ETC'].map((cat) => (
            <Grid item xs={12} md={4} key={cat}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h3" sx={{ mb: 2, color: 'primary.main' }}>{cat}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
                  </Typography>
                  <Box sx={{ mt: 3, height: 8, borderRadius: 4, backgroundColor: '#EBEBEB', overflow: 'hidden' }}>
                    <Box sx={{ height: '100%', width: '60%', backgroundColor: 'primary.main', borderRadius: 4 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* ── 4. Projects ── */}
      <Section id="projects" bg="#FFFFFF">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <SectionTag>Projects</SectionTag>
          <Typography variant="h2">여기는 Projects 섹션입니다.</Typography>
          <Divider sx={{ width: 40, borderColor: 'primary.main', borderWidth: 2, mx: 'auto', mt: 2 }} />
        </Box>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((n) => (
            <Grid item xs={12} sm={6} md={3} key={n}>
              <Card sx={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.disabled">프로젝트 {n} 썸네일</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center' }}>
          <Button variant="outlined" color="primary" component={Link} to="/projects" size="large" sx={{ px: 5 }}>
            더 보기
          </Button>
        </Box>
      </Section>

      {/* ── 5. Contact ── */}
      <Section id="contact" bg="#1C1C1C">
        <Box sx={{ textAlign: 'center' }}>
          <SectionTag>Contact</SectionTag>
          <Typography variant="h2" sx={{ color: '#FFFFFF', mb: 2 }}>여기는 Contact 섹션입니다.</Typography>
          <Divider sx={{ width: 40, borderColor: 'primary.main', borderWidth: 2, mx: 'auto', mb: 3 }} />
          <Typography variant="body1" sx={{ color: '#999999', mb: 4 }}>
            연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
          </Typography>
          <Card sx={{ maxWidth: 480, mx: 'auto', p: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.disabled">메시지 폼 / 연락처 영역</Typography>
            </CardContent>
          </Card>
        </Box>
      </Section>
    </Box>
  )
}

export default HomePage
