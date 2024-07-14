import React, { useMemo } from 'react';

import { QuestionForm } from '../question-form';

import { useProgram } from '@/hooks/useProgram';

import { PublicKey } from '@solana/web3.js';

interface IProps {
  address: PublicKey;
}

export const Question: React.FC<IProps> = ({ address }) => {
  const { useAccount } = useProgram();
  const accountQuery = useAccount(address);

  const account = useMemo(() => {
    if (accountQuery.isLoading || !accountQuery.data) return;

    return {
      publicKey: new PublicKey(address),
      account: accountQuery.data,
    };
  }, [accountQuery, address]);

  if (accountQuery.isLoading) return null;

  return <QuestionForm data={account} />;
};
