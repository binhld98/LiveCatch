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

export const planLabels: Record<Plan, string> = {
  trial: 'Free trial',
  plus: 'Plus',
  pro: 'Pro',
  max: 'Max',
}
