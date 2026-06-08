import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import { Link } from 'react-router-dom'
import appleImg from '../assets/사과.jpg'

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
    <Box sx={{ maxWidth: 1280, mx: 'auto', width: '100%' }}>
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
      letterSpacing: 3,
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      mb: 1.5,
    }}
  >
    {children}
  </Typography>
)

const RowCards = ({ children, minWidth = 220 }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      gap: { xs: 2, md: 3 },
      overflowX: 'auto',
      pb: 1,
      '&::-webkit-scrollbar': { height: 4 },
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#DDDDDD', borderRadius: 2 },
    }}
  >
    {children}
  </Box>
)

const HomePage = () => {
  return (
    <Box>
      {/* ── 1. Hero ── */}
      <Section id="hero" bg="#F4F4F2">
        <Box
          sx={{
            textAlign: 'center',
            minHeight: { xs: '70vh', md: '85vh' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SectionTag>Hero Section</SectionTag>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.8rem', md: '4rem', lg: '4.5rem' },
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.15,
              wordBreak: 'keep-all',
            }}
          >
            여기는 Hero 섹션입니다.
          </Typography>
          <Divider sx={{ width: 60, borderColor: 'primary.main', borderWidth: 3, mx: 'auto', mb: 4 }} />
          <Box
            component="img"
            src={appleImg}
            alt="사과"
            sx={{
              width: { xs: 180, sm: 240, md: 320 },
              height: { xs: 180, sm: 240, md: 320 },
              objectFit: 'cover',
              borderRadius: '50%',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              mb: 4,
            }}
          />
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 640,
              mx: 'auto',
              lineHeight: 2,
              fontSize: { xs: '1rem', md: '1.1rem' },
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
            alignItems: 'center',
            gap: { xs: 5, md: 8 },
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <SectionTag>About Me</SectionTag>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.2rem' }, mb: 2, wordBreak: 'keep-all' }}
            >
              여기는 About Me 섹션입니다.
            </Typography>
            <Divider sx={{ width: 40, borderColor: 'primary.main', borderWidth: 2, mb: 3 }} />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 2, mb: 5, wordBreak: 'keep-all', fontSize: { xs: '0.95rem', md: '1.05rem' } }}
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
              sx={{ px: 5, py: 1.5, fontSize: '1rem' }}
            >
              더 알아보기
            </Button>
          </Box>
          <Card
            sx={{
              flex: 1,
              width: '100%',
              minHeight: { xs: 180, md: 280 },
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
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <SectionTag>Skill Tree</SectionTag>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.2rem' }, wordBreak: 'keep-all' }}
          >
            여기는 Skill Tree 섹션입니다.
          </Typography>
          <Divider sx={{ width: 40, borderColor: 'primary.main', borderWidth: 2, mx: 'auto', mt: 2 }} />
        </Box>

        <RowCards minWidth={220}>
          {['Frontend', 'Backend', 'Tools & ETC'].map((cat) => (
            <Card
              key={cat}
              sx={{
                flex: '1 0 220px',
                minWidth: 220,
                minHeight: { xs: 180, md: 220 },
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h3"
                  sx={{ mb: 2, color: 'primary.main', fontSize: { xs: '1.05rem', md: '1.25rem' } }}
                >
                  {cat}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'keep-all', lineHeight: 1.8 }}>
                  기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
                </Typography>
                <Box sx={{ mt: 3, height: 8, borderRadius: 4, backgroundColor: '#EBEBEB', overflow: 'hidden' }}>
                  <Box sx={{ height: '100%', width: '60%', backgroundColor: 'primary.main', borderRadius: 4 }} />
                </Box>
              </CardContent>
            </Card>
          ))}
        </RowCards>
      </Section>

      {/* ── 4. Projects ── */}
      <Section id="projects" bg="#FFFFFF">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <SectionTag>Projects</SectionTag>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.2rem' }, wordBreak: 'keep-all' }}
          >
            여기는 Projects 섹션입니다.
          </Typography>
          <Divider sx={{ width: 40, borderColor: 'primary.main', borderWidth: 2, mx: 'auto', mt: 2 }} />
        </Box>

        <RowCards minWidth={280}>
          {[1, 2, 3].map((n) => (
            <Card
              key={n}
              sx={{
                flex: '1 0 280px',
                minWidth: 280,
                minHeight: { xs: 200, md: 260 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.disabled">프로젝트 {n} 썸네일</Typography>
              </CardContent>
            </Card>
          ))}
        </RowCards>

        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/projects"
            size="large"
            sx={{ px: 6, py: 1.5, fontSize: '1rem' }}
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
              fontSize: { xs: '1.6rem', sm: '2rem', md: '2.2rem' },
              wordBreak: 'keep-all',
            }}
          >
            여기는 Contact 섹션입니다.
          </Typography>
          <Divider sx={{ width: 40, borderColor: 'primary.main', borderWidth: 2, mx: 'auto', mb: 4 }} />
          <Typography
            variant="body1"
            sx={{ color: '#999999', mb: 5, fontSize: { xs: '0.95rem', md: '1.05rem' }, wordBreak: 'keep-all' }}
          >
            연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
          </Typography>
          <Card
            sx={{
              maxWidth: { xs: '100%', sm: 520 },
              mx: 'auto',
              minHeight: { xs: 140, md: 200 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: { xs: 3, md: 5 } }}>
              <Typography variant="body2" color="text.disabled">메시지 폼 / 연락처 영역</Typography>
            </CardContent>
          </Card>
        </Box>
      </Section>
    </Box>
  )
}

export default HomePage
