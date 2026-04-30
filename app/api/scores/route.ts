import { NextResponse } from 'next/server'
import { saveScore, getTopScores } from '@/lib/cosmic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { playerName, score, moves, time, difficulty } = body

    if (!playerName || typeof score !== 'number') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    await saveScore({ playerName, score, moves, time, difficulty })
    const scores = await getTopScores()

    return NextResponse.json({ success: true, scores })
  } catch (error) {
    console.error('Error in POST /api/scores:', error)
    return NextResponse.json({ error: 'Failed to save score' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const scores = await getTopScores()
    return NextResponse.json({ scores })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch scores' }, { status: 500 })
  }
}