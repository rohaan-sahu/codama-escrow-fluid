import { CodamaescrowAccount, getDecrementInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toastTx } from '@/components/toast-tx'
import { useCodamaescrowAccountsInvalidate } from './use-codamaescrow-accounts-invalidate'

export function useCodamaescrowDecrementMutation({
  account,
  codamaescrow,
}: {
  account: UiWalletAccount
  codamaescrow: CodamaescrowAccount
}) {
  const invalidateAccounts = useCodamaescrowAccountsInvalidate()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async () => await signAndSend(getDecrementInstruction({ codamaescrow: codamaescrow.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
