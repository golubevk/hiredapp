#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("3wWvigDmpRgMfpoXZkJx2vt951o4FRvECc5z3FxSVseF");

#[program]
pub mod counter {
    use super::*;

    pub fn create_question(ctx: Context<CreateQuestion>, id: String, text: String) -> Result<()> {
        let question = &mut ctx.accounts.question;
        question.owner = ctx.accounts.owner.key();
        question.id = id;
        question.text = text;
        Ok(())
    }

    pub fn update_question(ctx: Context<UpdateQuestion>, _id: String, text: String) -> Result<()> {
        let question = &mut ctx.accounts.question;
        question.text = text;

        Ok(())
    }

    pub fn delete_question(_ctx: Context<DeleteQuestion>, _id: String) -> Result<()> {
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct QuestionState {
    pub owner: Pubkey,
    #[max_len(50)]
    pub id: String,
    #[max_len(1000)]
    pub text: String,
}

#[derive(Accounts)]
#[instruction(id: String, text: String)]
pub struct CreateQuestion<'info> {
    #[account(
        init,
        seeds = [id.as_bytes(), owner.key().as_ref()],
        bump,
        payer = owner,
        space = 8 + QuestionState::INIT_SPACE
    )]
    pub question: Account<'info, QuestionState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(id: String, text: String)]
pub struct UpdateQuestion<'info> {
    #[account(
        mut,
        seeds = [id.as_bytes(), owner.key().as_ref()],
        bump,
        realloc = 8 + QuestionState::INIT_SPACE,
        realloc::payer = owner, 
        realloc::zero = true, 
    )]
    pub question: Account<'info, QuestionState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(id: String)]
pub struct DeleteQuestion<'info> {
    #[account( 
        mut, 
        seeds = [id.as_bytes(), owner.key().as_ref()], 
        bump, 
        close= owner,
    )]
    pub question: Account<'info, QuestionState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}
