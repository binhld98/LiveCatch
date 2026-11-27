import type { Channel } from './channel.ts'

export type ListeningRefusalCode = 'trialEnded' | 'planEnded' | 'noHoursLeft' | 'listenerLimit'

/** A refusal is an expected answer, not a failure: the plan doesn't allow another listener. */
export type StartListeningResult =
  | { status: 'started'; channel: Channel }
  | { status: 'refused'; refusalCode: ListeningRefusalCode }
