import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#6D4C41',
      light: '#9C786C',
      dark: '#4B2C20',
      contrastText: '#fff',
    },
    secondary: {
      main: '#BCAAA4',
      light: '#EFD9D4',
      dark: '#8C7B75',
    },
    background: {
      default: '#FFF8F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3E2723',
      secondary: '#795548',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", sans-serif',
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 20, textTransform: 'none' },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: { backgroundColor: '#fff', borderTop: '1px solid #EFD9D4' },
      },
    },
  },
})

export default theme
