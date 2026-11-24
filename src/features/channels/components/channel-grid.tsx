import type { Channel } from '../api/channel.ts'
import ChannelCard from './channel-card/channel-card.tsx'
import ChannelGridLayout from './channel-grid-layout.tsx'

type ChannelGridProps = {
  channels: Channel[]
}

function ChannelGrid({ channels }: ChannelGridProps) {
  return (
    <ChannelGridLayout>
      {channels.map((channel) => (
        <ChannelCard key={channel.id} channel={channel} />
      ))}
    </ChannelGridLayout>
  )
}

export default ChannelGrid
