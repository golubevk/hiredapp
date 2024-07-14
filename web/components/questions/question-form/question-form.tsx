'use client';

import React, { useMemo, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { DeleteQuestion } from './delete-question';

import { useProgram } from '@/hooks/useProgram';

import { Route } from '@/interfaces/routes';

import { QuestionAccount } from '@/interfaces/question';

interface IProps {
  data?: QuestionAccount;
}

export const QuestionForm: React.FC<IProps> = (props) => {
  const { data } = props;

  const init = useMemo(() => {
    const output = { id: nanoid(), text: '' };

    if (data?.account) {
      output.text = data.account.text;
      output.id = data.account.id;
    }

    return output;
  }, [data]);

  const { push } = useRouter();
  const t = useTranslations('question-form');
  const { publicKey } = useWallet();

  const { createQuestion, updateQuestion } = useProgram();

  const [value, setValue] = useState(init.text);

  const isFormValid = useMemo(() => value.trim() !== '', [value]);

  const handler = useMemo(
    () => (data ? updateQuestion : createQuestion),
    [data, updateQuestion, createQuestion]
  );

  const handleCancel = () => push(`/${Route.QUESTIONS}`);

  const handleSubmit = () => {
    if (!(publicKey && isFormValid)) return;

    handler.mutateAsync({
      id: init.id,
      text: value,
      owner: publicKey,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          name="text"
          defaultValue={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </Grid>
      <Grid container item xs={12} justifyContent="end">
        {data && <DeleteQuestion account={data} />}
        <Box flexGrow={1} />
        <Button disabled={!isFormValid} onClick={handleCancel}>
          {t('cancel')}
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          {t('submit')}
        </Button>
      </Grid>
    </Grid>
  );
};
