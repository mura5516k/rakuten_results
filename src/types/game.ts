export type GameStatus = '試合前' | '終了'

export type GameResult = 'Win' | 'Lose' | 'Draw' | null

export type HomeAway = 'ホーム' | 'ビジター'

export type Game = {
  id: string
  date: string
  weekday: string
  category: string
  opponent: string
  venue: string
  homeAway: HomeAway
  startTime: string
  status: GameStatus
  rakutenScore: number | null
  opponentScore: number | null
  result: GameResult
  note: string
  sourceUrl: string
}

export type GameResponse = {
  season: string
  updatedAt: string
  games: Game[]
}

export type GameFilters = {
  month: string
  opponent: string
  homeAway: string
  status: string
}
