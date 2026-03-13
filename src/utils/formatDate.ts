export function formatDisplayDate(date: string, weekday: string) {
  const parsed = new Date(`${date}T00:00:00`)

  return `${parsed.getMonth() + 1}/${parsed.getDate()} (${weekday})`
}

export function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}
