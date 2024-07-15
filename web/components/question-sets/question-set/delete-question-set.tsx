import React from 'react';
import { useTranslations } from 'next-intl';

import Button from '@mui/material/Button';

import { useProgram } from '@/hooks/useProgram';

import { QuestionSetAccount } from '@/interfaces/question-set';

interface IProps {
  account: QuestionSetAccount;
}

export const DeleteQuestionSet: React.FC<IProps> = ({ account }) => {
  const { useDeleteQuestionSet } = useProgram();
  const deleteAccount = useDeleteQuestionSet(account.publicKey);

  const t = useTranslations('question-set');
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
