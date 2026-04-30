'use client'

import { GameStats, Difficulty } from '@/types'
import { DIFFICULTY_CONFIGS, formatTime } from '@/lib/gameUtils'

interface GameStatsDisplayProps {
  stats: GameStats
  difficulty: Difficulty
}

export default function GameStatsDisplay({ stats, difficulty }: GameStatsDisplayProps) {
  const config = DIFFICULTY_CONFIGS[difficulty]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl">
      <div className="grid grid-cols-3 gap-4 text-white text-center">
        <div>
          <div className="text-xs uppercase tracking-wider opacity-80">Time</div>
          <div className="text-2xl md:text-3xl font-bold">{formatTime(stats.time)}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider opacity-80">Moves</div>
          <div className="text-2xl md:text-3xl font-bold">{stats.moves}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider opacity-80">Matches</div>
          <div className="text-2xl md:text-3xl font-bold">{stats.matches}/{config.pairs}</div>
        </div>
      </div>
    </div>
  )
}