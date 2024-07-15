import { type ProgramAccount } from '@coral-xyz/anchor';
import type { PublicKey } from '@solana/web3.js';

export interface IQuestionSet {
  id: string;
  owner: PublicKey;
  title: string;
  questions: string[];
}

export type QuestionSetAccount = ProgramAccount<IQuestionSet>;
