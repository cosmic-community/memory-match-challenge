'use client'

import { useState } from 'react'
import { Score, Difficulty } from '@/types'
import { formatTime } from '@/lib/gameUtils'

interface LeaderboardProps {
  scores: Score[]
}

export default function Leaderboard({ scores }: LeaderboardProps) {
  const [filter, setFilter] = useState<Difficulty | 'all'>('all')

  const filteredScores = filter === 'all'
    ? scores
    : scores.filter(s => s.metadata?.difficulty === filter)

  const difficulties: Array<Difficulty | 'all'> = ['all', 'easy', 'medium', 'hard']

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl sticky top-4">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">🏆 Leaderboard</h2>
      <div className="flex gap-1 mb-4 flex-wrap">
        {difficulties.map(d => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            className={`px-2 py-1 text-xs rounded font-semibold capitalize transition-all ${
              filter === d
                ? 'bg-white text-purple-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredScores.length === 0 ? (
          <p className="text-white/70 text-center py-4">No scores yet. Be the first!</p>
        ) : (
          filteredScores.map((score, index) => (
            <div
              key={score.id}
              className="bg-white/10 rounded-lg p-3 text-white hover:bg-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </span>
                  <span className="font-semibold truncate">{score.metadata?.player_name || score.title}</span>
                </div>
                <span className="font-bold text-yellow-300">{score.metadata?.score || 0}</span>
              </div>
              <div className="flex justify-between text-xs opacity-80">
                <span className="capitalize">{score.metadata?.difficulty || 'unknown'}</span>
                <span>{score.metadata?.moves || 0} moves</span>
                <span>{formatTime(score.metadata?.time_seconds || 0)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}