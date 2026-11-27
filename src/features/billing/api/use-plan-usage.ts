import { useQuery } from '@tanstack/react-query'
import { getPlanUsage } from '@/fake-api/plan-usage.ts'

export function usePlanUsage() {
  return useQuery({
    queryKey: ['plan-usage'],
    queryFn: () => getPlanUsage(),
  })
}
