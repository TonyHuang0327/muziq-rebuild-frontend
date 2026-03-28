import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
  }
  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
  }
}
export const muziqTheme = createTheme({
  palette: {
    primary: { main: "#fea42a" },
    secondary: { main: "#55d4c5" },
    accent: { main: "#b2241e" },
    background: { default: "#eef6ff" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // 與像素動態背景銜接，避免載入時露出亮色底
        body: {
          backgroundColor: "#0c0e12",
        },
      },
    },
  },
});
