import type { PlanUsage } from '@/features/billing/api/plan-usage.ts'
import { db } from './seed.ts'
import { isScenarioOn } from './scenarios.ts'

const LATENCY_MS = 600

/** Counts the channels listChannels() would return as Listening or Recording. */
function countListeners() {
  if (isScenarioOn('channels.no-channels')) {
    return 0
  }
  return db.channels.filter(({ status }) => status !== 'stopped').length
}

export async function getPlanUsage(): Promise<PlanUsage> {
  await new Promise<void>((resolve) => setTimeout(resolve, LATENCY_MS))
  return { ...structuredClone(db.plan), listenersUsed: countListeners() }
}
