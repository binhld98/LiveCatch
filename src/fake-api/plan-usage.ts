import type { PlanUsage } from '@/features/billing/api/plan-usage.ts'
import { countListeners, db } from './db.ts'
import { latency } from './network.ts'

export async function getPlanUsage(): Promise<PlanUsage> {
  await latency()
  return { ...structuredClone(db.plan), listenersUsed: countListeners() }
}
