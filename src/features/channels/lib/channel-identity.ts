import type { Channel, Platform } from '../api/channel.ts'

export const platformNames: Record<Platform, string> = {
  tiktok: 'TikTok',
  douyin: 'Douyin',
}

// "@username" on TikTok, the 抖音号 on Douyin, or null when the platform returned none.
export function accountName({ platform, username }: Channel) {
  return platform === 'tiktok' && username !== null ? `@${username}` : username
}

// The first character of the first two words. A Chinese name is one word, so it gives one character.
export function channelInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => Array.from(word)[0] ?? '')
    .join('')
    .toUpperCase()
}
