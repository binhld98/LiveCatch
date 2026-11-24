import { Skeleton } from '@/components/ui/skeleton.tsx'
import ChannelGridLayout from './channel-grid-layout.tsx'

// One page of cards.
const PLACEHOLDER_COUNT = 12

// Mirrors ChannelCard's rows at their heights, so a placeholder is as tall as a real card.
function ChannelCardPlaceholder() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-12 shrink-0 rounded-full" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex h-6 items-center">
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex h-5 items-center">
            <Skeleton className="h-3.5 w-1/2" />
          </div>
        </div>
      </div>
      {/* The detail box: three 22px lines, 8px apart, inside 10px padding and a border. */}
      <Skeleton className="h-26 rounded-lg" />
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-10 rounded-lg" />
        <Skeleton className="h-10 rounded-lg" />
      </div>
    </div>
  )
}

// Shown while the app has no copy of the cards.
function ChannelGridPlaceholder() {
  return (
    <div role="status">
      <span className="sr-only">Loading channels</span>
      <ChannelGridLayout aria-hidden="true">
        {Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => (
          <ChannelCardPlaceholder key={index} />
        ))}
      </ChannelGridLayout>
    </div>
  )
}

export default ChannelGridPlaceholder
