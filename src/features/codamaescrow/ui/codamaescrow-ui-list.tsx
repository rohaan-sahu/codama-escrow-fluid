import { CodamaescrowUiCard } from './codamaescrow-ui-card'
import { useCodamaescrowAccountsQuery } from '@/features/codamaescrow/data-access/use-codamaescrow-accounts-query'
import { UiWalletAccount } from '@wallet-ui/react'

export function CodamaescrowUiList({ account }: { account: UiWalletAccount }) {
  const codamaescrowAccountsQuery = useCodamaescrowAccountsQuery()

  if (codamaescrowAccountsQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!codamaescrowAccountsQuery.data?.length) {
    return (
      <div className="text-center">
        <h2 className={'text-2xl'}>No accounts</h2>
        No accounts found. Initialize one to get started.
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {codamaescrowAccountsQuery.data?.map((codamaescrow) => (
        <CodamaescrowUiCard account={account} key={codamaescrow.address} codamaescrow={codamaescrow} />
      ))}
    </div>
  )
}
