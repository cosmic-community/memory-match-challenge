'use client'

import { useState } from 'react'
import { Difficulty, Score } from '@/types'
import { formatTime } from '@/lib/gameUtils'

interface WinModalProps {
  score: number
  moves: number
  time: number
  difficulty: Difficulty
  onClose: () => void
  onPlayAgain: () => void
  onScoreSaved: (scores: Score[]) => void
}

export default function WinModal({
  score,
  moves,
  time,
  difficulty,
  onClose,
  onPlayAgain,
  onScoreSaved,
}: WinModalProps) {
  const [playerName, setPlayerName] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!playerName.trim()) {
      setError('Please enter your name')
      return
    }

    setIsSaving(true)
    setError('')

    try {
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: playerName.trim(),
          score,
          moves,
          time,
          difficulty,
        }),
      })

      if (!response.ok) throw new Error('Failed to save score')

      const data = await response.json()
      onScoreSaved(data.scores || [])
      setIsSaved(true)
    } catch (err) {
      setError('Failed to save score. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4 animate-bounce-in">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-6xl mb-2">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">You Won!</h2>
          <p className="text-gray-600 capitalize">{difficulty} difficulty completed</p>
        </div>

        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 mb-6">
          <div className="text-center mb-3">
            <div className="text-sm text-gray-600 uppercase tracking-wider">Final Score</div>
            <div className="text-5xl font-extrabold text-purple-600">{score}</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-white/60 rounded-lg p-2">
              <div className="text-xs text-gray-600">Time</div>
              <div className="font-bold text-gray-800">{formatTime(time)}</div>
            </div>
            <div className="bg-white/60 rounded-lg p-2">
              <div className="text-xs text-gray-600">Moves</div>
              <div className="font-bold text-gray-800">{moves}</div>
            </div>
          </div>
        </div>

        {!isSaved ? (
          <div className="space-y-3">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              maxLength={20}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-800"
              disabled={isSaving}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : '💾 Save Score'}
            </button>
          </div>
        ) : (
          <div className="bg-green-100 border-2 border-green-500 rounded-lg p-3 text-center text-green-700 font-semibold mb-3">
            ✓ Score saved successfully!
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
          >
            Close
          </button>
          <button
            onClick={onPlayAgain}
            className="px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all"
          >
            🎮 Play Again
          </button>
        </div>
      </div>
    </div>
  )
}