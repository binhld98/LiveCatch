import type { Channel, ChannelList } from '@/features/channels/api/channel.ts'
import { db } from './seed.ts'
import { isScenarioOn } from './scenarios.ts'

const LATENCY_MS = 600

function latency() {
  return new Promise<void>((resolve) => setTimeout(resolve, LATENCY_MS))
}

function fail(message: string): never {
  throw new Error(`Fake API: ${message}`)
}

let listedOnce = false

/** Newest added first. */
export async function listChannels(): Promise<ChannelList> {
  await latency()
  if (isScenarioOn('channels.loading-fails') || (isScenarioOn('channels.reloading-fails') && listedOnce)) {
    // Logged because a failed refetch leaves the page as it was.
    console.info('Fake API: listChannels failed.')
    fail('listChannels failed')
  }
  listedOnce = true
  const items = isScenarioOn('channels.no-channels')
    ? []
    : db.channels.toSorted((a, b) => Date.parse(b.addedAt) - Date.parse(a.addedAt))
  // Copies, as a real response would be, so changing the store never changes cached data in place.
  return { items: structuredClone(items), total: items.length }
}

function findChannel(channelId: string) {
  const channel = db.channels.find(({ id }) => id === channelId)
  return channel ?? fail(`no channel ${channelId}`)
}

/** A channel already Listening or Recording comes back unchanged. */
export async function startListening(channelId: string): Promise<Channel> {
  await latency()
  if (isScenarioOn('channels.start-listening-fails')) {
    fail('startListening failed')
  }
  const channel = findChannel(channelId)
  if (channel.status === 'stopped') {
    // The fake checks the channel at once, so it never sits Listening with no live status.
    Object.assign(channel, {
      status: 'listening',
      liveStatus: 'notLive',
      lastCheckedAt: new Date().toISOString(),
      broadcastTitle: null,
    } satisfies Partial<Channel>)
  }
  return structuredClone(channel)
}

/** A Stopped channel comes back unchanged, and a Recording one fails. */
export async function stopListening(channelId: string): Promise<Channel> {
  await latency()
  if (isScenarioOn('channels.stop-listening-fails')) {
    fail('stopListening failed')
  }
  const channel = findChannel(channelId)
  if (channel.status === 'recording') {
    fail(`channel ${channelId} is recording, so it needs stopRecording`)
  }
  Object.assign(channel, {
    status: 'stopped',
    liveStatus: null,
    lastCheckedAt: null,
    broadcastTitle: null,
  } satisfies Partial<Channel>)
  return structuredClone(channel)
}
