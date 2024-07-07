'use client';

import React, { type PropsWithChildren } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import { Logo } from '@/components/logo';
import { WalletButton } from '@/components/solana/solana-provider';
import { RootContainer } from './app-layout.styles';

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <RootContainer>
      <AppBar position="static" color="default">
        <Toolbar>
          <Logo />
          <Box flexGrow={1} />
          <WalletButton />
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </RootContainer>
  );
};
