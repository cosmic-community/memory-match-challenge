import GameContainer from '@/components/GameContainer'
import { getTopScores } from '@/lib/cosmic'

export default async function Home() {
  const initialScores = await getTopScores()
  
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2 drop-shadow-lg">
            🧠 Memory Match
          </h1>
          <p className="text-white/90 text-lg">Test your memory and compete for the top score!</p>
        </header>
        <GameContainer initialScores={initialScores} />
      </div>
    </main>
  )
}