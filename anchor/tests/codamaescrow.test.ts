import { before, describe, test, it } from "node:test";
import assert, { doesNotMatch } from "node:assert";
import * as programClient from "../dist/js-client";
import { getOfferDecoder, OFFER_DISCRIMINATOR } from "../dist/js-client";
import { connect, Connection, TOKEN_EXTENSIONS_PROGRAM, ErrorWithTransaction } from "solana-kite";
import { type KeyPairSigner, type Address } from "@solana/kit";
import { createTestOffer, getRandomBigInt, ONE_SOL } from "./codamaescrow.test-helpers.ts";


describe("Escrow", async () => {
  //pre-setup
  let connection: Connection;
  let user: KeyPairSigner;
  let alice: KeyPairSigner;
  let bob: KeyPairSigner;

  before(async () => {
    connection = await connect();

    // 'user' will be the account we use to create the token mints
    [user, alice, bob] = await connection.createWallets(3, { airdropAmount: ONE_SOL });

  });

  describe("Setup", () => {
    test("wallet are created and funded", async () => {
      const aliceBalance = await connection.getLamportBalance(alice.address);
      const bobBalance = await connection.getLamportBalance(bob.address);
      const userBalance = await connection.getLamportBalance(user.address);

      assert.equal(aliceBalance,ONE_SOL,"Alice wallet exists and has 1 SOL in funds");
      assert.equal(bobBalance,ONE_SOL,"Bob wallet exists and has 1 SOL in funds");
      assert.equal(userBalance,ONE_SOL,"User wallet exists and has 1 SOL in funds");
    })
  });
});