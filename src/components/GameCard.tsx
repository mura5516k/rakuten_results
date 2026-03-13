import type { Game } from '../types/game'
import { formatDisplayDate } from '../utils/formatDate'

type GameCardProps = {
  game: Game
  onSelect: (game: Game) => void
}

function formatScore(game: Game) {
  if (game.rakutenScore === null || game.opponentScore === null) {
    return '-'
  }

  return `${game.rakutenScore} - ${game.opponentScore}`
}

export function GameCard({ game, onSelect }: GameCardProps) {
  return (
    <button type="button" className="game-card" onClick={() => onSelect(game)}>
      <div className="game-card-top">
        <div>
          <p className="game-date">{formatDisplayDate(game.date, game.weekday)}</p>
          <h3>{game.opponent}</h3>
        </div>
        <span className={`status-pill status-${game.status}`}>{game.status}</span>
      </div>

      <dl className="game-meta">
        <div>
          <dt>種別</dt>
          <dd>{game.category}</dd>
        </div>
        <div>
          <dt>球場</dt>
          <dd>{game.venue}</dd>
        </div>
        <div>
          <dt>ホーム/ビジター</dt>
          <dd>{game.homeAway}</dd>
        </div>
        <div>
          <dt>スコア</dt>
          <dd>{formatScore(game)}</dd>
        </div>
      </dl>

      <div className="game-card-bottom">
        <span className="result-label">{game.result ?? '未確定'}</span>
        <span className="detail-link">詳細を見る</span>
      </div>
    </button>
  )
}
