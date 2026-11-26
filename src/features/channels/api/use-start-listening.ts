import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { startListening } from '@/fake-api/channels.ts'

/** Each card calls it itself, so the busy state belongs to the card that was pressed. */
function useStartListening() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (channelId: string) => startListening(channelId),
    // Returned, so the mutation stays pending until the card and the sidebar count show the change.
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['channels'] }),
        queryClient.invalidateQueries({ queryKey: ['plan-usage'] }),
      ]),
    onError: () => {
      toast("Couldn't start listening. Try again.")
    },
  })
}

export default useStartListening
