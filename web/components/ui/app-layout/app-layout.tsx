'use client';

import React, { type PropsWithChildren } from 'react';

import { Toaster } from 'react-hot-toast';

import Container from '@mui/material/Container';

import { AccountChecker } from '@/components/account/account-ui';
import { ClusterChecker } from '@/components/cluster/cluster-ui';

import { AppBar } from './app-bar';
import { RootContainer } from './app-layout.styles';

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <RootContainer>
      <AppBar />
      <Container>
        <ClusterChecker>
          <AccountChecker />
        </ClusterChecker>

        {children}
      </Container>

      <Toaster position="bottom-right" />
    </RootContainer>
  );
};
