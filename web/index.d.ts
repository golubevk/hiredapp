import { Theme as ThemeMui } from '@mui/material';
import en from './messages/en.json';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PROGRAM_ID: string;
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IntlMessages extends Messages {}
}

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ThemeMui {}
}
