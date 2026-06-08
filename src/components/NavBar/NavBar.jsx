import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const NAV_ITEMS = [
  { label: 'Home',       path: '/' },
  { label: 'About Me',   path: '/about' },
  { label: 'Projects',   path: '/projects' },
]

const NavBar = () => {
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ maxWidth: 1280, width: '100%', mx: 'auto', px: { xs: 4, md: 8 }, minHeight: { xs: 72, md: 96 }, py: { xs: 1.5, md: 2 } }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'primary.main', fontWeight: 700, letterSpacing: 1 }}
        >
          PORTFOLIO
        </Typography>

        {isMobile ? (
          <>
            <IconButton onClick={() => setDrawerOpen(true)} edge="end">
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <List sx={{ width: 200, pt: 4 }}>
                {NAV_ITEMS.map(({ label, path }) => (
                  <ListItem key={path} disablePadding>
                    <ListItemButton
                      component={Link}
                      to={path}
                      selected={location.pathname === path}
                      onClick={() => setDrawerOpen(false)}
                      sx={{ '&.Mui-selected': { color: 'primary.main' } }}
                    >
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {NAV_ITEMS.map(({ label, path }) => (
              <Button
                key={path}
                component={Link}
                to={path}
                sx={{
                  color: location.pathname === path ? 'primary.main' : 'text.primary',
                  fontWeight: location.pathname === path ? 700 : 400,
                  borderBottom: location.pathname === path ? '2px solid' : '2px solid transparent',
                  borderColor: location.pathname === path ? 'primary.main' : 'transparent',
                  borderRadius: 0,
                  px: 2,
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
