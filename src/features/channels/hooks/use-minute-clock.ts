import { useSyncExternalStore } from 'react'

const MINUTE = 60_000

// One timer for the whole app, running only while something reads the clock.
let now = Date.now()
let timer: ReturnType<typeof setInterval> | undefined
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (listeners.size === 1) {
    now = Date.now()
    timer = setInterval(() => {
      now = Date.now()
      for (const notify of listeners) notify()
    }, MINUTE)
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) clearInterval(timer)
  }
}

function getSnapshot() {
  return now
}

// The current time in milliseconds, updated once a minute. Only the component that calls it re-renders.
function useMinuteClock() {
  return useSyncExternalStore(subscribe, getSnapshot)
}

export default useMinuteClock
