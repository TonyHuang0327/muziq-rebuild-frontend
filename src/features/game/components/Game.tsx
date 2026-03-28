import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  LinearProgress,
  Stack,
} from "@mui/material";
import { muziqTheme } from "../../../theme";
import { usePlaylistQuery } from "../queries";
import { useGameSession } from "../hooks/useGameSession";

const TITLE_SHADOW_COLOR = muziqTheme.palette.accent.main;
const TITLE_SHADOW_LAYERS = 5;
const titleLayeredShadow = Array.from(
  { length: TITLE_SHADOW_LAYERS },
  (_, i) => {
    const n = i + 1;
    return `${n}px ${n}px ${TITLE_SHADOW_COLOR}`;
  },
).join(", ");

export const Game = () => {
  const { data, isLoading, error, refetch } = usePlaylistQuery({
    enabled: false,
  });
  const tracks = data?.tracks ?? [];
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

  const handleStart = async () => {
    if (data?.tracks?.length) {
      startGame(tracks);
      return;
    }
    const result = await refetch();
    if (result.data?.tracks?.length) {
      startGame(result.data.tracks);
    }
  };

  const isCorrect = (option: string) => {
    if (!question || !selected) return false;
    return option === question.correct.title;
  };

  const isWrong = (option: string) => {
    if (!selected || !question) return false;
    return selected === option && option !== question.correct.title;
  };

  // 進度：已作答題數 / 10 * 100；選答後該題算作答完
  const progressValue = isGameOver
    ? 100
    : ((questionIndex + (selected ? 1 : 0)) / totalQuestions) * 100;

  const isNotStarted = !question && !isGameOver && !isLoading;
  const showScoreAndProgress = !!question || isGameOver;

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
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
      {showScoreAndProgress && (
        <>
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
        </>
      )}

      {isNotStarted && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStart}
            sx={{
              py: 1.5,
              width: "400px",
              boxShadow:
                "1px 1px 0 0 #b2241e,2px 2px 0 0 #b2241e,3px 3px 0 0 #b2241e,4px 4px 0 0 #b2241e,5px 5px 0 0 #b2241e",
            }}
          >
            <Typography variant="h6">創建房間</Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleStart}
            sx={{
              py: 1.5,
              width: "400px",
              boxShadow:
                "1px 1px 0 0 #b2241e,2px 2px 0 0 #b2241e,3px 3px 0 0 #b2241e,4px 4px 0 0 #b2241e,5px 5px 0 0 #b2241e",
            }}
          >
            <Typography variant="h6">練習模式</Typography>
          </Button>
        </>
      )}

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress sx={{ color: "accent.main" }} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error.message}
        </Alert>
      )}

      {/* 遊戲進行中：顯示題目與選項 */}
      {question && !isLoading && (
        <Box>
          <audio
            key={question.correct.previewUrl}
            src={question.correct.previewUrl}
            autoPlay
          >
            <track default kind="captions" src={question.correct.previewUrl} />
          </audio>
          <Typography variant="body1" sx={{ mb: 3 }}>
            這首歌的歌手是 <strong>{question.correct.artist}</strong>
            ，請問歌名是？
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {question.options.map((opt) => (
              <Button
                key={opt}
                variant="outlined"
                fullWidth
                onClick={() => handleSelect(opt)}
                disabled={!!selected}
                sx={{
                  color: "white",
                  borderColor: "primary.main",
                  "&:hover": {
                    borderColor: "accent.main",
                    bgcolor: "rgba(0,255,255,0.1)",
                  },
                  ...(isCorrect(opt) && {
                    borderColor: "accent.main",
                    bgcolor: "rgba(0,255,255,0.2)",
                    color: "accent.main",
                  }),
                  ...(isWrong(opt) && {
                    borderColor: "error.main",
                    bgcolor: "rgba(255,0,0,0.2)",
                  }),
                }}
              >
                {opt}
              </Button>
            ))}
          </Box>
          {selected && (
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleNext}
            >
              下一題
            </Button>
          )}
        </Box>
      )}

      {/* 遊戲結束：顯示最終分數與再玩一輪 */}
      {isGameOver && !question && (
        <Box sx={{ textAlign: "center", py: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            遊戲結束！最終分數：{score}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={resetGame}
            sx={{ py: 1.5, px: 4 }}
          >
            再玩一輪
          </Button>
        </Box>
      )}
    </Stack>
  );
};
