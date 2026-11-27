export type ListeningRefusalCode = 'trialEnded' | 'planEnded' | 'noHoursLeft' | 'listenerLimit'

/** startListening throws it when the plan doesn't allow another listener. */
export class ListeningRefusedError extends Error {
  readonly reason: ListeningRefusalCode

  constructor(reason: ListeningRefusalCode) {
    super(`Listening can't start: ${reason}`)
    this.name = 'ListeningRefusedError'
    this.reason = reason
  }
}
