import type { ChannelList } from '@/features/channels/api/channel.ts'
import { channelsSeed } from './channels-seed.ts'
import { isScenarioOn } from './scenarios.ts'

// Stands in for the back end, kept in memory: a reload starts again from the seed data. Functions keep
// the real names and shapes, and only the features' query hooks call them, so switching to the real API
// changes no page.
const channels = channelsSeed

const LATENCY_MS = 600

function latency() {
  return new Promise<void>((resolve) => setTimeout(resolve, LATENCY_MS))
}

let listChannelsCalls = 0

// Newest added first.
export async function listChannels(): Promise<ChannelList> {
  await latency()
  listChannelsCalls += 1
  if (isScenarioOn('load-fails') || (isScenarioOn('refetch-fails') && listChannelsCalls > 1)) {
    throw new Error('Fake API: listChannels failed')
  }
  const items = isScenarioOn('empty')
    ? []
    : channels.toSorted((a, b) => Date.parse(b.addedAt) - Date.parse(a.addedAt))
  // Copies, as a real response would be, so changing the store never changes cached data in place.
  return { items: structuredClone(items), total: items.length }
}
