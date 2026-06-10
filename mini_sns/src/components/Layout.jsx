import { Box } from '@mui/material'
import TopBar from './TopBar'
import BottomBar from './BottomBar'

const Layout = ({ children }) => {
  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', bgcolor: '#FFF8F5', minHeight: '100vh', position: 'relative' }}>
      <TopBar />
      <Box sx={{ pt: '52px', pb: '60px', minHeight: '100vh' }}>
        {children}
      </Box>
      <BottomBar />
    </Box>
  )
}

export default Layout
