/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

import { RootContainer } from './logo.styles';

export const Logo: React.FC = () => {
  return (
    <RootContainer>
      <Link href="/">
        <img src="/solana-logo.png" alt="Logo" height={24} />
      </Link>
    </RootContainer>
  );
};
