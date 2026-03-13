import { useEffect, useMemo, useState } from 'react'
import './index.css'
import { FilterBar } from './components/FilterBar'
import { GameDetailModal } from './components/GameDetailModal'
import { GameList } from './components/GameList'
import { Header } from './components/Header'
import { SummaryCards } from './components/SummaryCards'
import { getGames } from './services/gameService'
import type { Game, GameFilters } from './types/game'
import { calculateStats } from './utils/calculateStats'
import { filterGames } from './utils/filterGames'
import { formatUpdatedAt } from './utils/formatDate'

const initialFilters: GameFilters = {
  month: 'all',
  opponent: 'all',
  homeAway: 'all',
  status: 'all',
}

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [updatedAt, setUpdatedAt] = useState('')
  const [filters, setFilters] = useState<GameFilters>(initialFilters)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [qrValue, setQrValue] = useState('')

  useEffect(() => {
    const manualUrl = import.meta.env.VITE_PUBLIC_APP_URL?.trim()
    setQrValue(manualUrl || window.location.href)
  }, [])

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const response = await getGames()
        setGames(response.games)
        setUpdatedAt(formatUpdatedAt(response.updatedAt))
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : '不明なエラーです。')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const months = useMemo(
    () =>
      Array.from(
        new Set(
          games.map((game) =>
            String(new Date(`${game.date}T00:00:00`).getMonth() + 1).padStart(2, '0'),
          ),
        ),
      ),
    [games],
  )

  const opponents = useMemo(
    () => Array.from(new Set(games.map((game) => game.opponent))),
    [games],
  )

  const filteredGames = useMemo(() => filterGames(games, filters), [games, filters])
  const stats = useMemo(() => calculateStats(filteredGames), [filteredGames])
  const qrEnabled =
    /^https?:\/\//.test(qrValue) &&
    !qrValue.includes('localhost') &&
    !qrValue.includes('127.0.0.1')
  const qrNote = qrEnabled
    ? `読込先: ${qrValue}`
    : '表示したいURLがある場合は .env に VITE_PUBLIC_APP_URL=https://example.com を設定するか、npm run dev:host で起動してください。'

  return (
    <main className="app-shell">
      <div className="app-container">
        <Header
          updatedAt={updatedAt}
          qrValue={qrValue}
          qrEnabled={qrEnabled}
          qrNote={qrNote}
        />

        {loading ? (
          <section className="panel feedback-panel">データを読み込み中です。</section>
        ) : error ? (
          <section className="panel feedback-panel error-text">{error}</section>
        ) : (
          <>
            <SummaryCards {...stats} />
            <FilterBar
              filters={filters}
              months={months}
              opponents={opponents}
              onChange={setFilters}
            />
            <GameList games={filteredGames} onSelect={setSelectedGame} />
          </>
        )}
      </div>

      <GameDetailModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </main>
  )
}

export default App
