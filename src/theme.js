import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary:   { main: '#E85C1E' },
    secondary: { main: '#1C1C1C' },
    background: {
      default: '#F4F4F2',
      paper:   '#FFFFFF',
    },
    text: {
      primary:   '#1C1C1C',
      secondary: '#555555',
      disabled:  '#999999',
    },
    divider: '#DDDDDD',
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans KR", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem',  fontWeight: 700 },
    h2: { fontSize: '1.75rem', fontWeight: 600 },
    h3: { fontSize: '1.25rem', fontWeight: 600 },
    body1: { fontSize: '1rem',    fontWeight: 400 },
    body2: { fontSize: '0.875rem',fontWeight: 400 },
    caption: { fontSize: '0.75rem', color: '#999999' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 2, textTransform: 'none', fontWeight: 600 },
        containedPrimary: {
          backgroundColor: '#E85C1E',
          '&:hover': { backgroundColor: '#c94d16' },
        },
        outlinedPrimary: {
          borderColor: '#E85C1E',
          color: '#E85C1E',
          '&:hover': { backgroundColor: 'rgba(232,92,30,0.06)' },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1C1C1C',
          boxShadow: '0 1px 0 #DDDDDD',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12, border: '1px solid #DDDDDD', boxShadow: 'none' },
      },
    },
  },
})

export default theme
