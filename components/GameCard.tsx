'use client'

import { Card } from '@/types'

interface GameCardProps {
  card: Card
  onClick: () => void
}

export default function GameCard({ card, onClick }: GameCardProps) {
  const isShowing = card.isFlipped || card.isMatched

  return (
    <div
      className="card-container aspect-square cursor-pointer"
      onClick={onClick}
    >
      <div className={`card-inner ${isShowing ? 'card-flipped' : ''}`}>
        <div className="card-face card-front rounded-lg md:rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg flex items-center justify-center hover:from-indigo-400 hover:to-purple-500 transition-all">
          <div className="text-white text-2xl md:text-4xl font-bold opacity-30">?</div>
        </div>
        <div className={`card-face card-back rounded-lg md:rounded-xl shadow-lg flex items-center justify-center text-3xl md:text-5xl ${
          card.isMatched 
            ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
            : 'bg-white'
        }`}>
          {card.emoji}
        </div>
      </div>
    </div>
  )
}