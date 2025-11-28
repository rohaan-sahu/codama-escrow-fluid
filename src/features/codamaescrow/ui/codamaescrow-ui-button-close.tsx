import { CodamaescrowAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useCodamaescrowCloseMutation } from '@/features/codamaescrow/data-access/use-codamaescrow-close-mutation'

export function CodamaescrowUiButtonClose({ account, codamaescrow }: { account: UiWalletAccount; codamaescrow: CodamaescrowAccount }) {
  const closeMutation = useCodamaescrowCloseMutation({ account, codamaescrow })

  return (
    <Button
      variant="destructive"
      onClick={() => {
        if (!window.confirm('Are you sure you want to close this account?')) {
          return
        }
        return closeMutation.mutateAsync()
      }}
      disabled={closeMutation.isPending}
    >
      Close
    </Button>
  )
}
