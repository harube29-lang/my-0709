import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'

const TopBar = () => {
  return (
    <AppBar position="fixed" elevation={0} sx={{ bgcolor: '#fff', borderBottom: '1px solid #EFD9D4', zIndex: 1200 }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '52px !important', px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocalCafeIcon sx={{ color: '#6D4C41', fontSize: 26 }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: '#6D4C41', fontSize: '1.1rem', letterSpacing: '-0.5px' }}
          >
            Cafe Notes
          </Typography>
        </Box>
        <IconButton size="small">
          <Badge badgeContent={3} color="error">
            <NotificationsNoneIcon sx={{ color: '#6D4C41' }} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
