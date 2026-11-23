import type { Channel } from '../api/channel.ts'
import ChannelCard from './channel-card/channel-card.tsx'

type ChannelGridProps = {
  channels: Channel[]
}

// Columns at least 325px wide (or the full width, if that's less), and never more than 4: a column is
// also at least a quarter of the width, less the gaps. 325px, not 320px, so 1280px with the sidebar open
// gets 2 columns even where the scrollbar takes no width. Every row is as tall as the tallest card.
function ChannelGrid({ channels }: ChannelGridProps) {
  return (
    <div className="grid auto-rows-fr grid-cols-[repeat(auto-fill,minmax(max(min(325px,100%),calc((100%_-_3rem)/4)),1fr))] gap-4">
      {channels.map((channel) => (
        <ChannelCard key={channel.id} channel={channel} />
      ))}
    </div>
  )
}

export default ChannelGrid
