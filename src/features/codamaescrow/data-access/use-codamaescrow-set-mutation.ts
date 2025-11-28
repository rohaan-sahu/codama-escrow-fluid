import { CodamaescrowAccount, getSetInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toastTx } from '@/components/toast-tx'
import { useCodamaescrowAccountsInvalidate } from './use-codamaescrow-accounts-invalidate'

export function useCodamaescrowSetMutation({ account, codamaescrow }: { account: UiWalletAccount; codamaescrow: CodamaescrowAccount }) {
  const invalidateAccounts = useCodamaescrowAccountsInvalidate()
  const signAndSend = useWalletUiSignAndSend()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async (value: number) =>
      await signAndSend(
        getSetInstruction({
          codamaescrow: codamaescrow.address,
          value,
        }),
        signer,
      ),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
