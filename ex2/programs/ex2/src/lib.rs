use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::{create_metadata_accounts_v3, CreateMetadataAccountsV3, Metadata},
    token::{burn, mint_to, Burn, Mint, MintTo, Token, TokenAccount},
};

use mpl_token_metadata::types::DataV2;

use solana_program::{pubkey, pubkey::Pubkey};

declare_id!("H1rviQLSYQyskmyy4x8dD7EFwf4RnPLZcXwx3YrD2KM");


pub const PREFIX: &str = "metadata";

fn find_metadata_account(mint: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[
            PREFIX.as_bytes(),
            mpl_token_metadata::ID.as_ref(),
            mint.as_ref(),
        ],
        &mpl_token_metadata::ID,
    )
}

#[program]
mod everything_fun {
    use super::*;

    pub fn create_mint(
        ctx: Context<CreateMint>,
        uri: String,
        name: String,
        symbol: String,
    ) -> Result<()> {
        // PDA seeds and bump to "sign" for CPI
        let seeds = b"hacka16zlong";
        let bump = ctx.bumps.token_mint;
        let signer: &[&[&[u8]]] = &[&[seeds, &[bump]]];

        // On-chain token metadata for the mint
        let data_v2 = DataV2 {
            name: name,
            symbol: symbol,
            uri: uri,
            seller_fee_basis_points: 0,
            creators: None,
            collection: None,
            uses: None,
        };

        // CPI Context
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_metadata_program.to_account_info(),
            CreateMetadataAccountsV3 {
                // the metadata account being created
                metadata: ctx.accounts.metadata_account.to_account_info(),
                // the mint account of the metadata account
                mint: ctx.accounts.token_mint.to_account_info(),
                // the mint authority of the mint account
                mint_authority: ctx.accounts.token_mint.to_account_info(),
                // the update authority of the metadata account
                update_authority: ctx.accounts.token_mint.to_account_info(),
                // the payer for creating the metadata account
                payer: ctx.accounts.user.to_account_info(),
                // the system program account
                system_program: ctx.accounts.system_program.to_account_info(),
                // the rent sysvar account
                rent: ctx.accounts.rent.to_account_info(),
            },
            signer,
        );

        create_metadata_accounts_v3(
            cpi_ctx, // cpi context
            data_v2, // token metadata
            true,    // is_mutable
            true,    // update_authority_is_signer
            None,    // collection details
        )?;

        Ok(())
    }

    pub fn buy_fut(ctx: Context<BuyFut>) -> Result<()> {
        // Check if player has enough health

        let seeds = b"hacka16zlong";
        let bump = ctx.bumps.token_mint;
        let signer: &[&[&[u8]]] = &[&[seeds, &[bump]]];

        // CPI Context
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.token_mint.to_account_info(),
                to: ctx.accounts.user_token_account.to_account_info(),
                authority: ctx.accounts.token_mint.to_account_info(),
            },
            signer,
        );

        // Mint 1 token, accounting for decimals of mint
        let amount = (1u64)
            .checked_mul(10u64.pow(ctx.accounts.token_mint.decimals as u32))
            .unwrap();

        mint_to(cpi_ctx, amount)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateMint<'info> {

    #[account(mut)]
    pub user: Signer<'info>,

    // The PDA is both the address of the mint account and the mint authority
    #[account(
        init,
        seeds = [b"hacka16zlong"],
        bump,
        payer = user,
        mint::decimals = 9,
        mint::authority = token_mint,
    )]
    pub token_mint: Account<'info, Mint>,

    ///CHECK: Using "address" constraint to validate metadata account address
    #[account(
        mut,
        address=find_metadata_account(&token_mint.key()).0
    )]
    pub metadata_account: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
    pub token_metadata_program: Program<'info, Metadata>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct BuyFut<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    // Initialize player token account if it doesn't exist
    #[account(
        init_if_needed,
        payer = user,
        associated_token::mint = token_mint,
        associated_token::authority = user
    )]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [b"hacka16zlong"],
        bump,
    )]
    pub token_mint: Account<'info, Mint>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}
