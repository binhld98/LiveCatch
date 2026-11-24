import { Button } from '@/components/ui/button.tsx'
import GridMessage from './grid-message.tsx'

type LoadFailedProps = {
  onRetry: () => void
}

// Shown only when the app has no copy of the cards: a failed refetch leaves the grid as it was.
function LoadFailed({ onRetry }: LoadFailedProps) {
  return (
    <GridMessage role="alert" className="whitespace-nowrap">
      <p className="font-medium">Channels couldn't be loaded</p>
      <Button variant="outline" className="h-10 px-4" onClick={onRetry}>
        Try again
      </Button>
    </GridMessage>
  )
}

export default LoadFailed
