import React from 'react';
import { useTranslations } from 'next-intl';

import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { QuestionForm } from './question-form';

export const AddQuestion: React.FC = () => {
  const t = useTranslations('add-question');

  return (
    <Container maxWidth="lg">
      <Toolbar disableGutters>
        <Typography variant="h5">{t('title')}</Typography>
      </Toolbar>

      <QuestionForm />
    </Container>
  );
};
