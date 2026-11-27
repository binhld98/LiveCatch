import { Link } from 'react-router'
import { Button, buttonVariants } from '@/components/ui/button.tsx'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import { useUpgradeDialog, closeUpgradeDialog, type UpgradeReason } from '@/hooks/use-upgrade-dialog.ts'

function upgradeText(reason: UpgradeReason) {
  switch (reason) {
    case 'listenerLimit':
      return {
        title: 'All your listeners are in use',
        body: 'Stop listening on another channel, or upgrade your plan to listen to more at once.',
      }
    case 'noHoursLeft':
      return {
        title: 'No recording hours left',
        body: "You've used all your recording hours for this month. Upgrade your plan to keep recording.",
      }
    case 'trialEnded':
      return { title: 'Your trial has ended', body: 'Choose a plan to start listening again.' }
    case 'planEnded':
      return { title: 'Your plan has ended', body: 'Choose a plan to start listening again.' }
  }
}

/**
 * The app's one upgrade dialog, mounted once beside the toaster so it outlives the page that opens it.
 * openUpgradeDialog(reason) shows it, with "Maybe later" and "Upgrade plan".
 */
// Phone below md, the app's breakpoint: shadcn's 16px from each side, with "Upgrade plan" above "Maybe later".
function AppUpgradeDialog() {
  const { reason, open } = useUpgradeDialog()
  const text = reason && upgradeText(reason)

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => nextOpen || closeUpgradeDialog()}>
      <DialogContent showCloseButton={false} className="sm:max-w-[calc(100%-2rem)] md:max-w-lg">
        <DialogHeader>
          <DialogTitle>{text?.title}</DialogTitle>
          <DialogDescription>{text?.body}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:flex-col-reverse md:flex-row">
          <DialogClose render={<Button variant="outline" className="h-10" />}>Maybe later</DialogClose>
          <DialogClose
            nativeButton={false}
            render={<Link to="/billing" className={buttonVariants({ className: 'h-10' })} />}
          >
            Upgrade plan
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AppUpgradeDialog
