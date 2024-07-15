'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { QuestionSet } from './question-set';

export const AddQuestionSet: React.FC = () => {
  const t = useTranslations('add-question-set');

  return (
    <Container maxWidth="lg">
      <Toolbar disableGutters>
        <Typography variant="h5">{t('title')}</Typography>
      </Toolbar>

      <QuestionSet />
    </Container>
  );
};
