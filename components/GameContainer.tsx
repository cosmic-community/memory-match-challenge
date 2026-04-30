'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, Difficulty, Score, GameStats } from '@/types'
import { generateCards, DIFFICULTY_CONFIGS, calculateScore } from '@/lib/gameUtils'
import GameBoard from './GameBoard'
import GameControls from './GameControls'
import GameStatsDisplay from './GameStatsDisplay'
import WinModal from './WinModal'
import Leaderboard from './Leaderboard'

export default function GameContainer({ initialScores }: { initialScores: Score[] }) {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [stats, setStats] = useState<GameStats>({ moves: 0, time: 0, matches: 0 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [scores, setScores] = useState<Score[]>(initialScores)
  const [isProcessing, setIsProcessing] = useState(false)

  const startNewGame = useCallback((selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty)
    setCards(generateCards(selectedDifficulty))
    setFlippedCards([])
    setStats({ moves: 0, time: 0, matches: 0 })
    setIsPlaying(true)
    setHasWon(false)
  }, [])

  useEffect(() => {
    setCards(generateCards(difficulty))
  }, [])

  useEffect(() => {
    if (!isPlaying || hasWon) return
    const timer = setInterval(() => {
      setStats(prev => ({ ...prev, time: prev.time + 1 }))
    }, 1000)
    return () => clearInterval(timer)
  }, [isPlaying, hasWon])

  const handleCardClick = useCallback((cardId: number) => {
    if (isProcessing) return
    if (flippedCards.length >= 2) return
    if (flippedCards.includes(cardId)) return
    
    const card = cards.find(c => c.id === cardId)
    if (!card || card.isMatched || card.isFlipped) return

    if (!isPlaying) setIsPlaying(true)

    const newCards = cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    )
    setCards(newCards)
    
    const newFlipped = [...flippedCards, cardId]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setIsProcessing(true)
      setStats(prev => ({ ...prev, moves: prev.moves + 1 }))
      
      const firstId = newFlipped[0]
      const secondId = newFlipped[1]
      
      if (firstId === undefined || secondId === undefined) {
        setIsProcessing(false)
        return
      }
      
      const firstCard = newCards.find(c => c.id === firstId)
      const secondCard = newCards.find(c => c.id === secondId)
      
      if (!firstCard || !secondCard) {
        setIsProcessing(false)
        return
      }

      if (firstCard.emoji === secondCard.emoji) {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === firstId || c.id === secondId
              ? { ...c, isMatched: true }
              : c
          ))
          setFlippedCards([])
          setIsProcessing(false)
          setStats(prev => {
            const newMatches = prev.matches + 1
            if (newMatches === DIFFICULTY_CONFIGS[difficulty].pairs) {
              setHasWon(true)
              setIsPlaying(false)
            }
            return { ...prev, matches: newMatches }
          })
        }, 500)
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === firstId || c.id === secondId
              ? { ...c, isFlipped: false }
              : c
          ))
          setFlippedCards([])
          setIsProcessing(false)
        }, 1000)
      }
    }
  }, [cards, flippedCards, isProcessing, isPlaying, difficulty])

  const handleScoreSaved = (newScores: Score[]) => {
    setScores(newScores)
  }

  const finalScore = hasWon ? calculateScore(stats.moves, stats.time, difficulty) : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <GameControls
          difficulty={difficulty}
          onStartGame={startNewGame}
          isPlaying={isPlaying}
        />
        <GameStatsDisplay stats={stats} difficulty={difficulty} />
        <GameBoard
          cards={cards}
          difficulty={difficulty}
          onCardClick={handleCardClick}
        />
      </div>
      <div className="lg:col-span-1">
        <Leaderboard scores={scores} />
      </div>
      {hasWon && (
        <WinModal
          score={finalScore}
          moves={stats.moves}
          time={stats.time}
          difficulty={difficulty}
          onClose={() => setHasWon(false)}
          onPlayAgain={() => startNewGame(difficulty)}
          onScoreSaved={handleScoreSaved}
        />
      )}
    </div>
  )
}