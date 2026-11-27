import { Button } from '@/components/ui/button.tsx'
import { Spinner } from '@/components/ui/spinner.tsx'
import type { Channel } from '../../api/channel.ts'
import { useStartListening, useStopListening } from '../../api/use-listening.ts'

const looks = {
  stopped: { text: 'Start listening', variant: 'default' },
  listening: { text: 'Stop listening', variant: 'outline' },
  recording: { text: 'Stop recording', variant: 'destructive' },
} as const

type ListeningButtonProps = {
  channel: Channel
}

function ListeningButton({ channel }: ListeningButtonProps) {
  const start = useStartListening()
  const stop = useStopListening()
  const busy = start.isPending || stop.isPending
  const { text, variant } = looks[channel.status]

  function handleClick() {
    switch (channel.status) {
      case 'stopped':
        start.mutate(channel.id)
        break
      case 'listening':
        stop.mutate(channel.id)
        break
      case 'recording':
        // Does nothing yet: S2-6 adds the stop recording overlay.
        break
    }
  }

  return (
    // Focusable while busy, so keyboard focus stays here instead of falling back to the page. It is then
    // aria-disabled, not :disabled, so the dimming comes from data-disabled.
    <Button
      variant={variant}
      className="h-10 w-full data-disabled:opacity-50"
      disabled={busy}
      focusableWhenDisabled
      onClick={handleClick}
    >
      {/* Hidden from screen readers: the button is already announced as disabled. */}
      {busy && <Spinner aria-hidden="true" />}
      {text}
    </Button>
  )
}

export default ListeningButton
