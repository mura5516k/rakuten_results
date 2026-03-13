type SummaryCardsProps = {
  total: number
  wins: number
  losses: number
  draws: number
  winRate: number
}

const items = [
  { key: 'total', label: '総試合数' },
  { key: 'wins', label: '勝数' },
  { key: 'losses', label: '敗数' },
  { key: 'draws', label: '引き分け数' },
  { key: 'winRate', label: '勝率' },
] as const

export function SummaryCards(props: SummaryCardsProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>サマリー</h2>
        <p>終了済み試合をもとに集計しています。</p>
      </div>

      <div className="summary-grid">
        {items.map((item) => (
          <article key={item.key} className="summary-card">
            <p>{item.label}</p>
            <strong>
              {item.key === 'winRate'
                ? props.winRate.toLocaleString('ja-JP', {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })
                : props[item.key]}
            </strong>
          </article>
        ))}
      </div>
    </section>
  )
}
