import { Meter } from '@base-ui/react/meter'
import { GaugeIcon } from 'lucide-react'
import { Link } from 'react-router'
import { Badge } from '@/components/ui/badge.tsx'
import { buttonVariants } from '@/components/ui/button.tsx'
import { SidebarMenu } from '@/components/ui/sidebar.tsx'
import type { PlanUsage as PlanUsageData } from '@/features/billing/api/plan-usage.ts'
import { usePlanUsage } from '@/features/billing/api/use-plan-usage.ts'
import NavMenuItem from './nav-menu-item.tsx'
import useCloseDrawerOnPick from './use-close-drawer-on-pick.ts'

type UsageMeterProps = {
  label: string
  used: number
  total: number
}

// A Base UI Meter, not shadcn's progress: this is an amount out of a limit, not a task in progress.
// Screen readers get the name and "7.5 of 10" from the meter, so the visible row is hidden from them.
function UsageMeter({ label, used, total }: UsageMeterProps) {
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
        aria-label={label}
        getAriaValueText={() => `${used} of ${total}`}
      >
        <Meter.Track className="h-1.5 overflow-hidden rounded-full bg-muted">
          <Meter.Indicator className="h-full rounded-full bg-primary" />
        </Meter.Track>
      </Meter.Root>
    </div>
  )
}

function planName({ plan, isEnded }: PlanUsageData) {
  const name = `${plan.charAt(0).toUpperCase()}${plan.slice(1)}`
  return isEnded ? `${name} ended` : name
}

// The card shows in the expanded sidebar and the phone drawer. The rail shows a gauge link instead.
function PlanUsage() {
  const closeDrawer = useCloseDrawerOnPick()
  const { data: usage } = usePlanUsage()
  const planText = usage && planName(usage)

  return (
    <>
      <section
        aria-label="Plan usage"
        className="flex flex-col gap-3 rounded-lg border bg-background p-3 text-sm group-data-[collapsible=icon]:hidden"
      >
        {/* h-5 is the badge's height, so the row doesn't grow when the plan loads. */}
        <div className="flex h-5 items-center justify-between gap-2">
          <span className="text-muted-foreground">Current plan</span>
          {planText && <Badge variant="outline">{planText}</Badge>}
        </div>
        <UsageMeter
          label="Hours used"
          used={usage?.hoursUsed ?? 0}
          total={usage?.hoursTotal ?? 0}
        />
        <UsageMeter
          label="Listeners used"
          used={usage?.listenersUsed ?? 0}
          total={usage?.listenerLimit ?? 0}
        />
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
        <NavMenuItem label="Plan usage" to="/billing" icon={GaugeIcon} />
      </SidebarMenu>
    </>
  )
}

export default PlanUsage
