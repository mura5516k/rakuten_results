import type { Game } from '../types/game'
import { GameCard } from './GameCard'

type GameListProps = {
  games: Game[]
  title: string
  description: string
  emptyMessage: string
  onSelect: (game: Game) => void
}

export function GameList({
  games,
  title,
  description,
  emptyMessage,
  onSelect,
}: GameListProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {games.length === 0 ? (
        <div className="empty-state">{emptyMessage}</div>
      ) : (
        <div className="game-list">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onSelect={onSelect} />
          ))}
        </div>
      )}
    </section>
  )
}
