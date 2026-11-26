import type { PlanUsage } from '@/features/billing/api/plan-usage.ts'
import { countListeners } from './channels.ts'

const LATENCY_MS = 600

/** Only listenersUsed for now: S2-4 adds the plan, its limits and recording hours. */
export async function getPlanUsage(): Promise<PlanUsage> {
  await new Promise<void>((resolve) => setTimeout(resolve, LATENCY_MS))
  return { listenersUsed: countListeners() }
}
