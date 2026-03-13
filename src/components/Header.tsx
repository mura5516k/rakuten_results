import { QRCodeSVG } from 'qrcode.react'

type HeaderProps = {
  updatedAt: string
  qrValue: string
  qrEnabled: boolean
  qrNote: string
}

export function Header({ updatedAt, qrValue, qrEnabled, qrNote }: HeaderProps) {
  return (
    <header className="hero-section">
      <div>
        <p className="eyebrow">Rakuten Eagles Results Tracker</p>
        <h1>楽天イーグルス 2026 試合結果まとめ</h1>
        <p className="hero-subtitle">まずはオープン戦対応</p>
        <p className="updated-at">最終更新: {updatedAt}</p>
      </div>

      <div className="qr-card">
        <p className="qr-title">スマホ表示用QRコード</p>
        {qrEnabled ? (
          <>
            <QRCodeSVG value={qrValue} size={112} includeMargin />
            <p className="qr-caption">現在開いているURLを読み取れます</p>
            <p className="qr-helper">{qrNote}</p>
          </>
        ) : (
          <>
            <p className="qr-caption">QRコードは、スマホから開けるURLがあると表示されます。</p>
            <p className="qr-helper">{qrNote}</p>
          </>
        )}
      </div>
    </header>
  )
}
