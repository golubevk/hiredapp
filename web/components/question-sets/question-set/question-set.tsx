import React, { useMemo, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { nanoid } from 'nanoid';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { DeleteQuestionSet } from './delete-question-set';
import { Questions } from './questions';

import { useProgram } from '@/hooks/useProgram';

import { Route } from '@/interfaces/routes';
import { QuestionSetAccount, IQuestionSet } from '@/interfaces/question-set';

interface IProps {
  data?: QuestionSetAccount;
}

export const QuestionSet: React.FC<IProps> = ({ data }) => {
  const t = useTranslations('question-set');
  const { push } = useRouter();

  const { publicKey } = useWallet();
  const { createQuestionSet, updateQuestionSet } = useProgram();

  const init = useMemo(() => {
    const output: Omit<IQuestionSet, 'owner'> = {
      id: nanoid(),
      title: '',
      questions: [],
    };

    if (data?.account) {
      output.title = data.account.title;
      output.id = data.account.id;
      output.questions = data.account.questions;
    }

    return output;
  }, [data]);

  const [value, setValue] = useState(init.title);
  const [questions, setQuestions] = useState<string[]>(init.questions);

  const isSetValid = useMemo(() => value.trim() !== '', [value]);

  const handler = useMemo(
    () => (data ? updateQuestionSet : createQuestionSet),
    [data, updateQuestionSet, createQuestionSet]
  );

  const handleChangeQuestions = (nextSelected: string[]) => {
    setQuestions(nextSelected);
  };

  const handleCancel = () => push(`/${Route.SETS}`);

  const handleSubmit = () => {
    if (!(publicKey && isSetValid)) return;

    handler.mutateAsync({
      id: init.id,
      title: value,
      owner: publicKey,
      questions,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          name="title"
          defaultValue={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Questions selected={questions} onChange={handleChangeQuestions} />
      </Grid>
      <Grid container item xs={12} justifyContent="end">
        {data && <DeleteQuestionSet account={data} />}
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
