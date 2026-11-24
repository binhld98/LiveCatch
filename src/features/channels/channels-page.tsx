import PageHeader from '@/components/page-header.tsx'
import useChannels from './api/use-channels.ts'
import ChannelGrid from './components/channel-grid.tsx'
import ChannelGridPlaceholder from './components/channel-grid-placeholder.tsx'

function ChannelsPage() {
  const { data } = useChannels()

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Channels" description="Add channels and choose which ones to listen to." />
      {data ? <ChannelGrid channels={data.items} /> : <ChannelGridPlaceholder />}
    </div>
  )
}

export default ChannelsPage
