import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils.ts'

// Columns at least 290px wide, up to 4, with equal row heights. Shared by the grid and its placeholders,
// so both take the same shape.
function ChannelGridLayout({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'grid auto-rows-fr grid-cols-[repeat(auto-fill,minmax(max(min(290px,100%),calc((100%-3rem)/4)),1fr))] gap-4',
        className,
      )}
      {...props}
    />
  )
}

export default ChannelGridLayout
