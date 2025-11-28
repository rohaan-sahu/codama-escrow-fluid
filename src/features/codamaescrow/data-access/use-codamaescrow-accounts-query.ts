import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getCodamaescrowProgramAccounts } from '@project/anchor'
import { useCodamaescrowAccountsQueryKey } from './use-codamaescrow-accounts-query-key'

export function useCodamaescrowAccountsQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: useCodamaescrowAccountsQueryKey(),
    queryFn: async () => await getCodamaescrowProgramAccounts(client.rpc),
  })
}
