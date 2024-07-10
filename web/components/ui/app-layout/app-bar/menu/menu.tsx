import React from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import ListItem from '@mui/material/ListItem';

import { Route } from '@/interfaces/routes';

import { Link, List } from './menu.styles';

const pages = [Route.ACCOUNT, Route.CLUSTERS];

export const Menu: React.FC = () => {
  const pathname = usePathname();
  const t = useTranslations('menu');

  return (
    <List>
      {pages.map((page) => (
        <ListItem key={page} selected={pathname.startsWith(`/${page}`)}>
          <Link key={page} href={`/${page}`}>
            {t(page)}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
