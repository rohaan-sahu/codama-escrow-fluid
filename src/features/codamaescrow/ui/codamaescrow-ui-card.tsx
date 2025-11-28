import { CodamaescrowAccount } from '@project/anchor'
import { ellipsify, UiWalletAccount } from '@wallet-ui/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { CodamaescrowUiButtonClose } from './codamaescrow-ui-button-close'
import { CodamaescrowUiButtonDecrement } from './codamaescrow-ui-button-decrement'
import { CodamaescrowUiButtonIncrement } from './codamaescrow-ui-button-increment'
import { CodamaescrowUiButtonSet } from './codamaescrow-ui-button-set'

export function CodamaescrowUiCard({ account, codamaescrow }: { account: UiWalletAccount; codamaescrow: CodamaescrowAccount }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Codamaescrow: {codamaescrow.data.count}</CardTitle>
        <CardDescription>
          Account: <AppExplorerLink address={codamaescrow.address} label={ellipsify(codamaescrow.address)} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-evenly">
          <CodamaescrowUiButtonIncrement account={account} codamaescrow={codamaescrow} />
          <CodamaescrowUiButtonSet account={account} codamaescrow={codamaescrow} />
          <CodamaescrowUiButtonDecrement account={account} codamaescrow={codamaescrow} />
          <CodamaescrowUiButtonClose account={account} codamaescrow={codamaescrow} />
        </div>
      </CardContent>
    </Card>
  )
}
