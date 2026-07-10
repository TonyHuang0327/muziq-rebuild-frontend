import { useEffect } from "react";
import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material";
import { useGameSession } from "../hooks/useGameSession";
import type { Track } from "../types/playlist";

/** Kahoot 風格四色選項 */
const OPTION_COLORS = ["#e21b3c", "#1368ce", "#d89e00", "#26890c"] as const;
const AUTO_ADVANCE_DELAY_MS = 3000;

type GamePageProps = {
  tracks: Track[];
  isPlaylistLoading: boolean;
  onExit: () => void;
};

export const GamePage = ({
  tracks,
  isPlaylistLoading,
  onExit,
}: GamePageProps) => {
  const {
    score,
    questionIndex,
    isGameOver,
    question,
    selected,
    totalQuestions,
    startGame,
    handleSelect,
    handleNext,
    resetGame,
  } = useGameSession();

  useEffect(() => {
    if (tracks.length >= 4) {
      startGame(tracks);
    }
  }, [tracks, startGame]);

  useEffect(() => {
    if (!selected || !question) return;
    const timer = window.setTimeout(() => {
      handleNext();
    }, AUTO_ADVANCE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [selected, question, handleNext]);

  const handlePlayAgain = () => {
    resetGame();
    onExit();
  };

  const progressValue =
    ((questionIndex + (selected ? 1 : 0)) / totalQuestions) * 100;

  const isCorrect = (option: string) => {
    if (!question || !selected) return false;
    return option === question.correct.title;
  };

  const isWrong = (option: string) => {
    if (!question || !selected) return false;
    return selected === option && option !== question.correct.title;
  };

  if (isPlaylistLoading) {
    return null;
  }

  if (question) {
    return (
      <Box sx={{ width: 560, mx: "auto" }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          分數：{score}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progressValue}
          sx={{
            height: 8,
            borderRadius: 1,
            bgcolor: "rgba(255,255,255,0.2)",
            mb: 2,
            "& .MuiLinearProgress-bar": {
              bgcolor: "accent.main",
            },
          }}
        />
        <audio
          key={question.correct.previewUrl}
          src={question.correct.previewUrl}
          autoPlay
        />
        {/* <Typography variant="body1" sx={{ mb: 3 }}>
          這首歌的歌手是 <strong>{question.correct.artist}</strong>
          ，請問歌名是？
        </Typography> */}
        <Grid container spacing={2} sx={{ width: "100%" }}>
          {question.options.map((opt, index) => (
            <Grid key={opt} size={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleSelect(opt)}
                disabled={!!selected}
                sx={{
                  aspectRatio: "1 / 1",
                  borderRadius: 3,
                  bgcolor: OPTION_COLORS[index % OPTION_COLORS.length],
                  color: "white",
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  fontWeight: 700,
                  lineHeight: 1.3,
                  textTransform: "none",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  px: 1.5,
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: OPTION_COLORS[index % OPTION_COLORS.length],
                    filter: "brightness(1.08)",
                    boxShadow: "none",
                  },
                  "&.Mui-disabled": {
                    bgcolor: OPTION_COLORS[index % OPTION_COLORS.length],
                    color: "white",
                    opacity: selected ? 0.85 : 1,
                  },
                  ...(isCorrect(opt) && {
                    outline: "4px solid #00FFFF",
                    outlineOffset: 2,
                  }),
                  ...(isWrong(opt) && {
                    outline: "4px solid #ff5252",
                    outlineOffset: 2,
                    filter: "brightness(0.75)",
                  }),
                }}
              >
                {opt}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (isGameOver) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          遊戲結束！最終分數：{score}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handlePlayAgain}
          sx={{ py: 1.5, px: 4 }}
        >
          再玩一輪
        </Button>
      </Box>
    );
  }

  return null;
};
