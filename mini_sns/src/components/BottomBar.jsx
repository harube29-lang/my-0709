import { BottomNavigation, BottomNavigationAction, Paper, Fab } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import AddIcon from '@mui/icons-material/Add'
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import { useNavigate, useLocation } from 'react-router-dom'

const BottomBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const getNavValue = () => {
    const path = location.pathname
    if (path === '/') return 0
    if (path === '/friends') return 1
    if (path === '/chat') return 3
    if (path === '/mypage') return 4
    return false
  }

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        borderTop: '1px solid #EFD9D4',
        maxWidth: 480,
        mx: 'auto',
      }}
    >
      <BottomNavigation value={getNavValue()} showLabels={false} sx={{ height: 60, position: 'relative' }}>
        <BottomNavigationAction
          icon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{ color: getNavValue() === 0 ? '#6D4C41' : '#BCAAA4', '&.Mui-selected': { color: '#6D4C41' } }}
        />
        <BottomNavigationAction
          icon={<PeopleIcon />}
          onClick={() => navigate('/friends')}
          sx={{ color: getNavValue() === 1 ? '#6D4C41' : '#BCAAA4', '&.Mui-selected': { color: '#6D4C41' } }}
        />
        {/* 가운데 게시물 작성 버튼 */}
        <BottomNavigationAction
          icon={
            <Fab
              size="medium"
              sx={{
                bgcolor: '#6D4C41',
                color: '#fff',
                boxShadow: '0 2px 8px rgba(109,76,65,0.4)',
                '&:hover': { bgcolor: '#4B2C20' },
                mt: '-20px',
              }}
              onClick={() => navigate('/create')}
            >
              <AddIcon />
            </Fab>
          }
          sx={{ pointerEvents: 'none', '& .MuiBottomNavigationAction-label': { display: 'none' } }}
        />
        <BottomNavigationAction
          icon={<ChatBubbleOutlinedIcon />}
          onClick={() => navigate('/chat')}
          sx={{ color: getNavValue() === 3 ? '#6D4C41' : '#BCAAA4', '&.Mui-selected': { color: '#6D4C41' } }}
        />
        <BottomNavigationAction
          icon={<PersonOutlinedIcon />}
          onClick={() => navigate('/mypage')}
          sx={{ color: getNavValue() === 4 ? '#6D4C41' : '#BCAAA4', '&.Mui-selected': { color: '#6D4C41' } }}
        />
      </BottomNavigation>
    </Paper>
  )
}

export default BottomBar
