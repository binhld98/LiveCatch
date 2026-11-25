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

// For channels.refetch-fails, which lets only the first load work. Once listChannels takes a search,
// status and page (S2-10, S2-11), this tracks each of them, so a first load of a new one still works.
let listedOnce = false

// Newest added first.
export async function listChannels(): Promise<ChannelList> {
  await latency()
  const failedBy = isScenarioOn('channels.load-fails')
    ? 'channels.load-fails'
    : isScenarioOn('channels.refetch-fails') && listedOnce
      ? 'channels.refetch-fails'
      : null
  if (failedBy !== null) {
    // Logged, so QA can see a refetch fail even though the page shows nothing.
    console.info(`Fake API: listChannels failed (scenario ${failedBy}).`)
    throw new Error('Fake API: listChannels failed')
  }
  listedOnce = true
  const items = isScenarioOn('channels.empty')
    ? []
    : channels.toSorted((a, b) => Date.parse(b.addedAt) - Date.parse(a.addedAt))
  // Copies, as a real response would be, so changing the store never changes cached data in place.
  return { items: structuredClone(items), total: items.length }
}
