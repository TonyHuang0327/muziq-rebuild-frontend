import { useState, useCallback } from 'react'
import type { Track } from '../../../types/playlist'

/** Fisher-Yates 洗牌 */
const shuffleArray = <T,>(arr: T[]): T[] => {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** 題目型別 */
export interface Question {
  correct: Track
  options: string[]
}

/** 從播放清單產生一題：1 個正確答案 + 3 個錯誤選項 */
const createQuestion = (tracks: Track[]): Question => {
  if (tracks.length < 4) throw new Error('播放清單至少需要 4 首歌')
  const correct = tracks[Math.floor(Math.random() * tracks.length)]
  const otherTitles = tracks
    .filter((t) => t.title !== correct.title)
    .map((t) => t.title)
  const wrongTitles = shuffleArray(otherTitles).slice(0, 3)
  const options = shuffleArray([correct.title, ...wrongTitles])
  return { correct, options }
}

export const useGameSession = (tracks: Track[]) => {
  const [score, setScore] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [question, setQuestion] = useState<Question | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const startGame = useCallback(() => {
    if (tracks.length === 0 || tracks.length < 4) return
    setQuestionIndex(0)
    setScore(0)
    setIsGameOver(false)
    setQuestion(createQuestion(tracks))
    setSelected(null)
  }, [tracks])

  const handleSelect = useCallback(
    (option: string) => {
      if (selected !== null) return
      setSelected(option)
      if (question && option === question.correct.title) {
        setScore((prev) => prev + 10)
      }
    },
    [selected, question]
  )

  const handleNext = useCallback(() => {
    setSelected(null)
    if (questionIndex < 9) {
      setQuestionIndex((prev) => prev + 1)
      setQuestion(createQuestion(tracks))
    } else if (questionIndex === 9) {
      setIsGameOver(true)
      setQuestion(null)
    }
  }, [questionIndex, tracks])

  const resetGame = useCallback(() => {
    setScore(0)
    setQuestionIndex(0)
    setIsGameOver(false)
    setQuestion(null)
    setSelected(null)
  }, [])

  return {
    score,
    questionIndex,
    isGameOver,
    question,
    selected,
    startGame,
    handleSelect,
    handleNext,
    resetGame,
  }
}
