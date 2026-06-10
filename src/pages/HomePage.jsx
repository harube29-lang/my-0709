import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Link } from 'react-router-dom'
import appleImg from '../assets/apple.jpg'
import ContactSection from '../components/Contact/ContactSection'

/* ── 섹션 래퍼 ── */
const Section = ({ id, bg, children }) => (
  <Box
    id={id}
    component="section"
    sx={{
      backgroundColor: bg || 'background.default',
      py: { xs: 10, sm: 14, md: 18 },
      px: { xs: 3, sm: 5, md: 8 },
    }}
  >
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>{children}</Box>
  </Box>
)

/* ── 섹션 레이블 ── */
const Label = ({ children }) => (
  <Typography
    variant="caption"
    sx={{
      display: 'inline-block',
      color: 'primary.main',
      fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      fontSize: '0.72rem',
      mb: 1.5,
    }}
  >
    {children}
  </Typography>
)

const HomePage = () => (
  <Box>

    {/* ── 1. Hero ── */}
    <Box
      id="hero"
      component="section"
      sx={{
        background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
        py: { xs: 14, sm: 18, md: 24 },
        px: { xs: 3, sm: 5, md: 8 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 6, md: 10 },
        }}
      >
        {/* 텍스트 */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: 'inline-block',
              bgcolor: 'rgba(255,255,255,0.18)',
              color: '#fff',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              px: 1.5,
              py: 0.6,
              borderRadius: 1,
              mb: 3,
            }}
          >
            Portfolio
          </Box>
          <Typography
            variant="h1"
            sx={{
              color: '#FFFFFF',
              fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 3,
              wordBreak: 'keep-all',
              letterSpacing: '-0.02em',
            }}
          >
            Hello,<br />I'm a Developer.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.82)',
              maxWidth: 500,
              lineHeight: 1.8,
              mb: 5,
              fontSize: { xs: '1rem', md: '1.05rem' },
              wordBreak: 'keep-all',
            }}
          >
            메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
            포트폴리오의 첫 인상을 결정하는 가장 중요한 공간입니다.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              component={Link}
              to="/projects"
              size="large"
              sx={{
                bgcolor: '#FFFFFF',
                color: '#FF7A00',
                fontWeight: 700,
                px: 3.5,
                py: 1.4,
                background: '#FFFFFF',
                boxShadow: '0 2px 16px rgba(0,0,0,0.14)',
                '&:hover': { bgcolor: '#F3F4F6', background: '#F3F4F6', boxShadow: '0 4px 20px rgba(0,0,0,0.18)' },
              }}
            >
              프로젝트 보기
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/about"
              size="large"
              sx={{
                borderColor: 'rgba(255,255,255,0.6)',
                color: '#FFFFFF',
                fontWeight: 600,
                px: 3.5,
                py: 1.4,
                borderWidth: '1.5px',
                '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)', borderWidth: '1.5px' },
              }}
            >
              About Me
            </Button>
          </Box>
        </Box>

        {/* 프로필 이미지 */}
        <Box sx={{ flexShrink: 0 }}>
          <Box
            component="img"
            src={appleImg}
            alt="프로필"
            sx={{
              width: { xs: 180, sm: 220, md: 280 },
              height: { xs: 180, sm: 220, md: 280 },
              objectFit: 'cover',
              borderRadius: '50%',
              border: '4px solid rgba(255,255,255,0.35)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.22)',
            }}
          />
        </Box>
      </Box>
    </Box>

    {/* ── 2. About Me ── */}
    <Section id="about" bg="#FFFFFF">
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 5, md: 10 },
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Label>About Me</Label>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' }, mb: 1.5, wordBreak: 'keep-all' }}
          >
            여기는 About Me 섹션입니다.
          </Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mb: 3 }} />
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 4, wordBreak: 'keep-all' }}
          >
            간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
            개발자로서의 경험, 관심사, 목표 등을 이 공간에 담을 예정입니다.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/about" size="large" sx={{ px: 3.5, py: 1.4 }}>
            더 알아보기
          </Button>
        </Box>
        <Card sx={{ flex: 1, width: '100%', minHeight: { xs: 180, md: 260 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography color="text.disabled" variant="body2">프로필 이미지 / 소개 카드 영역</Typography>
          </CardContent>
        </Card>
      </Box>
    </Section>

    {/* ── 3. Skill Tree ── */}
    <Section id="skills" bg="#F9FAFB">
      <Box sx={{ mb: { xs: 5, md: 7 } }}>
        <Label>Skill Tree</Label>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' }, wordBreak: 'keep-all' }}>
          기술 스택
        </Typography>
        <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mt: 1.5 }} />
      </Box>
      <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: 4 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#D1D5DB', borderRadius: 2 } }}>
        {['Frontend', 'Backend', 'Tools & ETC'].map((cat) => (
          <Card key={cat} sx={{ flex: '1 0 220px', minWidth: 220, minHeight: { xs: 180, md: 220 } }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h3" sx={{ mb: 2, color: 'primary.main', fontSize: { xs: '1rem', md: '1.1rem' } }}>
                {cat}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 3 }}>
                기술 스택을 시각화할 예정입니다.
              </Typography>
              <Box sx={{ height: 6, borderRadius: 3, bgcolor: '#E5E7EB', overflow: 'hidden' }}>
                <Box sx={{ height: '100%', width: '60%', background: 'linear-gradient(90deg, #FF7A00, #F04438)', borderRadius: 3 }} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Section>

    {/* ── 4. Projects ── */}
    <Section id="projects" bg="#FFFFFF">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: { xs: 5, md: 7 }, flexWrap: 'wrap', gap: 3 }}>
        <Box>
          <Label>Projects</Label>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' }, wordBreak: 'keep-all' }}>
            주요 프로젝트
          </Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 1, mt: 1.5 }} />
        </Box>
        <Button variant="outlined" color="primary" component={Link} to="/projects" sx={{ px: 2.5, py: 1 }}>
          전체 보기 →
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: 4 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#D1D5DB', borderRadius: 2 } }}>
        {[1, 2, 3].map((n) => (
          <Card key={n} sx={{ flex: '1 0 280px', minWidth: 280, minHeight: { xs: 200, md: 260 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.disabled">프로젝트 {n} 썸네일</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Section>

    {/* ── 5. Contact ── */}
    <ContactSection />

  </Box>
)

export default HomePage
