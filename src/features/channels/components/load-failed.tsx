import { Button } from '@/components/ui/button.tsx'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty.tsx'

type LoadFailedProps = {
  onRetry: () => void
}

function LoadFailed({ onRetry }: LoadFailedProps) {
  return (
    <Empty role="alert" className="border">
      <EmptyHeader>
        <EmptyTitle>Channels couldn't be loaded</EmptyTitle>
        <EmptyDescription>Check your connection and try again.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export default LoadFailed
