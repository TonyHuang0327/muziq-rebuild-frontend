import { Box } from "@mui/material";
import { alpha, keyframes, useTheme } from "@mui/material/styles";

/** 假等化器長條：steps 讓變化呈階梯狀 */
const barPulse = keyframes`
  0%, 100% { transform: scaleY(0.25); }
  50% { transform: scaleY(1); }
`;

const BAR_COUNT = 18;

/**
 * 全螢幕純 CSS 像素風動態背景（音樂氛圍：格線、掃描線、底部節拍條）。
 * fixed + pointer-events: none，不阻擋操作；尊重 prefers-reduced-motion。
 */
export const PixelMusicBackground = () => {
  const theme = useTheme();
  const { primary, secondary, accent } = theme.palette;
  const baseTop = alpha(secondary.main, 0.92);
  const baseBottom = "#0c0e12";

  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        imageRendering: "crisp-edges",
      }}
    >
      {/* 深色漸層底 */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(165deg, ${baseTop} 0%, ${baseBottom} 55%, ${alpha(primary.main, 0.55)} 100%)`,
        }}
      />
      {/* 底部節拍條 */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: { xs: 100, sm: 120 },
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: "6px",
          px: 2,
          //pb: 1.5,
          opacity: 0.55,
        }}
      >
        {Array.from({ length: BAR_COUNT }, (_, i) => {
          const duration = 1.5 + (i % 5) * 0.12;
          const delay = i * 0.08;
          return (
            <Box
              key={i}
              sx={{
                width: 48,
                height: "50dvh",
                borderRadius: 0,
                bgcolor: alpha(
                  i % 3 === 0
                    ? accent.main
                    : i % 3 === 1
                      ? secondary.main
                      : primary.light,
                  0.5,
                ),
                transformOrigin: "bottom",
                animation: `${barPulse} ${duration}s steps(8) infinite`,
                animationDelay: `${delay}s`,
                "@media (prefers-reduced-motion: reduce)": {
                  animation: "none",
                  transform: "scaleY(0.45)",
                },
                border: `4px solid black`,
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};
