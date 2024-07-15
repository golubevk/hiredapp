import { createElement } from 'react';

import GridMui, { GridProps } from '@mui/material/Grid';

export const RootContainer = (props: GridProps) =>
  createElement(GridMui, { ...props, container: true, spacing: 2 });
