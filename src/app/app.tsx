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
    </ErrorBoundary>
  )
}

export default App
