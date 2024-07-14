import { type ProgramAccount } from '@coral-xyz/anchor';
import type { PublicKey } from '@solana/web3.js';

export interface IQuestion {
  id: string;
  owner: PublicKey;
  text: string;
}

export type QuestionAccount = ProgramAccount<IQuestion>;
