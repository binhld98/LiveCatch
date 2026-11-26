import type { PlanUsage } from '@/features/billing/api/plan-usage.ts'

// Apart from plan-usage.ts, so the channels store can read the plan without importing a module that
// imports it.
export const currentPlan: Omit<PlanUsage, 'listenersUsed'> = {
  plan: 'pro',
  isEnded: false,
  listenerLimit: 6,
  hoursUsed: 113,
  hoursTotal: 200,
}
