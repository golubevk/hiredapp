import React, { useMemo } from 'react';

import { QuestionSet as QuestionSetForm } from '../question-set';

import { useProgram } from '@/hooks/useProgram';

import { PublicKey } from '@solana/web3.js';

interface IProps {
  address: PublicKey;
}

export const QuestionSet: React.FC<IProps> = ({ address }) => {
  const { useQuestionSet } = useProgram();
  const accountQuery = useQuestionSet(address);

  const account = useMemo(() => {
    if (accountQuery.isLoading || !accountQuery.data) return;

    return {
      publicKey: new PublicKey(address),
      account: accountQuery.data,
    };
  }, [accountQuery, address]);

  if (accountQuery.isLoading) return null;

  return <QuestionSetForm data={account} />;
};
