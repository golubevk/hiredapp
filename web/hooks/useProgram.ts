import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { getQuestionsProgramId, getQuestionsProgram } from '@hiredapp/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useCluster } from '@/components/cluster/cluster-data-access';
import { useTransactionToast } from '@/components/ui/ui-layout';
import { useAnchorProvider } from '@/components/solana/solana-provider';

import { PublicKey, type Cluster } from '@solana/web3.js';
import { Route } from '@/interfaces/routes';
import { type IQuestion } from '@/interfaces/question';

export function useProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const provider = useAnchorProvider();
  const { push } = useRouter();

  const transactionToast = useTransactionToast();

  const programId = useMemo(
    () => getQuestionsProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getQuestionsProgram(provider);

  const accounts = useQuery({
    queryKey: ['question', 'all', { cluster }],
    queryFn: () => program.account.questionState.all(),
  });

  const useAccount = (account: PublicKey) =>
    useQuery({
      queryKey: ['question', 'fetch', { cluster, account }],
      queryFn: () => program.account.questionState.fetch(account),
    });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const createQuestion = useMutation<string, Error, IQuestion>({
    mutationKey: ['question', 'create', { cluster }],
    mutationFn: async ({ id, text, owner }) => {
      const [address] = await PublicKey.findProgramAddress(
        [Buffer.from(id), owner.toBuffer()],
        programId
      );

      return (
        program.methods
          .createQuestion(id, text)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .accounts({ question: address })
          .rpc()
      );
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      accounts.refetch();
      push(`/${Route.QUESTIONS}`);
    },
    onError: (error) => {
      toast.error(`Failed to create question: ${error.message}`);
    },
  });

  const updateQuestion = useMutation<string, Error, IQuestion>({
    mutationKey: ['question', 'update', { cluster }],
    mutationFn: async ({ id, text, owner }) => {
      const [address] = await PublicKey.findProgramAddress(
        [Buffer.from(id), owner.toBuffer()],
        programId
      );

      return (
        program.methods
          .updateQuestion(id, text)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .accounts({ question: address })
          .rpc()
      );
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      accounts.refetch();
      push(`/${Route.QUESTIONS}`);
    },
    onError: (error) => {
      toast.error(`Failed to update question: ${error.message}`);
    },
  });

  const useDeleteAccount = (account: PublicKey) =>
    useMutation({
      mutationKey: ['question', 'delete', { cluster, account }],
      mutationFn: (id: string) =>
        program.methods
          .deleteQuestion(id)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .accounts({ question: account })
          .rpc(),
      onSuccess: (tx) => {
        transactionToast(tx);
        accounts.refetch();
        push(`/${Route.QUESTIONS}`);
      },
    });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createQuestion,
    updateQuestion,
    useAccount,
    useDeleteAccount,
  };
}
