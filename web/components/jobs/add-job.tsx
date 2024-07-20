'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Job } from './job';

export const AddJob: React.FC = () => {
  const t = useTranslations('add-job');

  return (
    <Container maxWidth="lg">
      <Toolbar disableGutters>
        <Typography variant="h5">{t('title')}</Typography>
      </Toolbar>

      <Job />
    </Container>
  );
};
