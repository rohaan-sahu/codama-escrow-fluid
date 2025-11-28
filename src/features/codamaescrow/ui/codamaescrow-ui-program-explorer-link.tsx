import { CODAMAESCROW_PROGRAM_ADDRESS } from '@project/anchor'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { ellipsify } from '@wallet-ui/react'

export function CodamaescrowUiProgramExplorerLink() {
  return <AppExplorerLink address={CODAMAESCROW_PROGRAM_ADDRESS} label={ellipsify(CODAMAESCROW_PROGRAM_ADDRESS)} />
}
