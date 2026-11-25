import type { Channel } from '../api/channel.ts'
import ChannelCard from './channel-card/channel-card.tsx'

type ChannelGridProps = {
  channels: Channel[]
}

// Columns at least 290px wide, up to 4, with equal row heights. Shared by the grid and its placeholders.
function ChannelGrid({ channels }: ChannelGridProps) {
  return (
    <div className="grid auto-rows-fr grid-cols-[repeat(auto-fill,minmax(max(min(290px,100%),calc((100%-3rem)/4)),1fr))] gap-4">
      {channels.map((channel) => (
        <ChannelCard key={channel.id} channel={channel} />
      ))}
    </div>
  )
}

export default ChannelGrid
