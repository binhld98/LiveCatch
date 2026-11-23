import PageHeader from '@/components/page-header.tsx'
import useChannels from './api/use-channels.ts'
import ChannelGrid from './components/channel-grid.tsx'

// Shows nothing while loading or after a failed load: S2-2 adds those states.
function ChannelsPage() {
  const { data } = useChannels()

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Channels" description="Add channels and choose which ones to listen to." />
      {data && <ChannelGrid channels={data.items} />}
    </div>
  )
}

export default ChannelsPage
