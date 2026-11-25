import { Empty, EmptyDescription, EmptyHeader } from '@/components/ui/empty.tsx'

function NoChannels() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyDescription>Add a channel and LiveCatch records its broadcasts when listening is on.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export default NoChannels
