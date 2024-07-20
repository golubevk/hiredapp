import React, { useMemo } from 'react';

import { Job as JobForm } from '../job';

import { useProgram } from '@/hooks/useProgram';

import { PublicKey } from '@solana/web3.js';

interface IProps {
  address: PublicKey;
}

export const Job: React.FC<IProps> = ({ address }) => {
  const { useJob } = useProgram();
  const accountQuery = useJob(address);

  const account = useMemo(() => {
    if (accountQuery.isLoading || !accountQuery.data) return;

    return {
      publicKey: new PublicKey(address),
      account: accountQuery.data,
    };
  }, [accountQuery, address]);

  if (accountQuery.isLoading) return null;

  return <JobForm data={account} />;
};
