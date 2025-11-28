// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import { Codamaescrow, CODAMAESCROW_DISCRIMINATOR, CODAMAESCROW_PROGRAM_ADDRESS, getCodamaescrowDecoder } from './client/js'
import CodamaescrowIDL from '../target/idl/codamaescrow.json'

export type CodamaescrowAccount = Account<Codamaescrow, string>

// Re-export the generated IDL and type
export { CodamaescrowIDL }

export * from './client/js'

export function getCodamaescrowProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getCodamaescrowDecoder(),
    filter: getBase58Decoder().decode(CODAMAESCROW_DISCRIMINATOR),
    programAddress: CODAMAESCROW_PROGRAM_ADDRESS,
  })
}
