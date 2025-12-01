import { Connection } from "solana-kite";
import { lamports, type KeyPairSigner, type Address } from "@solana/kit";
import * as programClient from "../dist/js-client";
import { TOKEN_EXTENSIONS_PROGRAM } from "solana-kite";
import { off } from "process";

const SYSTEM_PROGRAM_ADDRESS = '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
const ATP_ADDRESS = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>;

export const log = console.log;
export const stringify = (object: any) => {
  const bigIntReplacer = (key: string, value: any) => (typeof value === "bigint" ? value.toString() : value);
  return JSON.stringify(object, bigIntReplacer, 2);
};

export const ONE_SOL = lamports(1n * 1_000_000_000n);

export const getRandomBigInt = () => {
  return BigInt(Math.floor(Math.random() * 1_000_000_000_000_000));
};

// Helper function to create a test offer
export async function createTestOffer(params: {
  connection: Connection;
  maker: KeyPairSigner;
  tokenMintA: Address;
  tokenMintB: Address;
  makerTokenAccountA: Address;
  tokenAOfferedAmount: bigint;
  tokenBWantedAmount: bigint;
  offerId?: bigint;
}) {
  const {
    connection,
    maker,
    tokenMintA,
    tokenMintB,
    makerTokenAccountA,
    tokenAOfferedAmount,
    tokenBWantedAmount,
    offerId = getRandomBigInt()
  } = params;

  console.log("Checkpoint0")
  const offerPDAAndBump = await connection.getPDAAndBump(programClient.CODAMAESCROW_PROGRAM_ADDRESS, ["offer", offerId]);
  const offer = offerPDAAndBump.pda;
  const vault = await connection.getTokenAccountAddress(offer, tokenMintA, false);

  console.log("\nCheckpoint1")

  const makeOfferInstruction = await programClient.getMakeOfferInstructionAsync({
    maker,
    tokenMintA,
    tokenMintB,
    makerTokenAccountA,
    offer,
    vault,
    id: offerId,
    tokenAOfferedAmount,
    tokenBWantedAmount,
    tokenProgram: TOKEN_EXTENSIONS_PROGRAM,
    systemProgram: SYSTEM_PROGRAM_ADDRESS,
    associatedTokenProgram: ATP_ADDRESS
  });
  console.log("\naddresses for the Instruction: \n",makeOfferInstruction.accounts);
  console.log("\n signer address: \n",makeOfferInstruction.accounts[3].signer);
  console.log("\nCheckpoint2")

  try {
    const signature = await connection.sendTransactionFromInstructions({
      feePayer: maker,
      instructions: [makeOfferInstruction]
    });
    console.log("\nTransaction succeeded:", signature);
  } catch (error) { 
    const e = error as any;
    console.error("\nTransaction failed here: \n", e);
    console.error("\nerror message: ", e.message);
    console.error("\nlog message: ", e.transaction?.meta?.logMessages);
    console.log("\nVault: ",vault);
    console.error("\nerror transaction message: ", e.transaction?.transaction?.message);
    //throw error; // Re-throw so test fails properly
  }
  console.log("\nCheckpoint3")
  
  return { offer, vault, offerId };
}