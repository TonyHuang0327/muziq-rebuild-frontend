import { Box } from "@mui/material";
import { PixelMusicBackground } from "./components/PixelMusicBackground";
import { Game } from "./features/game/components/Game";

const App = () => (
  <Box
    sx={{
      position: "relative",
      minHeight: "100vh",
      isolation: "isolate",
    }}
  >
    <PixelMusicBackground />
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
      }}
    >
      <Game />
    </Box>
  </Box>
);

export default App;
