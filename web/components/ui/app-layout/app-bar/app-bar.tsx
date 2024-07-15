import React from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { Logo } from '@/components/logo';
import { WalletButton } from '@/components/solana/solana-provider';

import { Menu } from './menu';
import { RootContainer } from './app-bar.styles';

export const AppBar: React.FC = () => {
  return (
    <RootContainer>
      <Toolbar>
        <Logo />
        <Menu />
        <Box flexGrow={1} />
        <WalletButton />
      </Toolbar>
    </RootContainer>
  );
};
