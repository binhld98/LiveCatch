import { Badge } from '@/components/ui/badge.tsx'
import type { ChannelStatus } from '../../api/channel.ts'

type ChannelStatusBadgeProps = {
  status: ChannelStatus
}

function ChannelStatusBadge({ status }: ChannelStatusBadgeProps) {
  switch (status) {
    case 'stopped':
      return <Badge variant="outline">Stopped</Badge>
    case 'listening':
      return <Badge variant="secondary">Listening</Badge>
    case 'recording':
      return (
        <Badge variant="destructive">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-destructive" />
          Recording
        </Badge>
      )
  }
}

export default ChannelStatusBadge
