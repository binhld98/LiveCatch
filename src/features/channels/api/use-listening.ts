import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { startListening, stopListening } from '@/fake-api/channels.ts'
import { openUpgradeDialog } from '@/hooks/use-upgrade-dialog.ts'

// Each card calls these itself, so the busy state belongs to the card that was pressed. onSuccess returns
// its refetches, so the mutation stays pending until the card and the sidebar count show the change.

export function useStartListening() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (channelId: string) => startListening(channelId),
    // Here, not in mutate(): TanStack skips mutate()'s callbacks once the card has unmounted, and a
    // refusal must still open the dialog after the user has left the page.
    onSuccess: async (result) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['channels'] }),
        queryClient.invalidateQueries({ queryKey: ['plan-usage'] }),
      ])
      if (result.status === 'refused') {
        openUpgradeDialog(result.refusalCode)
      }
    },
    onError: () => {
      toast("Couldn't start listening. Try again.")
    },
  })
}

export function useStopListening() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (channelId: string) => stopListening(channelId),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['channels'] }),
        queryClient.invalidateQueries({ queryKey: ['plan-usage'] }),
      ]),
    onError: () => {
      toast("Couldn't stop listening. Try again.")
    },
  })
}
