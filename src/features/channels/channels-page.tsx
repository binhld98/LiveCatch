import PageHeader from '@/components/page-header.tsx'
import { useChannels } from './api/use-channels.ts'
import ChannelGrid from './components/channel-grid.tsx'
import ChannelGridPlaceholder from './components/channel-grid-placeholder.tsx'
import LoadFailed from './components/load-failed.tsx'
import NoChannels from './components/no-channels.tsx'

// Picks the state from whether there's data, not from the query's status, so a refetch, failed or not,
// leaves the grid as it was.
function ChannelsContent() {
  const { data, isError, isFetching, refetch } = useChannels()

  if (data) {
    return data.items.length === 0 ? <NoChannels /> : <ChannelGrid channels={data.items} />
  }
  // isError stays true while "Try again" refetches, and the placeholders should show meanwhile.
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
