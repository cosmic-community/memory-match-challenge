import { createBucketClient } from '@cosmicjs/sdk'
import { Score, hasStatus } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

export async function getTopScores(difficulty?: string): Promise<Score[]> {
  try {
    const query: Record<string, any> = { type: 'scores' }
    if (difficulty) {
      query['metadata.difficulty'] = difficulty
    }
    const response = await cosmic.objects.find(query).props(['id', 'title', 'metadata', 'created_at']).depth(0)
    const scores = response.objects as Score[]
    return scores.sort((a, b) => {
      const scoreA = a.metadata?.score || 0
      const scoreB = b.metadata?.score || 0
      return scoreB - scoreA
    }).slice(0, 10)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch scores')
  }
}

export async function saveScore(data: {
  playerName: string
  score: number
  moves: number
  time: number
  difficulty: string
}): Promise<void> {
  try {
    await cosmic.objects.insertOne({
      type: 'scores',
      title: data.playerName,
      metadata: {
        player_name: data.playerName,
        score: data.score,
        moves: data.moves,
        time_seconds: data.time,
        difficulty: data.difficulty,
      },
    })
  } catch (error) {
    console.error('Error saving score:', error)
    throw new Error('Failed to save score')
  }
}