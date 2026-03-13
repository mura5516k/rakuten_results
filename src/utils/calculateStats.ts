import type { Game } from '../types/game'

export function calculateStats(games: Game[]) {
  const finishedGames = games.filter((game) => game.status === '終了')
  const wins = finishedGames.filter((game) => game.result === 'Win').length
  const losses = finishedGames.filter((game) => game.result === 'Lose').length
  const draws = finishedGames.filter((game) => game.result === 'Draw').length
  const total = finishedGames.length
  const winRate = total === 0 ? 0 : wins / total

  return {
    total,
    wins,
    losses,
    draws,
    winRate,
  }
}
