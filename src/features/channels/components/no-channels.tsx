import GridMessage from './grid-message.tsx'

// No button: "Add channel" in the header is the only way to add one. One line from tablet width up.
function NoChannels() {
  return (
    <GridMessage>
      <p className="text-muted-foreground md:whitespace-nowrap">
        Add a channel and LiveCatch records its broadcasts when listening is on.
      </p>
    </GridMessage>
  )
}

export default NoChannels
