'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';

import { QuestionSetsList } from './question-sets-list';

export const QuestionSets: React.FC = () => {
  const t = useTranslations('question-sets');

  return (
    <Container maxWidth="lg">
      <Toolbar disableGutters>
        <Typography variant="h5">{t('title')}</Typography>
        <Box flexGrow={1} />
        <Button
          variant="outlined"
          href="/question-sets/add"
          startIcon={<AddIcon />}
        >
          {t('add-set')}
        </Button>
      </Toolbar>

      <QuestionSetsList />
    </Container>
  );
};
