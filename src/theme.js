import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF7A00',
      dark: '#E66E00',
      light: '#FF9A3C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F04438',
      dark: '#D92D20',
      light: '#F97066',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F9FAFB',
      paper:   '#FFFFFF',
    },
    text: {
      primary:   '#111827',
      secondary: '#6B7280',
      disabled:  '#9CA3AF',
    },
    grey: {
      100: '#F9FAFB',
      200: '#F3F4F6',
      300: '#E5E7EB',
      400: '#D1D5DB',
      500: '#9CA3AF',
      600: '#6B7280',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    divider: '#E5E7EB',
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Noto Sans KR", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, color: '#111827', lineHeight: 1.2 },
    h2: { fontWeight: 700, color: '#111827', lineHeight: 1.25 },
    h3: { fontWeight: 600, color: '#111827', lineHeight: 1.35 },
    body1: { fontWeight: 400, color: '#374151', lineHeight: 1.75 },
    body2: { fontWeight: 400, color: '#6B7280', lineHeight: 1.6 },
    caption: { fontWeight: 400, color: '#6B7280', lineHeight: 1.5 },
    button: { fontWeight: 600, textTransform: 'none' },
  },

  shape: { borderRadius: 8 },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.9375rem',
          letterSpacing: 0,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #FF7A00 0%, #F04438 100%)',
          boxShadow: '0 2px 12px rgba(255,122,0,0.28)',
          '&:hover': {
            background: 'linear-gradient(135deg, #E66E00 0%, #D92D20 100%)',
            boxShadow: '0 4px 18px rgba(255,122,0,0.38)',
          },
        },
        outlinedPrimary: {
          borderColor: '#FF7A00',
          color: '#FF7A00',
          borderWidth: '1.5px',
          '&:hover': {
            backgroundColor: 'rgba(255,122,0,0.05)',
            borderColor: '#E66E00',
            borderWidth: '1.5px',
          },
        },
        textPrimary: {
          color: '#FF7A00',
          '&:hover': { backgroundColor: 'rgba(255,122,0,0.05)' },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#111827',
          boxShadow: 'none',
          borderBottom: '1px solid #E5E7EB',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #E5E7EB',
          boxShadow: 'none',
          backgroundColor: '#FFFFFF',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          },
        },
      },
    },

    MuiDivider: {
      styleOverrides: { root: { borderColor: '#E5E7EB' } },
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 500 },
      },
    },
  },
})

export default theme
