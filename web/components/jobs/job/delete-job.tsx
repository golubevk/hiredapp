import React from 'react';
import { useTranslations } from 'next-intl';

import Button from '@mui/material/Button';

import { useProgram } from '@/hooks/useProgram';

import { JobAccount } from '@/interfaces/job';

interface IProps {
  account: JobAccount;
}

export const DeleteJob: React.FC<IProps> = ({ account }) => {
  const { useDeleteJob } = useProgram();
  const deleteAccount = useDeleteJob(account.publicKey);

  const t = useTranslations('job');
  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure?');

    if (confirmed) {
      deleteAccount.mutateAsync(account.account.id);
    }
  };

  return (
    <Button onClick={handleDelete} color="error">
      {t('delete')}
    </Button>
  );
};
