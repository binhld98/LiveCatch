import { ExternalLinkIcon, TrashIcon, VideoIcon } from 'lucide-react'
import type { ReactElement, ReactNode } from 'react'
import { Link } from 'react-router'
import { Button, buttonVariants } from '@/components/ui/button.tsx'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.tsx'
import { cn } from '@/lib/utils.ts'
import type { Channel } from '../../api/channel.ts'
import { platformNames } from '../../lib/channel-identity.ts'
import ListeningButton from './listening-button.tsx'

const iconButtonClassName = 'h-10 w-full'

type IconActionProps = {
  // Both the tooltip and the accessible label.
  label: string
  // The link or button itself.
  render: ReactElement
  children: ReactNode
}

function IconAction({ label, render, children }: IconActionProps) {
  return (
    <Tooltip>
      <TooltipTrigger aria-label={label} render={render}>
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

type ChannelCardFooterProps = {
  channel: Channel
}

function ChannelCardFooter({ channel }: ChannelCardFooterProps) {
  // cn, as in Button: buttonVariants alone keeps the base's transparent border and 32px size.
  const linkClassName = cn(buttonVariants({ variant: 'outline', size: 'icon' }), iconButtonClassName)

  return (
    <div className="grid grid-cols-2 gap-2">
      <ListeningButton status={channel.status} />
      <TooltipProvider>
        <div className="grid grid-cols-3 gap-1">
          <IconAction
            label={`Open on ${platformNames[channel.platform]}`}
            render={
              <a
                href={channel.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              />
            }
          >
            <ExternalLinkIcon aria-hidden="true" />
          </IconAction>
          {/* Recordings ignores the channel for now. */}
          <IconAction
            label="View recordings"
            render={
              <Link
                to={`/recordings?channel=${encodeURIComponent(channel.id)}`}
                className={linkClassName}
              />
            }
          >
            <VideoIcon aria-hidden="true" />
          </IconAction>
          {/* Does nothing yet: S2-7 adds the remove overlay. */}
          <IconAction
            label="Remove"
            render={
              <Button
                variant="outline"
                size="icon"
                className={`${iconButtonClassName} text-destructive hover:text-destructive`}
              />
            }
          >
            <TrashIcon aria-hidden="true" />
          </IconAction>
        </div>
      </TooltipProvider>
    </div>
  )
}

export default ChannelCardFooter
