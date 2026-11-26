import { Toaster } from '@/components/ui/sonner.tsx'
import { TooltipProvider } from '@/components/ui/tooltip.tsx'
import AppError from './app-error.tsx'
import AppRoutes from './app-routes.tsx'
import ErrorBoundary from './error-boundary.tsx'

function App() {
  return (
    <ErrorBoundary fallback={(reset) => <AppError onRetry={reset} />}>
      <TooltipProvider>
        <AppRoutes />
      </TooltipProvider>
      {/* Light until the app has a theme switch: with no ThemeProvider, the Toaster would follow the OS. */}
      <Toaster theme="light" position="top-center" />
    </ErrorBoundary>
  )
}

export default App
