// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import QuestionsIDL from '../target/idl/counter.json';
import type { Counter } from '../target/types/counter';

// Re-export the generated IDL and type
export { Counter, QuestionsIDL };

// The programId is imported from the program IDL.
export const PROGRAM_ID = new PublicKey(QuestionsIDL.address);

// This is a helper function to get the Counter Anchor program.
export function getQuestionsProgram(provider: AnchorProvider) {
  return new Program(QuestionsIDL as Counter, provider);
}

// This is a helper function to get the program ID for the Counter program depending on the cluster.
export function getQuestionsProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Counter program on devnet and testnet.
      return new PublicKey('3wWvigDmpRgMfpoXZkJx2vt951o4FRvECc5z3FxSVseF');
    case 'mainnet-beta':
    default:
      return PROGRAM_ID;
  }
}
