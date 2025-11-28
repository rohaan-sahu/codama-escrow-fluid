import { useSolana } from '@/components/solana/use-solana'

export function useCodamaescrowAccountsQueryKey() {
  const { cluster } = useSolana()

  return ['codamaescrow', 'accounts', { cluster }]
}
