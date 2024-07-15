import styled from '@emotion/styled';
import NextLink from 'next/link';

import ListMui from '@mui/material/List';

export const List = styled(ListMui)(({ theme }) => ({
  display: 'inline-flex',
  marginLeft: theme.spacing(2),
}));

export const Link = styled(NextLink)(({ theme }) => ({
  marginRight: theme.spacing(4),
  minWidth: 'max-content',
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 400,
  color: theme.palette.common.white,
  textAlign: 'center',
  textDecoration: 'none',

  ['&:last-child']: {
    marginRight: 0,
  },
}));
