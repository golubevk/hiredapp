import { createElement } from 'react';

import AppBarMui, { AppBarProps } from '@mui/material/AppBar';

export const RootContainer = (props: AppBarProps) =>
  createElement(AppBarMui, { ...props, position: 'static', color: 'default' });
