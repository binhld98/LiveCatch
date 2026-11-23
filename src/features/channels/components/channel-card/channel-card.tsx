import type { Channel } from '../../api/channel.ts'
import ChannelCardFooter from './channel-card-footer.tsx'
import ChannelCardHeader from './channel-card-header.tsx'

type ChannelCardProps = {
  channel: Channel
}

function ChannelCard({ channel }: ChannelCardProps) {
  return (
    <article className="flex min-w-0 flex-col gap-3 rounded-xl border bg-card p-4 text-card-foreground">
      <ChannelCardHeader channel={channel} />
      <ChannelCardFooter channel={channel} />
    </article>
  )
}

export default ChannelCard
