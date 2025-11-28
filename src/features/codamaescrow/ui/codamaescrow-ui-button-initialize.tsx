import { Button } from '@/components/ui/button'
import { UiWalletAccount } from '@wallet-ui/react'

import { useCodamaescrowInitializeMutation } from '@/features/codamaescrow/data-access/use-codamaescrow-initialize-mutation'

export function CodamaescrowUiButtonInitialize({ account }: { account: UiWalletAccount }) {
  const mutationInitialize = useCodamaescrowInitializeMutation({ account })

  return (
    <Button onClick={() => mutationInitialize.mutateAsync()} disabled={mutationInitialize.isPending}>
      Initialize Codamaescrow {mutationInitialize.isPending && '...'}
    </Button>
  )
}
