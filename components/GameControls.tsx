'use client'

import { Difficulty } from '@/types'
import { DIFFICULTY_CONFIGS } from '@/lib/gameUtils'

interface GameControlsProps {
  difficulty: Difficulty
  onStartGame: (difficulty: Difficulty) => void
  isPlaying: boolean
}

export default function GameControls({ difficulty, onStartGame, isPlaying }: GameControlsProps) {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard']

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {difficulties.map(diff => (
            <button
              key={diff}
              onClick={() => onStartGame(diff)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                difficulty === diff
                  ? 'bg-white text-purple-600 shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {DIFFICULTY_CONFIGS[diff].name}
            </button>
          ))}
        </div>
        <button
          onClick={() => onStartGame(difficulty)}
          className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:from-yellow-500 hover:to-orange-600 transition-all"
        >
          {isPlaying ? '🔄 Restart' : '▶️ Start Game'}
        </button>
      </div>
    </div>
  )
}