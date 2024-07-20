import { type ProgramAccount } from '@coral-xyz/anchor';
import type { PublicKey } from '@solana/web3.js';

export interface IJob {
  id: string;
  owner: PublicKey;
  title: string;
  questionSet: string;
}

export type JobAccount = ProgramAccount<IJob>;
