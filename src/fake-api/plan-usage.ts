import type { PlanUsage } from '@/features/billing/api/plan-usage.ts'
import { countListeners } from './channels.ts'
import { currentPlan } from './plan.ts'

const LATENCY_MS = 600

export async function getPlanUsage(): Promise<PlanUsage> {
  await new Promise<void>((resolve) => setTimeout(resolve, LATENCY_MS))
  return { ...currentPlan, listenersUsed: countListeners() }
}
