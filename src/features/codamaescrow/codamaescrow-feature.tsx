import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { CodamaescrowUiButtonInitialize } from './ui/codamaescrow-ui-button-initialize'
import { CodamaescrowUiList } from './ui/codamaescrow-ui-list'
import { CodamaescrowUiProgramExplorerLink } from './ui/codamaescrow-ui-program-explorer-link'
import { CodamaescrowUiProgramGuard } from './ui/codamaescrow-ui-program-guard'

export default function CodamaescrowFeature() {
  const { account } = useSolana()

  return (
    <CodamaescrowUiProgramGuard>
      <AppHero
        title="Codamaescrow"
        subtitle={
          account
            ? "Initialize a new codamaescrow onchain by clicking the button. Use the program's methods (increment, decrement, set, and close) to change the state of the account."
            : 'Select a wallet to run the program.'
        }
      >
        <p className="mb-6">
          <CodamaescrowUiProgramExplorerLink />
        </p>
        {account ? (
          <CodamaescrowUiButtonInitialize account={account} />
        ) : (
          <div style={{ display: 'inline-block' }}>
            <WalletDropdown />
          </div>
        )}
      </AppHero>
      {account ? <CodamaescrowUiList account={account} /> : null}
    </CodamaescrowUiProgramGuard>
  )
}
