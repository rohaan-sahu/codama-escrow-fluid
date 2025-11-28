import { CodamaescrowAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useCodamaescrowSetMutation } from '@/features/codamaescrow/data-access/use-codamaescrow-set-mutation'

export function CodamaescrowUiButtonSet({ account, codamaescrow }: { account: UiWalletAccount; codamaescrow: CodamaescrowAccount }) {
  const setMutation = useCodamaescrowSetMutation({ account, codamaescrow })

  return (
    <Button
      variant="outline"
      onClick={() => {
        const value = window.prompt('Set value to:', codamaescrow.data.count.toString() ?? '0')
        if (!value || parseInt(value) === codamaescrow.data.count || isNaN(parseInt(value))) {
          return
        }
        return setMutation.mutateAsync(parseInt(value))
      }}
      disabled={setMutation.isPending}
    >
      Set
    </Button>
  )
}
