'use client'

import { Card, Difficulty } from '@/types'
import { DIFFICULTY_CONFIGS } from '@/lib/gameUtils'
import GameCard from './GameCard'

interface GameBoardProps {
  cards: Card[]
  difficulty: Difficulty
  onCardClick: (id: number) => void
}

export default function GameBoard({ cards, difficulty, onCardClick }: GameBoardProps) {
  const config = DIFFICULTY_CONFIGS[difficulty]
  
  if (!cards || cards.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center text-white">
        Loading cards...
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-2xl">
      <div className={`grid ${config.cols} gap-2 md:gap-3`}>
        {cards.map(card => (
          <GameCard
            key={card.id}
            card={card}
            onClick={() => onCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  )
}