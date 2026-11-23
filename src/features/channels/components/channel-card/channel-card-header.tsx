import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import type { Channel } from '../../api/channel.ts'
import { accountName, channelInitials, platformNames } from '../../lib/channel-identity.ts'
import ChannelStatusBadge from './channel-status-badge.tsx'

type ChannelCardHeaderProps = {
  channel: Channel
}

function ChannelCardHeader({ channel }: ChannelCardHeaderProps) {
  const account = accountName(channel)

  return (
    <div className="flex items-center gap-3">
      {/* Decorative: the name is right beside it. */}
      <Avatar aria-hidden="true" className="size-12">
        <AvatarImage src={channel.avatarUrl ?? undefined} alt="" />
        <AvatarFallback className="text-base font-semibold">
          {channelInitials(channel.name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h2 className="truncate font-semibold">
          {channel.name}
        </h2>
        {/* Only the account name is cut off, so the platform always shows. */}
        <p className="flex text-sm text-muted-foreground">
          {account !== null && (
            <>
              <span className="truncate">{account}</span>
              <span className="shrink-0 whitespace-pre"> · </span>
            </>
          )}
          <span className="shrink-0">{platformNames[channel.platform]}</span>
        </p>
      </div>
      <ChannelStatusBadge status={channel.status} />
    </div>
  )
}

export default ChannelCardHeader
