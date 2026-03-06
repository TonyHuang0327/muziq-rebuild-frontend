import { useState, useCallback } from "react";
import type { Track } from "../../../types/playlist";

/** Fisher-Yates 洗牌 */
const shuffleArray = <T>(arr: T[]): T[] => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/** 題目型別 */
export interface Question {
  correct: Track;
  options: string[];
}

/** 從播放清單產生一題：1 個正確答案 + 3 個錯誤選項 */
const createQuestion = (tracks: Track[]): Question => {
  if (tracks.length < 4) throw new Error("播放清單至少需要 4 首歌");
  const correct = tracks[Math.floor(Math.random() * tracks.length)];
  const otherTitles = tracks
    .filter((t) => t.title !== correct.title)
    .map((t) => t.title);
  const wrongTitles = shuffleArray(otherTitles).slice(0, 3);
  const options = shuffleArray([correct.title, ...wrongTitles]);
  return { correct, options };
};

const MAX_QUESTIONS = 10;
export const useGameSession = () => {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);

  const startGame = useCallback((initTracks: Track[]) => {
    setTracks(initTracks);
    if (initTracks.length < 4) return;
    setQuestionIndex(0);
    setScore(0);
    setIsGameOver(false);
    setQuestion(createQuestion(initTracks));
    setSelected(null);
  }, []);

  const handleSelect = useCallback(
    (option: string) => {
      if (selected !== null) return;
      setSelected(option);
      if (question && option === question.correct.title) {
        setScore((prev) => prev + 10);
      }
    },
    [selected, question],
  );

  const handleNext = useCallback(() => {
    setSelected(null);
    if (questionIndex < MAX_QUESTIONS - 1) {
      setQuestionIndex((prev) => prev + 1);
      setQuestion(createQuestion(tracks));
    } else {
      setIsGameOver(true);
      setQuestion(null);
    }
  }, [questionIndex, tracks]);

  const resetGame = useCallback(() => {
    setScore(0);
    setQuestionIndex(0);
    setIsGameOver(false);
    setQuestion(null);
    setSelected(null);
  }, []);

  return {
    score,
    questionIndex,
    isGameOver,
    question,
    selected,
    totalQuestions: MAX_QUESTIONS,
    startGame,
    handleSelect,
    handleNext,
    resetGame,
  };
};
