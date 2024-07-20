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
import { type IQuestionSet } from '@/interfaces/question-set';
import { type IJob } from '@/interfaces/job';

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

  const questions = useQuery({
    queryKey: ['question', 'all', { cluster }],
    queryFn: () => program.account.questionState.all(),
  });

  const questionSets = useQuery({
    queryKey: ['question-set', 'all', { cluster }],
    queryFn: () => program.account.questionSetState.all(),
  });

  const jobs = useQuery({
    queryKey: ['job', 'all', { cluster }],
    queryFn: () => program.account.jobState.all(),
  });

  const useQuestion = (account: PublicKey) =>
    useQuery({
      queryKey: ['question', 'fetch', { cluster, account }],
      queryFn: () => program.account.questionState.fetch(account),
    });

  const useQuestionSet = (account: PublicKey) =>
    useQuery({
      queryKey: ['question', 'fetch', { cluster, account }],
      queryFn: () => program.account.questionSetState.fetch(account),
    });

  const useJob = (account: PublicKey) =>
    useQuery({
      queryKey: ['job', 'fetch', { cluster, account }],
      queryFn: () => program.account.jobState.fetch(account),
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
      questions.refetch();
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
      questions.refetch();
      push(`/${Route.QUESTIONS}`);
    },
    onError: (error) => {
      toast.error(`Failed to update question: ${error.message}`);
    },
  });

  const useDeleteQuestion = (account: PublicKey) =>
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
        questions.refetch();
        push(`/${Route.QUESTIONS}`);
      },
    });

  const createQuestionSet = useMutation<string, Error, IQuestionSet>({
    mutationKey: ['question-set', 'create', { cluster }],
    mutationFn: async ({ id, title, questions, owner }) => {
      const [address] = await PublicKey.findProgramAddress(
        [Buffer.from(id), owner.toBuffer()],
        programId
      );

      return (
        program.methods
          .createQuestionSet(id, title, questions)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .accounts({ question_set: address })
          .rpc()
      );
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      questionSets.refetch();
      push(`/${Route.SETS}`);
    },
    onError: (error) => {
      toast.error(`Failed to create question set: ${error.message}`);
    },
  });

  const updateQuestionSet = useMutation<string, Error, IQuestionSet>({
    mutationKey: ['question-set', 'update', { cluster }],
    mutationFn: async ({ id, title, questions, owner }) => {
      const [address] = await PublicKey.findProgramAddress(
        [Buffer.from(id), owner.toBuffer()],
        programId
      );

      return (
        program.methods
          .updateQuestionSet(id, title, questions)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .accounts({ question_set: address })
          .rpc()
      );
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      questionSets.refetch();
      push(`/${Route.SETS}`);
    },
    onError: (error) => {
      toast.error(`Failed to update question set: ${error.message}`);
    },
  });

  const useDeleteQuestionSet = (account: PublicKey) =>
    useMutation({
      mutationKey: ['question-set', 'delete', { cluster, account }],
      mutationFn: (id: string) =>
        program.methods
          .deleteQuestionSet(id)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .accounts({ question_set: account })
          .rpc(),
      onSuccess: (tx) => {
        transactionToast(tx);
        questionSets.refetch();
        push(`/${Route.SETS}`);
      },
    });

  const createJob = useMutation<string, Error, IJob>({
    mutationKey: ['job', 'create', { cluster }],
    mutationFn: async ({ id, title, questionSet, owner }) => {
      const [address] = await PublicKey.findProgramAddress(
        [Buffer.from(id), owner.toBuffer()],
        programId
      );

      return (
        program.methods
          .createJob(id, title, questionSet)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .accounts({ job: address })
          .rpc()
      );
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      questionSets.refetch();
      push(`/${Route.JOBS}`);
    },
    onError: (error) => {
      toast.error(`Failed to create question set: ${error.message}`);
    },
  });

  const updateJob = useMutation<string, Error, IJob>({
    mutationKey: ['job', 'update', { cluster }],
    mutationFn: async ({ id, title, questionSet, owner }) => {
      const [address] = await PublicKey.findProgramAddress(
        [Buffer.from(id), owner.toBuffer()],
        programId
      );

      return (
        program.methods
          .updateJob(id, title, questionSet)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .accounts({ job: address })
          .rpc()
      );
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      questionSets.refetch();
      push(`/${Route.JOBS}`);
    },
    onError: (error) => {
      toast.error(`Failed to update question set: ${error.message}`);
    },
  });

  const useDeleteJob = (account: PublicKey) =>
    useMutation({
      mutationKey: ['job', 'delete', { cluster, account }],
      mutationFn: (id: string) =>
        program.methods
          .deleteJob(id)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .accounts({ job: account })
          .rpc(),
      onSuccess: (tx) => {
        transactionToast(tx);
        questionSets.refetch();
        push(`/${Route.JOBS}`);
      },
    });

  return {
    program,
    programId,
    questions,
    questionSets,
    jobs,
    getProgramAccount,
    createQuestion,
    updateQuestion,
    createQuestionSet,
    updateQuestionSet,
    createJob,
    updateJob,
    useQuestion,
    useQuestionSet,
    useJob,
    useDeleteQuestion,
    useDeleteQuestionSet,
    useDeleteJob,
  };
}
