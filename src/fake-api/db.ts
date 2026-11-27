import type { Channel } from '@/features/channels/api/channel.ts'
import { isScenarioOn } from './scenarios.ts'
import { channelsSeed, planSeed } from './seed.ts'

// Plan scenarios change the store once, at load, so the app can still change it from there.
function createDb() {
  const channels = structuredClone(channelsSeed)
  const plan = structuredClone(planSeed)

  if (isScenarioOn('plan.listener-limit-reached')) {
    // Relies on the seed leaving exactly one free listener: 5 of the Pro plan's 6 listeners in use.
    const channel = channels.find(({ status }) => status === 'stopped')
    if (channel) {
      Object.assign(channel, {
        status: 'listening',
        liveStatus: 'notLive',
        lastCheckedAt: new Date().toISOString(),
        broadcastTitle: null,
      } satisfies Partial<Channel>)
    }
  }
  if (isScenarioOn('plan.no-hours-left')) {
    plan.hoursUsed = plan.hoursTotal
  }
  if (isScenarioOn('plan.trial-ended') || isScenarioOn('plan.plan-ended')) {
    if (isScenarioOn('plan.trial-ended')) {
      plan.plan = 'trial'
    }
    Object.assign(plan, { isEnded: true, listenerLimit: 0, hoursUsed: 0, hoursTotal: 0 })
    for (const channel of channels) {
      Object.assign(channel, {
        status: 'stopped',
        liveStatus: null,
        lastCheckedAt: null,
        broadcastTitle: null,
      } satisfies Partial<Channel>)
    }
  }
  return { channels, plan }
}

/** The fake back end's store, shared by every area. Changed in place, unlike the seed it copies. */
export const db = createDb()

/** Counts the channels listChannels() would return as Listening or Recording. */
export function countListeners() {
  if (isScenarioOn('channels.no-channels')) {
    return 0
  }
  return db.channels.filter(({ status }) => status !== 'stopped').length
}
