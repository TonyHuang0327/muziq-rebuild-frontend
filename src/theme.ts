import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary']
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary']
  }
}

/** MUZIQ 品牌設計 Token */
export const muziqTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8A2BE2' },
    secondary: { main: '#4B0082' },
    background: { default: '#1a0a2e', paper: '#2d1b4e' },
    // Neon Cyan 正確答案高亮
    accent: { main: '#00FFFF' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#1a0a2e' },
      },
    },
  },
})
