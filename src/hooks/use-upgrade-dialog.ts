import { useSyncExternalStore } from 'react'

/** Why the plan stops the user. The dialog turns it into its title and body. */
export type UpgradeReason = 'listenerLimit' | 'noHoursLeft' | 'trialEnded' | 'planEnded'

type UpgradeDialogState = {
  // Kept after closing, so the text stays while the dialog animates out.
  reason: UpgradeReason | null
  open: boolean
}

// One dialog for the whole app, mounted beside the toaster.
let state: UpgradeDialogState = { reason: null, open: false }
const listeners = new Set<() => void>()

function setState(next: UpgradeDialogState) {
  state = next
  for (const notify of listeners) notify()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return state
}

/** Opens the upgrade dialog from anywhere, like sonner's toast(). */
export function openUpgradeDialog(reason: UpgradeReason) {
  setState({ reason, open: true })
}

export function closeUpgradeDialog() {
  setState({ ...state, open: false })
}

/** The upgrade dialog's reason and whether it's open. Only the component that calls it re-renders. */
export function useUpgradeDialog() {
  return useSyncExternalStore(subscribe, getSnapshot)
}
