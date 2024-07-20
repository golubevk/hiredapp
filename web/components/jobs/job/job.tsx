import React, { useMemo, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { nanoid } from 'nanoid';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { useProgram } from '@/hooks/useProgram';

import { DeleteJob } from './delete-job';
import { QuestionSet } from './question-set';

import { Route } from '@/interfaces/routes';
import type { IJob, JobAccount } from '@/interfaces/job';

interface IProps {
  data?: JobAccount;
}

export const Job: React.FC<IProps> = ({ data }) => {
  const t = useTranslations('job');
  const { push } = useRouter();

  const init = useMemo(() => {
    const output: Omit<IJob, 'owner'> = {
      id: nanoid(),
      title: '',
      questionSet: '',
    };

    if (data?.account) {
      output.title = data.account.title;
      output.id = data.account.id;
      output.questionSet = data.account.questionSet;
    }

    return output;
  }, [data]);

  const { publicKey } = useWallet();
  const { createJob, updateJob } = useProgram();

  const [title, setTitle] = useState(init.title);
  const [questionSet, setQuestionSet] = useState(init.questionSet);

  const isSetValid = useMemo(
    () => title.trim() !== '' && questionSet,
    [title, questionSet]
  );

  const handler = useMemo(
    () => (data ? updateJob : createJob),
    [data, updateJob, createJob]
  );

  const handleChangeQuestionSet = (value: string) => {
    setQuestionSet(value);
  };

  const handleCancel = () => push(`/${Route.JOBS}`);

  const handleSubmit = () => {
    if (!(publicKey && isSetValid)) return;

    handler.mutateAsync({
      id: init.id,
      title,
      owner: publicKey,
      questionSet,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          name="title"
          defaultValue={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <QuestionSet onChange={handleChangeQuestionSet} value={questionSet} />
      </Grid>
      <Grid container item xs={12} justifyContent="end">
        {data && <DeleteJob account={data} />}
        <Box flexGrow={1} />
        <Button onClick={handleCancel}>{t('cancel')}</Button>
        <Button
          variant="contained"
          type="submit"
          disabled={!isSetValid}
          onClick={handleSubmit}
        >
          {t('submit')}
        </Button>
      </Grid>
    </Grid>
  );
};
