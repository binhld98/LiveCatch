import ChannelCardPlaceholder from './channel-card/channel-card-placeholder.tsx'

// Columns at least 290px wide, up to 4, with equal row heights. Shared by the grid and its placeholders.
function ChannelGridPlaceholder() {
  return (
    <div className="grid auto-rows-fr grid-cols-[repeat(auto-fill,minmax(max(min(290px,100%),calc((100%-3rem)/4)),1fr))] gap-4">
      {Array.from({ length: 12 }, (_, index) => (
        <ChannelCardPlaceholder key={index} />
      ))}
    </div>
  )
}

export default ChannelGridPlaceholder
