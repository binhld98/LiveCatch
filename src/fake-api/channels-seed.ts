import type { Channel } from '@/features/channels/api/channel.ts'

const MINUTE = 60_000
const DAY = 24 * 60 * MINUTE

// Relative to when the app loads, so "Checked … ago" looks right on any day.
function ago(ms: number) {
  return new Date(Date.now() - ms).toISOString()
}

// Drawn inline, so the seed data loads nothing from another site.
function avatar(background: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="${background}"/><circle cx="24" cy="19" r="8" fill="#fff"/><path d="M8 48a16 16 0 0 1 32 0z" fill="#fff"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function tiktokProfile(username: string) {
  return `https://www.tiktok.com/@${username}`
}

// Made-up sec_uids in the real form, so these links open no one's profile.
function douyinProfile(n: number) {
  return `https://www.douyin.com/user/MS4wLjABAAAA${String(n).padStart(64, '0')}`
}

// Made-up channels that cover every channel status and live status. Five are Listening or Recording, one
// under the Pro plan's listener limit, so one more start fills it. Listed in no particular order:
// listChannels() sorts them.
export const channelsSeed: Channel[] = [
  {
    id: 'ch_01',
    platform: 'tiktok',
    name: 'Mai Bakes',
    username: 'lc.demo.maibakes',
    avatarUrl: avatar('#d97706'),
    profileUrl: tiktokProfile('lc.demo.maibakes'),
    status: 'recording',
    liveStatus: 'live',
    lastCheckedAt: ago(0.3 * MINUTE),
    broadcastTitle: 'Sourdough from scratch: mixing, folding and shaping two loaves before the weekend market opens',
    addedAt: ago(1 * DAY),
  },
  {
    id: 'ch_02',
    platform: 'douyin',
    name: '小雨的厨房',
    username: 'lcdemo_xiaoyu',
    avatarUrl: avatar('#0891b2'),
    profileUrl: douyinProfile(2),
    status: 'listening',
    liveStatus: 'live',
    lastCheckedAt: ago(1 * MINUTE),
    broadcastTitle: '周末家常菜直播',
    addedAt: ago(2 * DAY),
  },
  {
    id: 'ch_03',
    platform: 'tiktok',
    name: 'Night Desk Radio',
    username: 'lc.demo.nightdesk',
    avatarUrl: null,
    profileUrl: tiktokProfile('lc.demo.nightdesk'),
    status: 'listening',
    liveStatus: 'notLive',
    lastCheckedAt: ago(2 * MINUTE),
    broadcastTitle: null,
    addedAt: ago(4 * DAY),
  },
  {
    id: 'ch_04',
    platform: 'douyin',
    name: '山里人家',
    username: null,
    avatarUrl: avatar('#15803d'),
    profileUrl: douyinProfile(4),
    status: 'stopped',
    liveStatus: null,
    lastCheckedAt: null,
    broadcastTitle: null,
    addedAt: ago(5 * DAY),
  },
  {
    id: 'ch_05',
    platform: 'tiktok',
    name: 'Retro Repair Bench',
    username: 'lc.demo.retrorepair',
    avatarUrl: avatar('#7c3aed'),
    profileUrl: tiktokProfile('lc.demo.retrorepair'),
    status: 'listening',
    liveStatus: 'unknown',
    lastCheckedAt: ago(47 * MINUTE),
    broadcastTitle: null,
    addedAt: ago(8 * DAY),
  },
  {
    id: 'ch_06',
    platform: 'douyin',
    name: '阿杰修表',
    username: 'lcdemo88',
    avatarUrl: null,
    profileUrl: douyinProfile(6),
    status: 'stopped',
    liveStatus: null,
    lastCheckedAt: null,
    broadcastTitle: null,
    addedAt: ago(11 * DAY),
  },
  {
    id: 'ch_07',
    platform: 'tiktok',
    name: 'The Very Long Channel Name That Never Fits on One Line',
    username: 'lc.demo.verylongusername',
    avatarUrl: avatar('#be185d'),
    profileUrl: tiktokProfile('lc.demo.verylongusername'),
    status: 'stopped',
    liveStatus: null,
    lastCheckedAt: null,
    broadcastTitle: null,
    addedAt: ago(15 * DAY),
  },
  {
    id: 'ch_08',
    platform: 'douyin',
    name: '海边日记',
    username: null,
    avatarUrl: avatar('#1d4ed8'),
    profileUrl: douyinProfile(8),
    status: 'stopped',
    liveStatus: null,
    lastCheckedAt: null,
    broadcastTitle: null,
    addedAt: ago(21 * DAY),
  },
  {
    id: 'ch_09',
    platform: 'tiktok',
    name: 'Studio Clay',
    username: 'lc.demo.studioclay',
    avatarUrl: avatar('#b45309'),
    profileUrl: tiktokProfile('lc.demo.studioclay'),
    status: 'stopped',
    liveStatus: null,
    lastCheckedAt: null,
    broadcastTitle: null,
    addedAt: ago(30 * DAY),
  },
  {
    id: 'ch_10',
    platform: 'douyin',
    name: '老王说车',
    username: 'lcdemo_laowang',
    avatarUrl: avatar('#475569'),
    profileUrl: douyinProfile(10),
    status: 'stopped',
    liveStatus: null,
    lastCheckedAt: null,
    broadcastTitle: null,
    addedAt: ago(44 * DAY),
  },
  {
    id: 'ch_11',
    platform: 'douyin',
    name: '古琴小课',
    username: 'lcdemo_guqin',
    avatarUrl: avatar('#9f1239'),
    profileUrl: douyinProfile(11),
    status: 'recording',
    liveStatus: 'live',
    lastCheckedAt: ago(0.8 * MINUTE),
    broadcastTitle: '零基础古琴入门第十二课：左手按音与走手音的练习方法，欢迎新同学提问',
    addedAt: ago(60 * DAY),
  },
  {
    id: 'ch_12',
    platform: 'tiktok',
    name: 'Garden Hour',
    username: 'lc.demo.gardenhour',
    avatarUrl: null,
    profileUrl: tiktokProfile('lc.demo.gardenhour'),
    status: 'stopped',
    liveStatus: null,
    lastCheckedAt: null,
    broadcastTitle: null,
    addedAt: ago(0.2 * DAY),
  },
]
