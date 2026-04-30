export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Score extends CosmicObject {
  type: 'scores';
  metadata: {
    player_name?: string;
    score?: number;
    moves?: number;
    time_seconds?: number;
    difficulty?: string;
  };
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  name: string;
  gridSize: number;
  pairs: number;
  cols: string;
}

export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameStats {
  moves: number;
  time: number;
  matches: number;
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}