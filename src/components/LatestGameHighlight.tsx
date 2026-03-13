import type { Game } from '../types/game'
import { formatDisplayDate } from '../utils/formatDate'

type LatestGameHighlightProps = {
  game: Game
  onSelect: (game: Game) => void
}

function formatScore(game: Game) {
  if (game.rakutenScore === null || game.opponentScore === null) {
    return '-'
  }

  return `${game.rakutenScore} - ${game.opponentScore}`
}

export function LatestGameHighlight({
  game,
  onSelect,
}: LatestGameHighlightProps) {
  return (
    <section className="panel latest-panel">
      <div className="section-heading">
        <div>
          <h2>直近の試合結果</h2>
          <p>終了済みの試合のうち、いちばん新しい結果を表示しています。</p>
        </div>
      </div>

      <button
        type="button"
        className="latest-card"
        onClick={() => onSelect(game)}
      >
        <div className="game-card-top">
          <div>
            <p className="game-date">{formatDisplayDate(game.date, game.weekday)}</p>
            <h3>{game.opponent}</h3>
          </div>
          <div className="latest-side">
            <span className={`status-pill status-${game.status}`}>{game.status}</span>
            <span className="result-label">{game.result ?? '未確定'}</span>
          </div>
        </div>

        <div className="latest-score-block">
          <p className="latest-score-label">スコア</p>
          <strong className="latest-score">{formatScore(game)}</strong>
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
            <dt>開始時刻</dt>
            <dd>{game.startTime}</dd>
          </div>
        </dl>
      </button>
    </section>
  )
}
