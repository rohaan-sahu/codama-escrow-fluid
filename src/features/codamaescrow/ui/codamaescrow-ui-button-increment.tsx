import { CodamaescrowAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'
import { useCodamaescrowIncrementMutation } from '../data-access/use-codamaescrow-increment-mutation'

export function CodamaescrowUiButtonIncrement({ account, codamaescrow }: { account: UiWalletAccount; codamaescrow: CodamaescrowAccount }) {
  const incrementMutation = useCodamaescrowIncrementMutation({ account, codamaescrow })

  return (
    <Button variant="outline" onClick={() => incrementMutation.mutateAsync()} disabled={incrementMutation.isPending}>
      Increment
    </Button>
  )
}
