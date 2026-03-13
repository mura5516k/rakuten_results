import type { GameResponse } from '../types/game'

const DATA_PATH = `${import.meta.env.BASE_URL}data/games-2026-preseason.json`

export async function getGames(): Promise<GameResponse> {
  const response = await fetch(DATA_PATH)

  if (!response.ok) {
    throw new Error('試合データの読み込みに失敗しました。')
  }

  return response.json() as Promise<GameResponse>
}
