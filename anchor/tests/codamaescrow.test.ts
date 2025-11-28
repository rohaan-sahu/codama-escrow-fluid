import {
  Blockhash,
  createSolanaClient,
  createTransaction,
  generateKeyPairSigner,
  Instruction,
  isSolanaError,
  KeyPairSigner,
  signTransactionMessageWithSigners,
} from 'gill'
import {
  fetchCodamaescrow,
  getCloseInstruction,
  getDecrementInstruction,
  getIncrementInstruction,
  getInitializeInstruction,
  getSetInstruction,
} from '../src'
// @ts-ignore error TS2307 suggest setting `moduleResolution` but this is already configured
import { loadKeypairSignerFromFile } from 'gill/node'
import { describe,before,it } from 'node:test'
import assert from 'node:assert'

const { rpc, sendAndConfirmTransaction } = createSolanaClient({ urlOrMoniker: process.env.ANCHOR_PROVIDER_URL! })

describe('codamaescrow', () => {
  let payer: KeyPairSigner
  let codamaescrow: KeyPairSigner

  before(async () => {
    codamaescrow = await generateKeyPairSigner()
    payer = await loadKeypairSignerFromFile(process.env.ANCHOR_WALLET!)
  })

  it('Initialize Codamaescrow', async () => {
    // ARRANGE
    //expect.assertions(1)
    const ix = getInitializeInstruction({ payer: payer, codamaescrow: codamaescrow })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSER
    const currentCodamaescrow = await fetchCodamaescrow(rpc, codamaescrow.address)
    //expect(currentCodamaescrow.data.count).toEqual(0)
    assert.strictEqual(currentCodamaescrow.data.count,0)

  })

  it('Increment Codamaescrow', async () => {
    // ARRANGE
    //expect.assertions(1)
    const ix = getIncrementInstruction({
      codamaescrow: codamaescrow.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchCodamaescrow(rpc, codamaescrow.address)
    //expect(currentCount.data.count).toEqual(1)
    assert.strictEqual(currentCount.data.count,1)

  })

  it('Increment Codamaescrow Again', async () => {
    // ARRANGE
    //expect.assertions(1)
    const ix = getIncrementInstruction({ codamaescrow: codamaescrow.address })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchCodamaescrow(rpc, codamaescrow.address)
    //expect(currentCount.data.count).toEqual(2)
    assert.strictEqual(currentCount.data.count,2)

  })

  it('Decrement Codamaescrow', async () => {
    // ARRANGE
    //expect.assertions(1)
    const ix = getDecrementInstruction({
      codamaescrow: codamaescrow.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchCodamaescrow(rpc, codamaescrow.address)
    //expect(currentCount.data.count).toEqual(1)
    assert.strictEqual(currentCount.data.count,1)

  })

  it('Set codamaescrow value', async () => {
    // ARRANGE
    //expect.assertions(1)
    const ix = getSetInstruction({ codamaescrow: codamaescrow.address, value: 42 })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchCodamaescrow(rpc, codamaescrow.address)
    //expect(currentCount.data.count).toEqual(42)
    assert.strictEqual(currentCount.data.count,42)
  })

  it('Set close the codamaescrow account', async () => {
    // ARRANGE
    //expect.assertions(1)
    const ix = getCloseInstruction({
      payer: payer,
      codamaescrow: codamaescrow.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    try {
      await fetchCodamaescrow(rpc, codamaescrow.address)
    } catch (e) {
      if (!isSolanaError(e)) {
        throw new Error(`Unexpected error: ${e}`)
      }
      //expect(e.message).toEqual(`Account not found at address: ${codamaescrow.address}`)
      assert.strictEqual(e.message,`Account not found at address: ${codamaescrow.address}`)
    }
  })
})

// Helper function to keep the tests DRY
let latestBlockhash: Awaited<ReturnType<typeof getLatestBlockhash>> | undefined
async function getLatestBlockhash(): Promise<Readonly<{ blockhash: Blockhash; lastValidBlockHeight: bigint }>> {
  if (latestBlockhash) {
    return latestBlockhash
  }
  return await rpc
    .getLatestBlockhash()
    .send()
    .then(({ value }) => value)
}
async function sendAndConfirm({ ix, payer }: { ix: Instruction; payer: KeyPairSigner }) {
  const tx = createTransaction({
    feePayer: payer,
    instructions: [ix],
    version: 'legacy',
    latestBlockhash: await getLatestBlockhash(),
  })
  const signedTransaction = await signTransactionMessageWithSigners(tx)
  return await sendAndConfirmTransaction(signedTransaction)
}
