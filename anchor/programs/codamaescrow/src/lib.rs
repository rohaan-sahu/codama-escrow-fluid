#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("A7nHLnjV7dRc8coHJEkjSk7cTiPopYHahK4zpv3Q3cw7");

#[program]
pub mod codamaescrow {
    use super::*;

    pub fn close(_ctx: Context<CloseCodamaescrow>) -> Result<()> {
        Ok(())
    }

    pub fn decrement(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.codamaescrow.count = ctx.accounts.codamaescrow.count.checked_sub(1).unwrap();
        Ok(())
    }

    pub fn increment(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.codamaescrow.count = ctx.accounts.codamaescrow.count.checked_add(1).unwrap();
        Ok(())
    }

    pub fn initialize(_ctx: Context<InitializeCodamaescrow>) -> Result<()> {
        Ok(())
    }

    pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
        ctx.accounts.codamaescrow.count = value.clone();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeCodamaescrow<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  init,
  space = 8 + Codamaescrow::INIT_SPACE,
  payer = payer
    )]
    pub codamaescrow: Account<'info, Codamaescrow>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseCodamaescrow<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  mut,
  close = payer, // close account and return lamports to payer
    )]
    pub codamaescrow: Account<'info, Codamaescrow>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub codamaescrow: Account<'info, Codamaescrow>,
}

#[account]
#[derive(InitSpace)]
pub struct Codamaescrow {
    count: u8,
}
