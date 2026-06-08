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
      py: { xs: 6, sm: 8, md: 12 },
      px: { xs: 2, sm: 4, md: 6 },
    }}
  >
    <Box sx={{ maxWidth: 1100, mx: 'auto', width: '100%' }}>
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
      fontSize: { xs: '0.65rem', sm: '0.75rem' },
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
        <Box
          sx={{
            textAlign: 'center',
            minHeight: { xs: '60vh', md: '80vh' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: { xs: 4, md: 6 },
          }}
        >
          <SectionTag>Hero Section</SectionTag>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' },
              fontWeight: 700,
              mb: 2,
              lineHeight: 1.2,
              wordBreak: 'keep-all',
            }}
          >
            여기는 Hero 섹션입니다.
          </Typography>
          <Divider sx={{ width: { xs: 40, md: 60 }, borderColor: 'primary.main', borderWidth: 2, mx: 'auto', mb: 3 }} />
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: { xs: '100%', sm: 500, md: 600 },
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' },
              wordBreak: 'keep-all',
            }}
          >
            메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
            <br />
            포트폴리오의 첫 인상을 결정하는 가장 중요한 공간입니다.
          </Typography>
        </Box>
      </Section>

      {/* ── 2. About Me ── */}
      <Section id="about" bg="#FFFFFF">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: { xs: 4, md: 6 },
          }}
        >
          <Box sx={{ flex: 1, width: '100%' }}>
            <SectionTag>About Me</SectionTag>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.4rem', sm: '1.75rem', md: '2rem' },
                mb: 2,
                wordBreak: 'keep-all',
              }}
            >
              여기는 About Me 섹션입니다.
            </Typography>
            <Divider sx={{ width: 40, borderColor: 'primary.main', borderWidth: 2, mb: 3 }} />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.9, mb: 4, wordBreak: 'keep-all', fontSize: { xs: '0.9rem', md: '1rem' } }}
            >
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
              fullWidth={false}
              sx={{ px: { xs: 3, md: 4 }, fontSize: { xs: '0.9rem', md: '1rem' } }}
            >
              더 알아보기
            </Button>
          </Box>
          <Card
            sx={{
              flex: 1,
              width: '100%',
              minHeight: { xs: 140, md: 220 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="text.disabled" variant="body2">프로필 이미지 / 소개 카드 영역</Typography>
            </CardContent>
          </Card>
        </Box>
      </Section>

      {/* ── 3. Skill Tree ── */}
      <Section id="skills" bg="#F4F4F2">
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <SectionTag>Skill Tree</SectionTag>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.4rem', sm: '1.75rem', md: '2rem' }, wordBreak: 'keep-all' }}
          >
            여기는 Skill Tree 섹션입니다.
          </Typography>
          <Divider sx={{ width: 40, borderColor: 'primary.main', borderWidth: 2, mx: 'auto', mt: 2 }} />
        </Box>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {['Frontend', 'Backend', 'Tools & ETC'].map((cat) => (
            <Grid item xs={12} sm={6} md={4} key={cat}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography
                    variant="h3"
                    sx={{ mb: 2, color: 'primary.main', fontSize: { xs: '1rem', md: '1.25rem' } }}
                  >
                    {cat}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'keep-all' }}>
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
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <SectionTag>Projects</SectionTag>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.4rem', sm: '1.75rem', md: '2rem' }, wordBreak: 'keep-all' }}
          >
            여기는 Projects 섹션입니다.
          </Typography>
          <Divider sx={{ width: 40, borderColor: 'primary.main', borderWidth: 2, mx: 'auto', mt: 2 }} />
        </Box>
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((n) => (
            <Grid item xs={12} sm={6} md={3} key={n}>
              <Card
                sx={{
                  height: { xs: 140, sm: 160, md: 180 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.disabled">프로젝트 {n} 썸네일</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/projects"
            size="large"
            sx={{ px: { xs: 4, md: 5 }, fontSize: { xs: '0.9rem', md: '1rem' } }}
          >
            더 보기
          </Button>
        </Box>
      </Section>

      {/* ── 5. Contact ── */}
      <Section id="contact" bg="#1C1C1C">
        <Box sx={{ textAlign: 'center' }}>
          <SectionTag>Contact</SectionTag>
          <Typography
            variant="h2"
            sx={{
              color: '#FFFFFF',
              mb: 2,
              fontSize: { xs: '1.4rem', sm: '1.75rem', md: '2rem' },
              wordBreak: 'keep-all',
            }}
          >
            여기는 Contact 섹션입니다.
          </Typography>
          <Divider sx={{ width: 40, borderColor: 'primary.main', borderWidth: 2, mx: 'auto', mb: 3 }} />
          <Typography
            variant="body1"
            sx={{ color: '#999999', mb: 4, fontSize: { xs: '0.9rem', md: '1rem' }, wordBreak: 'keep-all' }}
          >
            연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
          </Typography>
          <Card sx={{ maxWidth: { xs: '100%', sm: 480 }, mx: 'auto', p: { xs: 2, md: 3 } }}>
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
