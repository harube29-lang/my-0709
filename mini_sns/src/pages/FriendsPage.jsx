import { Box, Typography, Card, CardContent, Button, Avatar, AvatarGroup, Chip } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Layout from '../components/Layout'

const MOCK_MEETINGS = [
  { id: 1, title: '강남 카페 투어 🗺️', time: '오늘 오후 3시', location: '강남역 2번 출구', current: 4, max: 8, category: '카페투어' },
  { id: 2, title: '홍대 브런치 모임 ☕', time: '내일 오전 11시', location: '홍대 걷고싶은거리', current: 2, max: 6, category: '브런치' },
  { id: 3, title: '성수 감성카페 탐방 📸', time: '이번 주 토요일 2시', location: '성수동', current: 6, max: 10, category: '탐방' },
  { id: 4, title: '망원 로스터리 커피 ☕', time: '다음 주 일요일 1시', location: '망원역 근처', current: 3, max: 5, category: '커피' },
]

const FriendsPage = () => {
  return (
    <Layout>
      <Box sx={{ px: 2, pt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <LocationOnIcon sx={{ color: '#6D4C41', fontSize: 18 }} />
          <Typography variant="body2" sx={{ color: '#BCAAA4' }}>내 위치 기준 5km 이내</Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#3E2723', mb: 2 }}>
          근처 카페 모임 🤝
        </Typography>

        {MOCK_MEETINGS.map((meeting) => (
          <Card
            key={meeting.id}
            elevation={0}
            sx={{ mb: 2, border: '1px solid #EFD9D4', borderRadius: 3, bgcolor: '#fff' }}
          >
            <CardContent sx={{ pb: '12px !important' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <Chip
                    label={meeting.category}
                    size="small"
                    sx={{ bgcolor: '#EFD9D4', color: '#6D4C41', fontWeight: 600, fontSize: '0.7rem', mb: 0.8 }}
                  />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#3E2723', lineHeight: 1.3 }}>
                    {meeting.title}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTimeIcon sx={{ fontSize: 14, color: '#BCAAA4' }} />
                  <Typography variant="caption" sx={{ color: '#795548' }}>{meeting.time}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationOnIcon sx={{ fontSize: 14, color: '#BCAAA4' }} />
                  <Typography variant="caption" sx={{ color: '#795548' }}>{meeting.location}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 26, height: 26, fontSize: '0.7rem' } }}>
                    {Array.from({ length: meeting.current }).map((_, i) => (
                      <Avatar key={i} src={`https://picsum.photos/seed/person${meeting.id}${i}/50/50`} />
                    ))}
                  </AvatarGroup>
                  <Typography variant="caption" sx={{ color: '#BCAAA4' }}>
                    {meeting.current}/{meeting.max}명
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    bgcolor: '#6D4C41',
                    '&:hover': { bgcolor: '#4B2C20' },
                    borderRadius: 10,
                    px: 2,
                    fontSize: '0.75rem',
                  }}
                >
                  참가하기
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Layout>
  )
}

export default FriendsPage
