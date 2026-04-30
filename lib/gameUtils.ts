import { Card, Difficulty, DifficultyConfig } from '@/types'

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: { name: 'Easy', gridSize: 16, pairs: 8, cols: 'grid-cols-4' },
  medium: { name: 'Medium', gridSize: 24, pairs: 12, cols: 'grid-cols-6' },
  hard: { name: 'Hard', gridSize: 36, pairs: 18, cols: 'grid-cols-6 md:grid-cols-9' },
}

const EMOJIS = [
  '🎮', '🎯', '🎨', '🎭', '🎪', '🎬', '🎵', '🎸',
  '🚀', '⚡', '🌟', '🔥', '💎', '🎁', '🏆', '⚽',
  '🍕', '🍔', '🍦', '🍩', '🍪', '🎂', '🍓', '🍇',
  '🐶', '🐱', '🐰', '🦊', '🐼', '🦁', '🐯', '🐸',
  '🌈', '☀️', '🌙', '⭐'
]

export function generateCards(difficulty: Difficulty): Card[] {
  const config = DIFFICULTY_CONFIGS[difficulty]
  const selectedEmojis = EMOJIS.slice(0, config.pairs)
  const cardPairs = [...selectedEmojis, ...selectedEmojis]
  
  const cards: Card[] = cardPairs.map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false,
  }))
  
  return shuffleArray(cards)
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]
    const swap = shuffled[j]
    if (temp !== undefined && swap !== undefined) {
      shuffled[i] = swap
      shuffled[j] = temp
    }
  }
  return shuffled
}

export function calculateScore(moves: number, time: number, difficulty: Difficulty): number {
  const config = DIFFICULTY_CONFIGS[difficulty]
  const baseScore = config.pairs * 100
  const movesPenalty = Math.max(0, (moves - config.pairs) * 5)
  const timePenalty = Math.floor(time / 2)
  const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2
  const finalScore = Math.max(100, Math.floor((baseScore - movesPenalty - timePenalty) * difficultyMultiplier))
  return finalScore
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}