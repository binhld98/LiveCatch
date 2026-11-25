import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty.tsx'

function NoChannels() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyTitle>No channels yet</EmptyTitle>
        <EmptyDescription>Add a channel and LiveCatch records its broadcasts when listening is on.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export default NoChannels
