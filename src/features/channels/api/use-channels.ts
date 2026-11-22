import { useQuery } from '@tanstack/react-query'
import { listChannels } from '@/fake-api/channels.ts'

function useChannels() {
  return useQuery({
    queryKey: ['channels'],
    queryFn: () => listChannels(),
  })
}

export default useChannels
