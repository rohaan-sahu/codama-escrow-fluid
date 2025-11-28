import { CodamaescrowAccount, getIncrementInstruction } from '@project/anchor'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { useMutation } from '@tanstack/react-query'
import { toastTx } from '@/components/toast-tx'
import { useCodamaescrowAccountsInvalidate } from './use-codamaescrow-accounts-invalidate'

export function useCodamaescrowIncrementMutation({
  account,
  codamaescrow,
}: {
  account: UiWalletAccount
  codamaescrow: CodamaescrowAccount
}) {
  const invalidateAccounts = useCodamaescrowAccountsInvalidate()
  const signAndSend = useWalletUiSignAndSend()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async () => await signAndSend(getIncrementInstruction({ codamaescrow: codamaescrow.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
