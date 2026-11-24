import type { LucideIcon } from 'lucide-react'
import { ClockIcon, InfoIcon, RadioIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Channel } from '../../api/channel.ts'
import LastChecked from './last-checked.tsx'
import LiveStatusBadge from './live-status-badge.tsx'

const dash = <span className="text-muted-foreground">—</span>

type DetailLineProps = {
  // Read by screen readers in place of the icon.
  label: string
  icon: LucideIcon
  children: ReactNode
}

function DetailLine({ label, icon: Icon, children }: DetailLineProps) {
  return (
    <div className="flex h-5.5 items-center gap-2">
      <dt className="flex shrink-0 items-center">
        <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
        <span className="sr-only">{label}</span>
      </dt>
      <dd className="flex min-w-0 flex-1 items-center gap-2">{children}</dd>
    </div>
  )
}

type ChannelCardDetailsProps = {
  channel: Channel
}

function ChannelCardDetails({ channel }: ChannelCardDetailsProps) {
  const { lastCheckedAt, liveStatus, broadcastTitle } = channel

  return (
    <dl className="flex flex-col gap-2 rounded-lg border px-3 py-2.5 text-sm">
      <DetailLine label="Last checked" icon={ClockIcon}>
        <span className="flex min-w-0 flex-1 text-muted-foreground">
          {lastCheckedAt === null ? dash : <LastChecked lastCheckedAt={lastCheckedAt} />}
        </span>
        {liveStatus !== null && <LiveStatusBadge liveStatus={liveStatus} />}
      </DetailLine>
      <DetailLine label="Broadcast title" icon={RadioIcon}>
        {broadcastTitle === null ? dash : <span className="min-w-0 truncate">{broadcastTitle}</span>}
      </DetailLine>
      {/* Always a dash until S2-5 adds the reasons the app stops a channel. */}
      <DetailLine label="System message" icon={InfoIcon}>
        {dash}
      </DetailLine>
    </dl>
  )
}

export default ChannelCardDetails
