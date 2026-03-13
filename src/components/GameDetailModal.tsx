import type { Game } from '../types/game'
import { formatDisplayDate } from '../utils/formatDate'

type GameDetailModalProps = {
  game: Game | null
  onClose: () => void
}

function formatScore(game: Game) {
  if (game.rakutenScore === null || game.opponentScore === null) {
    return '-'
  }

  return `${game.rakutenScore} - ${game.opponentScore}`
}

export function GameDetailModal({ game, onClose }: GameDetailModalProps) {
  if (!game) {
    return null
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="game-date">{formatDisplayDate(game.date, game.weekday)}</p>
            <h2 id="game-detail-title">{game.opponent}</h2>
          </div>
          <button type="button" className="close-button" onClick={onClose}>
            閉じる
          </button>
        </div>

        <dl className="detail-grid">
          <div>
            <dt>開始時刻</dt>
            <dd>{game.startTime}</dd>
          </div>
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
          <div>
            <dt>勝敗</dt>
            <dd>{game.result ?? '未確定'}</dd>
          </div>
          <div>
            <dt>状態</dt>
            <dd>{game.status}</dd>
          </div>
          <div>
            <dt>メモ</dt>
            <dd>{game.note || 'なし'}</dd>
          </div>
          <div className="detail-link-row">
            <dt>参照元URL</dt>
            <dd>
              {game.sourceUrl ? (
                <a href={game.sourceUrl} target="_blank" rel="noreferrer">
                  参照ページを開く
                </a>
              ) : (
                'なし'
              )}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
