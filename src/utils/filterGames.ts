import type { Game, GameFilters } from '../types/game'

export function filterGames(games: Game[], filters: GameFilters) {
  return games.filter((game) => {
    const month = String(new Date(`${game.date}T00:00:00`).getMonth() + 1).padStart(
      2,
      '0',
    )

    if (filters.month !== 'all' && filters.month !== month) {
      return false
    }

    if (filters.opponent !== 'all' && filters.opponent !== game.opponent) {
      return false
    }

    if (filters.homeAway !== 'all' && filters.homeAway !== game.homeAway) {
      return false
    }

    if (filters.status !== 'all' && filters.status !== game.status) {
      return false
    }

    return true
  })
}
