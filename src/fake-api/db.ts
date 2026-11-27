import { isScenarioOn } from './scenarios.ts'
import { channelsSeed, planSeed } from './seed.ts'

/** The fake back end's store, shared by every area. Changed in place, unlike the seed it copies. */
export const db = {
  channels: structuredClone(channelsSeed),
  plan: structuredClone(planSeed),
}

/** Counts the channels listChannels() would return as Listening or Recording. */
export function countListeners() {
  if (isScenarioOn('channels.no-channels')) {
    return 0
  }
  return db.channels.filter(({ status }) => status !== 'stopped').length
}
