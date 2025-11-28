import { useQueryClient } from '@tanstack/react-query'
import { useCodamaescrowAccountsQueryKey } from './use-codamaescrow-accounts-query-key'

export function useCodamaescrowAccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useCodamaescrowAccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}
