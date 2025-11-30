import { before, describe, test, it } from "node:test";
import assert, { doesNotMatch } from "node:assert";
import * as programClient from "../dist/js-client";
import { getOfferDecoder, OFFER_DISCRIMINATOR,CODAMAESCROW_PROGRAM_ADDRESS } from "../dist/js-client";
import { connect, Connection, TOKEN_EXTENSIONS_PROGRAM, ErrorWithTransaction } from "solana-kite";
import { type KeyPairSigner, type Address } from "@solana/kit";
import { createTestOffer, getRandomBigInt, ONE_SOL } from "./codamaescrow.test-helpers.ts";


describe("Escrow", async () => {
  //pre-setup
  let connection: Connection;
  let user: KeyPairSigner;
  let alice: KeyPairSigner;
  let bob: KeyPairSigner;
  let program = CODAMAESCROW_PROGRAM_ADDRESS;

  before(async () => {
    connection = connect();

    // 'user' will be the account we use to create the token mints
    [user, alice, bob] = await connection.createWallets(3, { airdropAmount: ONE_SOL });

  });

  describe("Setup", () => {
    test("wallet are created and funded", async () => {
      const aliceBalance = await connection.getLamportBalance(alice.address);
      const bobBalance = await connection.getLamportBalance(bob.address);
      const userBalance = await connection.getLamportBalance(user.address);

      assert.equal(aliceBalance,ONE_SOL,"Alice's Wallet not funded as expected");
      assert.equal(bobBalance,ONE_SOL,"Bob's wallet not funded as expected");
      assert.equal(userBalance,ONE_SOL,"User's wallet not funded as expected");

      console.log(`alice wallet balance: ${aliceBalance}`);
      console.log(`bob wallet balance: ${bobBalance}`);
      console.log(`user wallet balance: ${userBalance}`);
    })

    
    test("program is deployed", async () => {
      const programId = CODAMAESCROW_PROGRAM_ADDRESS;
      
      const programAccountBal = await connection.getLamportBalance(programId);
      console.log(`Program account balance: ${programAccountBal}`);

      assert.notEqual(
        programAccountBal,
        0,
        "The Program account has zero SOL. It may not have been deployed"
      );
    });
    
  });
});