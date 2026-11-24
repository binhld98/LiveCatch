export type Platform = 'tiktok' | 'douyin'

export type ChannelStatus = 'stopped' | 'listening' | 'recording'

export type LiveStatus = 'live' | 'notLive' | 'unknown'

export type Channel = {
  id: string
  platform: Platform
  name: string
  // TikTok: the username, without "@". Douyin: the 抖音号, or null when the platform returns none.
  username: string | null
  avatarUrl: string | null
  // From the server: a Douyin profile link can't be built from the 抖音号.
  profileUrl: string
  status: ChannelStatus
  // Null while the channel is stopped. A recording channel is always live.
  liveStatus: LiveStatus | null
  // Null while the channel is stopped, or before its first check.
  lastCheckedAt: string | null
  // The running broadcast's title. Null when there is no broadcast, or it has no title.
  broadcastTitle: string | null
  addedAt: string
}

export type ChannelList = {
  items: Channel[]
  total: number
}
