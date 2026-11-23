const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

// "Checked just now" under one minute, then minutes, hours and days. A time in the future counts as now.
export function checkedAgo(lastCheckedAt: string, now: number) {
  const elapsed = now - Date.parse(lastCheckedAt)
  if (elapsed < MINUTE) return 'Checked just now'
  if (elapsed < HOUR) return `Checked ${Math.floor(elapsed / MINUTE)} min ago`
  if (elapsed < DAY) return `Checked ${Math.floor(elapsed / HOUR)} hr ago`
  const days = Math.floor(elapsed / DAY)
  return `Checked ${days} ${days === 1 ? 'day' : 'days'} ago`
}
