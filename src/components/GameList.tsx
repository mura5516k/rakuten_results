import type { Game } from '../types/game'
import { GameCard } from './GameCard'

type GameListProps = {
  games: Game[]
  onSelect: (game: Game) => void
}

export function GameList({ games, onSelect }: GameListProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>試合一覧</h2>
        <p>{games.length}件を表示中です。</p>
      </div>

      {games.length === 0 ? (
        <div className="empty-state">条件に一致する試合はありません。</div>
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
