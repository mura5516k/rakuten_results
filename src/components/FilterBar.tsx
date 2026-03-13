import type { ChangeEvent } from 'react'
import type { GameFilters } from '../types/game'

type FilterBarProps = {
  filters: GameFilters
  months: string[]
  opponents: string[]
  onChange: (nextFilters: GameFilters) => void
}

type FilterFieldProps = {
  label: string
  name: keyof GameFilters
  value: string
  options: Array<{ value: string; label: string }>
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

function FilterField({ label, name, value, options, onChange }: FilterFieldProps) {
  return (
    <label className="filter-field">
      <span>{label}</span>
      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export function FilterBar({
  filters,
  months,
  opponents,
  onChange,
}: FilterBarProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target

    onChange({
      ...filters,
      [name]: value,
    })
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <h2>フィルタ</h2>
        <p>月や相手球団で試合を絞り込めます。</p>
      </div>

      <div className="filters-grid">
        <FilterField
          label="月"
          name="month"
          value={filters.month}
          onChange={handleChange}
          options={[
            { value: 'all', label: 'すべて' },
            ...months.map((month) => ({ value: month, label: `${month}月` })),
          ]}
        />
        <FilterField
          label="相手球団"
          name="opponent"
          value={filters.opponent}
          onChange={handleChange}
          options={[
            { value: 'all', label: 'すべて' },
            ...opponents.map((opponent) => ({ value: opponent, label: opponent })),
          ]}
        />
        <FilterField
          label="ホーム/ビジター"
          name="homeAway"
          value={filters.homeAway}
          onChange={handleChange}
          options={[
            { value: 'all', label: 'すべて' },
            { value: 'ホーム', label: 'ホーム' },
            { value: 'ビジター', label: 'ビジター' },
          ]}
        />
        <FilterField
          label="試合状態"
          name="status"
          value={filters.status}
          onChange={handleChange}
          options={[
            { value: 'all', label: 'すべて' },
            { value: '試合前', label: '試合前' },
            { value: '終了', label: '終了' },
          ]}
        />
      </div>
    </section>
  )
}
