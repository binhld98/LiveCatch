import { Badge } from '@/components/ui/badge.tsx'
import type { LiveStatus } from '../../api/channel.ts'

type LiveStatusBadgeProps = {
  liveStatus: LiveStatus
}

function LiveStatusBadge({ liveStatus }: LiveStatusBadgeProps) {
  switch (liveStatus) {
    case 'live':
      return <Badge>Live</Badge>
    case 'notLive':
      return <Badge variant="outline">Not live</Badge>
    case 'unknown':
      return (
        <Badge variant="outline" className="border-dashed border-muted-foreground/50">
          Unknown
        </Badge>
      )
  }
}

export default LiveStatusBadge
