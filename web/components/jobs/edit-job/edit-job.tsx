'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';

import { useTranslations } from 'next-intl';
import { PublicKey } from '@solana/web3.js';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Job } from './job';

export const EditJob: React.FC = () => {
  const t = useTranslations('edit-job');
  const params = useParams<{ address: string }>();

  const address = useMemo(() => {
    if (!params.address) {
      return;
    }
    try {
      return new PublicKey(params.address);
    } catch (e) {
      console.log(`Invalid public key`, e);
    }
  }, [params]);

  if (!address) {
    return <div>Error loading account</div>;
  }

  return (
    <Container maxWidth="lg">
      <Toolbar disableGutters>
        <Typography variant="h5">{t('title')}</Typography>
        <Box flexGrow={1} />
      </Toolbar>

      <Job address={address} />
    </Container>
  );
};
