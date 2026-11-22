import { Button } from '@/components/ui/button.tsx'
import type { ChannelStatus } from '../../api/channel.ts'

const looks = {
  stopped: { text: 'Start listening', variant: 'default' },
  listening: { text: 'Stop listening', variant: 'outline' },
  recording: { text: 'Stop recording', variant: 'destructive' },
} as const

type ListeningButtonProps = {
  status: ChannelStatus
}

// Does nothing yet: S2-3 adds start and stop listening, S2-6 adds stop recording.
function ListeningButton({ status }: ListeningButtonProps) {
  const { text, variant } = looks[status]

  return (
    <Button variant={variant} className="h-10 w-full">
      {text}
    </Button>
  )
}

export default ListeningButton
