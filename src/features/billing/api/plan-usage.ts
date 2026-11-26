export type Plan = 'trial' | 'plus' | 'pro' | 'max'

export type PlanUsage = {
  plan: Plan
  isEnded: boolean
  listenerLimit: number
  // Channels that are Listening or Recording.
  listenersUsed: number
  hoursUsed: number
  hoursTotal: number
}
