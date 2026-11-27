import { useQuery } from '@tanstack/react-query'
import { listChannels } from '@/fake-api/channels.ts'

export function useChannels() {
  return useQuery({
    queryKey: ['channels'],
    queryFn: () => listChannels(),
  })
}
