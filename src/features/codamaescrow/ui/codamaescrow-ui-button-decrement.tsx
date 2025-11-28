import { CodamaescrowAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useCodamaescrowDecrementMutation } from '../data-access/use-codamaescrow-decrement-mutation'

export function CodamaescrowUiButtonDecrement({ account, codamaescrow }: { account: UiWalletAccount; codamaescrow: CodamaescrowAccount }) {
  const decrementMutation = useCodamaescrowDecrementMutation({ account, codamaescrow })

  return (
    <Button variant="outline" onClick={() => decrementMutation.mutateAsync()} disabled={decrementMutation.isPending}>
      Decrement
    </Button>
  )
}
