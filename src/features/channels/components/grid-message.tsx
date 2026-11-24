import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils.ts'

// A dashed box in place of the grid, for a page state with no cards: a message, and maybe a button
// beside it on one row.
function GridMessage({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-3 rounded-xl border border-dashed border-ring/60 px-5 py-12 text-center text-sm md:px-6 md:py-16',
        className,
      )}
      {...props}
    />
  )
}

export default GridMessage
