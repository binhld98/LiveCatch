import { Meter } from '@base-ui/react/meter'
import { GaugeIcon } from 'lucide-react'
import { Link } from 'react-router'
import { Badge } from '@/components/ui/badge.tsx'
import { buttonVariants } from '@/components/ui/button.tsx'
import { SidebarMenu } from '@/components/ui/sidebar.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { type PlanUsage as PlanUsageData, planLabels } from '@/features/billing/api/plan-usage.ts'
import usePlanUsage from '@/features/billing/api/use-plan-usage.ts'
import NavMenuItem from './nav-menu-item.tsx'
import useCloseDrawerOnPick from './use-close-drawer-on-pick.ts'

type UsageMeterProps = {
  label: string
  // The meter's accessible name, when it should say more than the visible label.
  name: string
  used: number
  total: number
}

// A Base UI Meter, not shadcn's progress: this is an amount out of a limit, not a task in progress.
// Screen readers get the name and "7.5 of 10" from the meter, so the visible row is hidden from them.
function UsageMeter({ label, name, used, total }: UsageMeterProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div aria-hidden="true" className="flex items-baseline justify-between gap-2">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">
          {used} <span className="font-normal text-muted-foreground">/ {total}</span>
        </span>
      </div>
      <Meter.Root
        value={used}
        max={total}
        aria-label={name}
        getAriaValueText={() => `${used} of ${total}`}
      >
        <Meter.Track className="h-1.5 overflow-hidden rounded-full bg-muted">
          <Meter.Indicator className="h-full rounded-full bg-primary" />
        </Meter.Track>
      </Meter.Root>
    </div>
  )
}

function planBadgeText({ plan, isEnded }: PlanUsageData) {
  if (isEnded) {
    return plan === 'trial' ? 'Trial ended' : 'Plan ended'
  }
  return planLabels[plan]
}

// Mirrors the badge and meter rows at their heights, so the card doesn't grow when the usage loads.
function PlanUsagePlaceholder() {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className="text-muted-foreground">Current plan</span>
        <Skeleton className="h-5 w-16 rounded-4xl" />
      </div>
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
    </>
  )
}

// The card shows in the expanded sidebar and the phone drawer. The rail shows a gauge link instead.
function PlanUsage() {
  const closeDrawer = useCloseDrawerOnPick()
  const { data: usage, isPending } = usePlanUsage()
  const summary =
    usage &&
    `${usage.hoursUsed} of ${usage.hoursTotal} hours used, ${usage.listenersUsed} of ${usage.listenerLimit} listeners used`

  return (
    <>
      <section
        aria-label="Plan usage"
        aria-busy={isPending}
        className="flex flex-col gap-3 rounded-lg border bg-background p-3 text-sm group-data-[collapsible=icon]:hidden"
      >
        {/* A failed load leaves only "Upgrade plan": the usage refetches on the next focus. */}
        {isPending && <PlanUsagePlaceholder />}
        {usage && (
          <>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Current plan</span>
              <Badge variant="outline">{planBadgeText(usage)}</Badge>
            </div>
            <UsageMeter
              label="Hours used"
              name="Recording hours used"
              used={usage.hoursUsed}
              total={usage.hoursTotal}
            />
            <UsageMeter
              label="Listeners used"
              name="Listeners used"
              used={usage.listenersUsed}
              total={usage.listenerLimit}
            />
          </>
        )}
        {/* No active state on /billing: only the rail gauge has one. */}
        <Link
          to="/billing"
          onClick={closeDrawer}
          className={buttonVariants({ className: 'h-10 w-full' })}
        >
          Upgrade plan
        </Link>
      </section>
      <SidebarMenu className="hidden group-data-[collapsible=icon]:flex">
        <NavMenuItem
          label="Plan usage"
          to="/billing"
          icon={GaugeIcon}
          aria-label={summary && `Plan usage: ${planBadgeText(usage)}, ${summary}`}
          tooltip={
            usage && (
              <span className="flex flex-col">
                <span>{planBadgeText(usage)}</span>
                <span>
                  {usage.hoursUsed} of {usage.hoursTotal} hours used
                </span>
                <span>
                  {usage.listenersUsed} of {usage.listenerLimit} listeners used
                </span>
              </span>
            )
          }
        />
      </SidebarMenu>
    </>
  )
}

export default PlanUsage
