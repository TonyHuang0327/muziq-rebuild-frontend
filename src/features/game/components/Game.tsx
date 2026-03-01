import { useState } from 'react'
import { Button, Box, Typography, CircularProgress, Alert } from '@mui/material'
import { usePlaylistQuery } from '../queries'
import type { Track } from '../../../types/playlist'

/** 隨機洗牌陣列 */
const shuffleArray = <T,>(arr: T[]): T[] => {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** 從播放清單產生一題：1 個正確答案 + 3 個錯誤選項 */
const createQuestion = (tracks: Track[]): { correct: Track; options: string[] } => {
  if (tracks.length < 4) throw new Error('播放清單至少需要 4 首歌')
  const correct = tracks[Math.floor(Math.random() * tracks.length)]
  const otherTitles = tracks
    .filter((t) => t.title !== correct.title)
    .map((t) => t.title)
  const wrongTitles = shuffleArray(otherTitles).slice(0, 3)
  const options = shuffleArray([correct.title, ...wrongTitles])
  return { correct, options }
}

export const Game = () => {
  const { data, isLoading, error, refetch } = usePlaylistQuery({ enabled: false })
  const [question, setQuestion] = useState<{ correct: Track; options: string[] } | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const handleStart = async () => {
    setQuestion(null)
    setSelected(null)
    if (data?.tracks) {
      setQuestion(createQuestion(data.tracks))
      return
    }
    const result = await refetch()
    if (result.data) {
      setQuestion(createQuestion(result.data.tracks))
    }
  }

  const handleSelect = (option: string) => {
    if (selected) return
    setSelected(option)
  }

  const isCorrect = (option: string) => {
    if (!question || !selected) return false
    return option === question.correct.title
  }

  const isWrong = (option: string) => {
    if (!selected) return false
    return selected === option && option !== question!.correct.title
  }

  return (
    <Box
      sx={{
        maxWidth: 480,
        mx: 'auto',
        p: 3,
        borderRadius: 2,
        bgcolor: 'secondary.main',
        color: 'white',
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, color: 'primary.main' }}>
        猜歌名
      </Typography>

      {!question && !isLoading && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleStart}
          sx={{ py: 1.5, px: 4 }}
        >
          開始遊戲
        </Button>
      )}

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress sx={{ color: 'accent.main' }} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error.message}
        </Alert>
      )}

      {question && !isLoading && (
        <Box>
          <Typography variant="body1" sx={{ mb: 3 }}>
            這首歌的歌手是 <strong>{question.correct.artist}</strong>，請問歌名是？
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {question.options.map((opt) => (
              <Button
                key={opt}
                variant="outlined"
                fullWidth
                onClick={() => handleSelect(opt)}
                disabled={!!selected}
                sx={{
                  color: 'white',
                  borderColor: 'primary.main',
                  '&:hover': { borderColor: 'accent.main', bgcolor: 'rgba(0,255,255,0.1)' },
                  ...(isCorrect(opt) && {
                    borderColor: 'accent.main',
                    bgcolor: 'rgba(0,255,255,0.2)',
                    color: 'accent.main',
                  }),
                  ...(isWrong(opt) && {
                    borderColor: 'error.main',
                    bgcolor: 'rgba(255,0,0,0.2)',
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
              onClick={handleStart}
            >
              再玩一題
            </Button>
          )}
        </Box>
      )}
    </Box>
  )
}
