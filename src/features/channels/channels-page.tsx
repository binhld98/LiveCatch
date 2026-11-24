import PageHeader from '@/components/page-header.tsx'
import useChannels from './api/use-channels.ts'
import ChannelGrid from './components/channel-grid.tsx'
import ChannelGridPlaceholder from './components/channel-grid-placeholder.tsx'
import LoadFailed from './components/load-failed.tsx'
import NoChannels from './components/no-channels.tsx'

// The state depends only on whether the app has a copy of the cards, not on the query's status: with a
// copy the grid shows, and a refetch shows no indicator and, if it fails, leaves the grid as it was.
function ChannelsContent() {
  const { data, isError, isFetching, refetch } = useChannels()

  if (data) {
    return data.items.length === 0 ? <NoChannels /> : <ChannelGrid channels={data.items} />
  }
  // While "Try again" runs, the placeholders show again.
  if (isError && !isFetching) {
    return <LoadFailed onRetry={() => void refetch()} />
  }
  return <ChannelGridPlaceholder />
}

function ChannelsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Channels" description="Add channels and choose which ones to listen to." />
      <ChannelsContent />
    </div>
  )
}

export default ChannelsPage
