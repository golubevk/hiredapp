import React from 'react';
import { useTranslations } from 'next-intl';

import Button from '@mui/material/Button';

import { useProgram } from '@/hooks/useProgram';

import { QuestionAccount } from '@/interfaces/question';

interface IProps {
  account: QuestionAccount;
}

export const DeleteQuestion: React.FC<IProps> = ({ account }) => {
  const { useDeleteAccount } = useProgram();
  const deleteAccount = useDeleteAccount(account.publicKey);

  const t = useTranslations('question-form');
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
