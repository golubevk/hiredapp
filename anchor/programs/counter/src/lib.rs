#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("3wWvigDmpRgMfpoXZkJx2vt951o4FRvECc5z3FxSVseF");

#[program]
pub mod counter {
    use super::*;
    // jobs
    pub fn create_job(ctx: Context<CreateJob>, id: String, title: String, question_set: String) -> Result<()> {
        let job = &mut ctx.accounts.job;
        job.owner = ctx.accounts.owner.key();
        job.id = id;
        job.title = title;
        job.question_set = question_set;

        Ok(())
    }

    pub fn update_job(ctx: Context<UpdateJob>, _id: String, title: String, question_set: String) -> Result<()> {
        let job = &mut ctx.accounts.job;
        job.title = title;
        job.question_set = question_set;

        Ok(())
    }

    pub fn delete_job(_ctx: Context<DeleteJob>, _id: String) -> Result<()> {
        Ok(())
    }

    // question sets
    pub fn create_question_set(ctx: Context<CreateQuestionSet>, id: String, title: String, questions: Vec<String>) -> Result<()> {
        let question_set = &mut ctx.accounts.question_set;
        question_set.owner = ctx.accounts.owner.key();
        question_set.id = id;
        question_set.title = title;
        question_set.questions = questions;

        Ok(())
    }

    pub fn update_question_set(ctx: Context<UpdateQuestionSet>, _id: String, title: String, questions: Vec<String>) -> Result<()> {
        let question_set = &mut ctx.accounts.question_set;
        question_set.title = title;
        question_set.questions = questions;

        Ok(())
    }

    pub fn delete_question_set(_ctx: Context<DeleteQuestionSet>, _id: String) -> Result<()> {
        Ok(())
    }

    // questions
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

// Jobs
#[account]
#[derive(InitSpace)]
pub struct JobState {
    pub owner: Pubkey,
    #[max_len(50)]
    pub id: String,
    #[max_len(1000)]
    pub title: String,
    #[max_len(4, 50)]
    pub question_set: String
}

#[derive(Accounts)]
#[instruction(id: String, title: String, question_set: String)]
pub struct CreateJob<'info> {
    #[account(
        init,
        seeds = [id.as_bytes(), owner.key().as_ref()],
        bump,
        payer = owner,
        space = 8 + JobState::INIT_SPACE
    )]
    pub job: Account<'info, JobState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(id: String, title: String, question_set: String)]
pub struct UpdateJob<'info> {
    #[account(
        mut,
        seeds = [id.as_bytes(), owner.key().as_ref()],
        bump,
        realloc = 8 + JobState::INIT_SPACE,
        realloc::payer = owner, 
        realloc::zero = true, 
    )]
    pub job: Account<'info, JobState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(id: String)]
pub struct DeleteJob<'info> {
    #[account( 
        mut, 
        seeds = [id.as_bytes(), owner.key().as_ref()], 
        bump, 
        close= owner,
    )]
    pub job: Account<'info, JobState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Question sets
#[account]
#[derive(InitSpace)]
pub struct QuestionSetState {
    pub owner: Pubkey,
    #[max_len(50)]
    pub id: String,
    #[max_len(1000)]
    pub title: String,
    #[max_len(4, 50)]
    pub questions: Vec<String>
}

#[derive(Accounts)]
#[instruction(id: String, title: String, questions: Vec<String>)]
pub struct CreateQuestionSet<'info> {
    #[account(
        init,
        seeds = [id.as_bytes(), owner.key().as_ref()],
        bump,
        payer = owner,
        space = 8 + QuestionSetState::INIT_SPACE
    )]
    pub question_set: Account<'info, QuestionSetState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(id: String, title: String, questions: Vec<String>)]
pub struct UpdateQuestionSet<'info> {
    #[account(
        mut,
        seeds = [id.as_bytes(), owner.key().as_ref()],
        bump,
        realloc = 8 + QuestionSetState::INIT_SPACE,
        realloc::payer = owner, 
        realloc::zero = true, 
    )]
    pub question_set: Account<'info, QuestionSetState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(id: String)]
pub struct DeleteQuestionSet<'info> {
    #[account( 
        mut, 
        seeds = [id.as_bytes(), owner.key().as_ref()], 
        bump, 
        close= owner,
    )]
    pub question_set: Account<'info, QuestionSetState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Questions
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
