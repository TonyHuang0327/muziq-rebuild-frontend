import type { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { muziqTheme } from "../theme";

const TITLE_SHADOW_COLOR = muziqTheme.palette.accent.main;
const TITLE_SHADOW_LAYERS = 5;
const titleLayeredShadow = Array.from(
  { length: TITLE_SHADOW_LAYERS },
  (_, i) => {
    const n = i + 1;
    return `${n}px ${n}px ${TITLE_SHADOW_COLOR}`;
  },
).join(", ");

type GameShellProps = {
  children: ReactNode;
};

/** 遊戲共用版面：Logo、標題與置中內容區 */
export const GameShell = ({ children }: GameShellProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Box
        alt="MUZIQ"
        component="img"
        src="/muziq.png"
        sx={{
          position: "absolute",
          top: { xs: 12, sm: 16 },
          left: { xs: 12, sm: 16 },
          width: 200,
          zIndex: 1,
        }}
      />
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ minHeight: "100vh" }}
      >
        <Typography
          variant="h1"
          sx={{
            mb: 1,
            color: "primary.main",
            fontWeight: "bold",
            textShadow: titleLayeredShadow,
          }}
        >
          MUZIQ
        </Typography>
        {children}
      </Stack>
    </Box>
  );
};
