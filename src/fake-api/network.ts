const LATENCY_MS = 600

/** Waits as long as a request to the real API might, so busy and loading states show. */
export function latency() {
  return new Promise<void>((resolve) => setTimeout(resolve, LATENCY_MS))
}
