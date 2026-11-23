import useMinuteClock from '@/hooks/use-minute-clock.ts'
import { checkedAgo } from '../../lib/last-checked.ts'

type LastCheckedProps = {
  lastCheckedAt: string
}

// Its own component, so the minute clock re-renders only this text, not the card.
function LastChecked({ lastCheckedAt }: LastCheckedProps) {
  const now = useMinuteClock()

  return (
    <time dateTime={lastCheckedAt} className="min-w-0 truncate">
      {checkedAgo(lastCheckedAt, now)}
    </time>
  )
}

export default LastChecked
