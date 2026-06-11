import { useState, useEffect } from 'react'
import {
  Box, Avatar, Typography, IconButton, CircularProgress,
  Modal, Backdrop, Fade, Button, Tabs, Tab, Chip, Divider
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LinkIcon from '@mui/icons-material/Link'
import GridOnIcon from '@mui/icons-material/GridOn'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from '../utils/dateUtils'
import CommentSection from '../components/CommentSection'

// ── 목업 데이터 ──────────────────────────────────────
const MOCK_HIGHLIGHTS = [
  { label: 'Seoul', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=60&h=60&fit=crop' },
  { label: 'Latte', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=60&h=60&fit=crop' },
  { label: 'Bakery', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=60&h=60&fit=crop' },
  { label: 'Roastery', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=60&h=60&fit=crop' },
  { label: 'Brunch', img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=60&h=60&fit=crop' },
]

const MOCK_PROJECTS = [
  {
    id: 1, title: 'Cafe Notes App', desc: '카페 리뷰 SNS 풀스택 프로젝트',
    tags: ['React', 'Supabase', 'MUI'],
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=220&fit=crop',
    link: '#',
  },
  {
    id: 2, title: 'Seoul Cafe Map', desc: '서울 카페 위치 기반 지도 서비스',
    tags: ['Next.js', 'Kakao API'],
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=220&fit=crop',
    link: '#',
  },
  {
    id: 3, title: 'Latte Art Guide', desc: '라떼아트 입문자를 위한 인터랙티브 가이드',
    tags: ['React', 'Framer'],
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=220&fit=crop',
    link: '#',
  },
]

const MOCK_CAFE_PICKS = [
  { id: 1, name: '어니언 성수', location: '성수동', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop', rating: 5 },
  { id: 2, name: 'Fritz Coffee', location: '도화동', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop', rating: 5 },
  { id: 3, name: '테일러커피', location: '합정동', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=200&h=200&fit=crop', rating: 4 },
  { id: 4, name: '알베르', location: '연남동', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', rating: 5 },
  { id: 5, name: 'Moment', location: '서촌', img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=200&h=200&fit=crop', rating: 4 },
  { id: 6, name: '커피한약방', location: '익선동', img: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200&h=200&fit=crop', rating: 5 },
]

const MOCK_GUESTBOOK = [
  { id: 1, name: '커피러버', avatar: 'https://picsum.photos/seed/g1/40/40', msg: '카페 리뷰 항상 잘 보고 있어요! 덕분에 좋은 카페 많이 발견했습니다 ☕', time: '2일 전', stars: 5 },
  { id: 2, name: '라떼마니아', avatar: 'https://picsum.photos/seed/g2/40/40', msg: '성수동 카페 추천 리스트 정말 도움됐어요. 다음 주에 투어 가려고요!', time: '4일 전', stars: 5 },
  { id: 3, name: 'espresso_daily', avatar: 'https://picsum.photos/seed/g3/40/40', msg: 'Cafe Notes 앱 완성도가 진짜 높네요. 개발 과정도 궁금합니다!', time: '1주 전', stars: 4 },
]

import { CAFE_IMAGES, resolvePostImage } from '../utils/cafeImages'

const getMyPostImage = resolvePostImage

// ── 컬러 상수 ─────────────────────────────────────────
const C = {
  orange: '#FF7A00',
  red: '#F04438',
  black: '#111827',
  gray: '#6B7280',
  grayLight: '#D1D5DB',
  grayBg: '#F9FAFB',
  white: '#FFFFFF',
}

const gradientBorder = `linear-gradient(135deg, ${C.orange}, ${C.red})`

// ── 서브 컴포넌트: 통계 아이템 ──────────────────────
const StatItem = ({ value, label }) => (
  <Box sx={{ flex: 1, textAlign: 'center' }}>
    <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: C.black, lineHeight: 1.1, letterSpacing: '-0.5px' }}>
      {value}
    </Typography>
    <Typography sx={{ fontSize: '0.68rem', color: C.gray, mt: 0.2, fontWeight: 400 }}>
      {label}
    </Typography>
  </Box>
)

// ── 서브 컴포넌트: 하이라이트 원형 ──────────────────
const Highlight = ({ label, img }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.6, flexShrink: 0, cursor: 'pointer' }}>
    <Box sx={{ background: gradientBorder, borderRadius: '50%', p: '2px', width: 60, height: 60 }}>
      <Box sx={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '2px solid #fff' }}>
        <Box component="img" src={img} alt={label} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
    </Box>
    <Typography sx={{ fontSize: '0.65rem', color: C.black, fontWeight: 400 }}>{label}</Typography>
  </Box>
)

// ── 서브 컴포넌트: 탭 패널 ──────────────────────────
const TabPanel = ({ value, index, children }) =>
  value === index ? <Box>{children}</Box> : null


// ── 메인 컴포넌트 ─────────────────────────────────────
const MyPage = () => {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState(0)
  const [selectedPost, setSelectedPost] = useState(null)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [commentCount, setCommentCount] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (user) fetchMyPosts()
    else setLoading(false)
  }, [user])

  useEffect(() => {
    if (selectedPost) {
      setLiked(false)
      setLikesCount(selectedPost.likes_count || 0)
      setCommentCount(selectedPost.comments_count || 0)
    }
  }, [selectedPost])

  const fetchMyPosts = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('sns_posts')
      .select('*, sns_profiles(nickname, profile_image_url)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  const handleLike = async () => {
    if (!user || !selectedPost) return
    if (liked) {
      await supabase.from('sns_likes').delete().eq('post_id', selectedPost.id).eq('user_id', user.id)
      setLiked(false); setLikesCount(c => c - 1)
    } else {
      await supabase.from('sns_likes').insert({ post_id: selectedPost.id, user_id: user.id })
      setLiked(true); setLikesCount(c => c + 1)
    }
  }

  if (!user) {
    return (
      <Layout>
        <Box sx={{ textAlign: 'center', pt: 10 }}>
          <Typography sx={{ color: C.gray, mb: 2 }}>로그인이 필요합니다</Typography>
          <Button variant="contained" onClick={() => navigate('/login')}
            sx={{ bgcolor: C.black, borderRadius: 2, '&:hover': { bgcolor: '#374151' } }}>
            로그인하러 가기
          </Button>
        </Box>
      </Layout>
    )
  }

  const avatarSrc = profile?.profile_image_url || `https://picsum.photos/seed/${user.id}/200/200`
  const stats = [
    { value: posts.length, label: 'Posts' },
    { value: 3, label: 'Projects' },
    { value: 6, label: 'Cafes' },
    { value: MOCK_GUESTBOOK.length, label: 'Guests' },
  ]

  return (
    <Layout>
      <Box sx={{ bgcolor: C.grayBg, minHeight: '100%' }}>

        {/* ── 프로필 히어로 ──────────────────────── */}
        <Box sx={{ bgcolor: C.white, pb: 0 }}>

          {/* 상단 헤더 행 */}
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 2, pb: 0.5 }}>
            <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: C.black, letterSpacing: '-0.3px' }}>
              {profile?.nickname || 'My Profile'}
            </Typography>
            <IconButton size="small" onClick={() => setMenuOpen(v => !v)} sx={{ color: C.black }}>
              <MoreHorizIcon />
            </IconButton>

            {/* 드롭다운 메뉴 (설정/로그아웃) */}
            {menuOpen && (
              <Box sx={{
                position: 'absolute', right: 0, top: '110%', zIndex: 20,
                bgcolor: C.white, borderRadius: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
                border: `1px solid ${C.grayLight}`, overflow: 'hidden', minWidth: 140,
              }}>
                <Box onClick={async () => { setMenuOpen(false); await signOut(); navigate('/login') }}
                  sx={{ px: 2, py: 1.4, cursor: 'pointer', '&:hover': { bgcolor: C.grayBg } }}>
                  <Typography sx={{ fontSize: '0.85rem', color: '#EF4444', fontWeight: 500 }}>로그아웃</Typography>
                </Box>
              </Box>
            )}
          </Box>

          {/* 프로필 정보 행 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, pt: 1.5, pb: 2 }}>

            {/* 그라데이션 테두리 아바타 */}
            <Box sx={{
              background: gradientBorder,
              borderRadius: '50%',
              p: '3px',
              width: 96,
              height: 96,
              flexShrink: 0,
              boxShadow: `0 4px 20px rgba(255,122,0,0.35)`,
            }}>
              <Box sx={{ width: '100%', height: '100%', borderRadius: '50%', bgcolor: '#fff', p: '2px' }}>
                <Box component="img" src={avatarSrc} alt="profile"
                  sx={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
              </Box>
            </Box>

            {/* 통계 4개 */}
            <Box sx={{ display: 'flex', flex: 1, pt: 0.5 }}>
              {stats.map((s) => <StatItem key={s.label} value={s.value} label={s.label} />)}
            </Box>
          </Box>

          {/* 바이오 영역 */}
          <Box sx={{ px: 2, pb: 1.5 }}>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: C.black, lineHeight: 1.4 }}>
              {profile?.nickname || '카페러버'} ☕
            </Typography>
            <Typography sx={{ fontSize: '0.82rem', color: C.gray, mt: 0.3, lineHeight: 1.6 }}>
              카페를 기록하는 사람 | 스페셜티 커피 덕후
              <br />좋은 공간과 좋은 커피를 찾아다닙니다
            </Typography>

            {/* 위치 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, mt: 0.8 }}>
              <LocationOnIcon sx={{ fontSize: 13, color: C.gray }} />
              <Typography sx={{ fontSize: '0.78rem', color: C.gray }}>Seoul, Korea</Typography>
            </Box>

            {/* 관심사 태그 */}
            <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap', mt: 1 }}>
              {['#스페셜티', '#카페투어', '#브런치', '#라떼아트', '#로스터리'].map(tag => (
                <Chip key={tag} label={tag} size="small" sx={{
                  height: 22, fontSize: '0.68rem', fontWeight: 500,
                  bgcolor: '#FFF3E0', color: C.orange,
                  border: 'none', '& .MuiChip-label': { px: 1 },
                }} />
              ))}
            </Box>

            {/* 링크 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
              <LinkIcon sx={{ fontSize: 13, color: C.orange }} />
              <Typography sx={{ fontSize: '0.78rem', color: C.orange, fontWeight: 500, cursor: 'pointer' }}>
                cafenotes.notion.so
              </Typography>
            </Box>
          </Box>

          {/* 액션 버튼 */}
          <Box sx={{ display: 'flex', gap: 1, px: 2, pb: 2 }}>
            <Button variant="contained" fullWidth sx={{
              bgcolor: C.black, color: C.white, borderRadius: 2,
              py: 0.9, fontSize: '0.85rem', fontWeight: 600, textTransform: 'none',
              boxShadow: 'none', '&:hover': { bgcolor: '#1F2937', boxShadow: 'none' },
            }}>
              Portfolio
            </Button>
            <Button variant="outlined" fullWidth sx={{
              borderColor: C.grayLight, color: '#374151', borderRadius: 2,
              py: 0.9, fontSize: '0.85rem', fontWeight: 600, textTransform: 'none',
              '&:hover': { bgcolor: C.grayBg, borderColor: '#9CA3AF' },
            }}>
              Contact
            </Button>
            <Button variant="outlined" sx={{
              borderColor: C.grayLight, color: '#374151', borderRadius: 2,
              py: 0.9, px: 1.5, minWidth: 0, fontSize: '0.85rem', fontWeight: 600,
              '&:hover': { bgcolor: C.grayBg, borderColor: '#9CA3AF' },
            }}>
              ＋
            </Button>
          </Box>

          {/* 하이라이트 스토리 */}
          <Box sx={{ display: 'flex', gap: 2.5, overflowX: 'auto', px: 2, pb: 2,
            '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>
            {MOCK_HIGHLIGHTS.map(h => <Highlight key={h.label} {...h} />)}
          </Box>

          {/* 탭 네비게이션 */}
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="fullWidth"
            sx={{
              borderTop: `1px solid #F3F4F6`,
              minHeight: 44,
              '& .MuiTabs-indicator': { bgcolor: C.black, height: 1.5 },
              '& .MuiTab-root': {
                minHeight: 44, color: C.grayLight,
                '&.Mui-selected': { color: C.black },
              },
            }}
          >
            <Tab icon={<GridOnIcon sx={{ fontSize: 22 }} />} sx={{ pt: 0.5 }} />
            <Tab icon={<WorkOutlinedIcon sx={{ fontSize: 22 }} />} sx={{ pt: 0.5 }} />
            <Tab icon={<LocalCafeIcon sx={{ fontSize: 22 }} />} sx={{ pt: 0.5 }} />
            <Tab icon={<MenuBookIcon sx={{ fontSize: 22 }} />} sx={{ pt: 0.5 }} />
          </Tabs>
        </Box>

        {/* ── 탭 레이블 힌트 (작은 텍스트) ── */}
        <Box sx={{ display: 'flex', bgcolor: C.white, borderBottom: `1px solid #F3F4F6` }}>
          {['Posts', 'Projects', 'Cafe Picks', 'Guestbook'].map((label, i) => (
            <Typography key={label} onClick={() => setTab(i)} sx={{
              flex: 1, textAlign: 'center', fontSize: '0.65rem', py: 0.4,
              color: tab === i ? C.black : C.gray,
              fontWeight: tab === i ? 600 : 400,
              cursor: 'pointer',
            }}>
              {label}
            </Typography>
          ))}
        </Box>

        {/* ── 콘텐츠 영역 ──────────────────────── */}

        {/* Tab 0: Posts 3열 그리드 */}
        <TabPanel value={tab} index={0}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 6 }}>
              <CircularProgress size={28} sx={{ color: C.orange }} />
            </Box>
          ) : posts.length === 0 ? (
            <Box sx={{ textAlign: 'center', pt: 8, px: 3 }}>
              <LocalCafeIcon sx={{ fontSize: 40, color: C.grayLight, mb: 1 }} />
              <Typography sx={{ color: C.gray, fontSize: '0.9rem' }}>아직 올린 게시물이 없어요</Typography>
              <Typography sx={{ color: C.grayLight, fontSize: '0.8rem', mt: 0.5 }}>
                첫 번째 카페 리뷰를 올려보세요!
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', mt: '2px' }}>
              {posts.map((post, idx) => (
                <Box
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  sx={{
                    position: 'relative', cursor: 'pointer',
                    overflow: 'hidden',
                    '&:hover .thumb': { transform: 'scale(1.06)' },
                    '&:hover .overlay': { opacity: 1 },
                  }}
                >
                  <Box
                    className="thumb"
                    component="img"
                    src={getMyPostImage(post.image_url, idx)}
                    alt="post"
                    sx={{
                      width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block',
                      transition: 'transform 0.3s ease',
                    }}
                    onError={e => { e.target.onerror = null; e.target.src = CAFE_IMAGES[(idx + 12) % CAFE_IMAGES.length] }}
                  />
                  <Box className="overlay" sx={{
                    position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.28)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5,
                    opacity: 0, transition: 'opacity 0.25s',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                      <FavoriteIcon sx={{ color: '#fff', fontSize: 15 }} />
                      <Typography sx={{ color: '#fff', fontSize: '0.72rem', fontWeight: 700 }}>{post.likes_count}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                      <ChatBubbleOutlinedIcon sx={{ color: '#fff', fontSize: 15 }} />
                      <Typography sx={{ color: '#fff', fontSize: '0.72rem', fontWeight: 700 }}>{post.comments_count || 0}</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </TabPanel>

        {/* Tab 1: Projects */}
        <TabPanel value={tab} index={1}>
          <Box sx={{ px: 2, pt: 2, pb: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {MOCK_PROJECTS.map(proj => (
              <Box key={proj.id} sx={{
                bgcolor: C.white, borderRadius: 3, overflow: 'hidden',
                boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
              }}>
                <Box component="img" src={proj.img} alt={proj.title}
                  sx={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: C.black }}>{proj.title}</Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: C.gray, mt: 0.3 }}>{proj.desc}</Typography>
                  <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap', mt: 1 }}>
                    {proj.tags.map(tag => (
                      <Chip key={tag} label={tag} size="small" sx={{
                        height: 20, fontSize: '0.66rem', fontWeight: 500,
                        bgcolor: '#F3F4F6', color: '#374151',
                        '& .MuiChip-label': { px: 1 },
                      }} />
                    ))}
                  </Box>
                  <Typography sx={{ fontSize: '0.75rem', color: C.orange, fontWeight: 500, mt: 1, cursor: 'pointer' }}>
                    자세히 보기 →
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </TabPanel>

        {/* Tab 2: Cafe Picks */}
        <TabPanel value={tab} index={2}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', mt: '2px' }}>
            {MOCK_CAFE_PICKS.map(cafe => (
              <Box key={cafe.id} sx={{
                position: 'relative', cursor: 'pointer', overflow: 'hidden',
                '&:hover .cafe-thumb': { transform: 'scale(1.06)' },
                '&:hover .cafe-overlay': { opacity: 1 },
              }}>
                <Box
                  className="cafe-thumb"
                  component="img"
                  src={cafe.img}
                  alt={cafe.name}
                  sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
                  onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=200&fit=crop' }}
                />
                <Box className="cafe-overlay" sx={{
                  position: 'absolute', inset: 0, opacity: 0, transition: 'opacity 0.25s',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', p: 1,
                }}>
                  <Typography sx={{ color: '#fff', fontSize: '0.68rem', fontWeight: 600, lineHeight: 1.2 }}>{cafe.name}</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.6rem' }}>{cafe.location}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </TabPanel>

        {/* Tab 3: Guestbook */}
        <TabPanel value={tab} index={3}>
          <Box sx={{ px: 2, pt: 2, pb: 2, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
            {MOCK_GUESTBOOK.map(entry => (
              <Box key={entry.id} sx={{
                bgcolor: C.white, borderRadius: 3, p: 2,
                boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
                  <Avatar src={entry.avatar} sx={{ width: 36, height: 36 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: C.black, lineHeight: 1.2 }}>
                      {entry.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: C.grayLight }}>{entry.time}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.2 }}>
                    {Array.from({ length: entry.stars }).map((_, i) => (
                      <Box key={i} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: C.orange }} />
                    ))}
                  </Box>
                </Box>
                <Typography sx={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.6 }}>{entry.msg}</Typography>
              </Box>
            ))}

            {/* 방명록 작성 유도 */}
            <Box sx={{
              bgcolor: C.white, borderRadius: 3, p: 2,
              border: `1.5px dashed ${C.grayLight}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', gap: 1,
            }}>
              <Typography sx={{ fontSize: '0.82rem', color: C.gray }}>방명록 남기기</Typography>
              <Typography sx={{ fontSize: '0.82rem', color: C.orange }}>✏️</Typography>
            </Box>
          </Box>
        </TabPanel>

      </Box>

      {/* ── 게시물 상세 모달 ────────────────────── */}
      <Modal
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { sx: { backdropFilter: 'blur(4px)', bgcolor: 'rgba(0,0,0,0.65)' } } }}
      >
        <Fade in={!!selectedPost}>
          <Box sx={{
            position: 'fixed', top: '52px', left: '50%', transform: 'translateX(-50%)',
            width: '100%', maxWidth: 480, height: 'calc(100vh - 112px)',
            bgcolor: C.white, overflowY: 'auto', outline: 'none',
            borderRadius: '0 0 16px 16px',
          }}>
            {selectedPost && (
              <>
                {/* 모달 헤더 */}
                <Box sx={{
                  display: 'flex', alignItems: 'center', px: 2, py: 1.2,
                  borderBottom: '1px solid #F3F4F6', position: 'sticky', top: 0, bgcolor: C.white, zIndex: 1,
                }}>
                  <Box sx={{ background: gradientBorder, borderRadius: '50%', p: '1.8px', mr: 1.2 }}>
                    <Box sx={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', border: '1.5px solid #fff' }}>
                      <Box component="img" src={selectedPost.sns_profiles?.profile_image_url || avatarSrc}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: C.black, lineHeight: 1.2 }}>
                      {selectedPost.sns_profiles?.nickname}
                    </Typography>
                    {selectedPost.location && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                        <LocationOnIcon sx={{ fontSize: 11, color: C.gray }} />
                        <Typography sx={{ fontSize: '0.68rem', color: C.gray }}>{selectedPost.location}</Typography>
                      </Box>
                    )}
                  </Box>
                  <Typography sx={{ fontSize: '0.72rem', color: C.grayLight, mr: 1 }}>
                    {formatDistanceToNow(selectedPost.created_at)}
                  </Typography>
                  <IconButton size="small" onClick={() => setSelectedPost(null)} sx={{ color: C.gray }}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>

                {/* 이미지 */}
                <Box component="img" src={getMyPostImage(selectedPost.image_url, selectedPost.id)} alt="post"
                  sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
                  onError={e => { e.target.onerror = null; e.target.src = CAFE_IMAGES[0] }} />

                {/* 좋아요·댓글 카운트 */}
                <Box sx={{ px: 2, pt: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <IconButton size="small" onClick={handleLike} sx={{ color: liked ? '#EF4444' : C.black, pl: 0 }}>
                      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: C.black, mr: 1.5 }}>{likesCount}</Typography>
                    <ChatBubbleOutlinedIcon sx={{ fontSize: 20, color: C.black, mr: 0.5 }} />
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: C.black }}>{commentCount}</Typography>
                  </Box>

                  {selectedPost.caption && (
                    <Typography sx={{ fontSize: '0.85rem', color: C.black, mb: 0.5, lineHeight: 1.6 }}>
                      <Box component="span" sx={{ fontWeight: 600 }}>{selectedPost.sns_profiles?.nickname} </Box>
                      {selectedPost.caption}
                    </Typography>
                  )}
                  {selectedPost.hashtags && (
                    <Typography sx={{ fontSize: '0.8rem', color: C.orange, mb: 1 }}>{selectedPost.hashtags}</Typography>
                  )}
                </Box>

                {/* 댓글 섹션 — 인라인 */}
                <CommentSection
                  postId={selectedPost.id}
                  onCountChange={setCommentCount}
                />
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Layout>
  )
}

export default MyPage
