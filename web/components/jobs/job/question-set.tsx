import React, { useEffect } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useProgram } from '@/hooks/useProgram';

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

export const QuestionSet: React.FC<IProps> = ({ onChange, value }) => {
  const { questionSets: accounts, getProgramAccount } = useProgram();

  const handleChange = (event: SelectChangeEvent) =>
    onChange(event.target.value);

  useEffect(() => {
    if (!value && accounts.data?.length)
      onChange(accounts.data[0].publicKey.toString());
  }, [accounts.data, value, onChange]);

  if (getProgramAccount.isLoading) return null;

  if (!getProgramAccount.data?.value) {
    return (
      <Alert severity="error">
        Program account not found. Make sure you have deployed the program and
        are on the correct cluster
      </Alert>
    );
  }

  if (accounts.isLoading) return null;

  if (!accounts.data?.length) {
    return (
      <Alert severity="success">
        <AlertTitle>No accounts</AlertTitle>
        No accounts found. Create one above to get started.
      </Alert>
    );
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-standard-label">
        Question set
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={handleChange}
        label="Question set"
      >
        {accounts.data.map((set) => (
          <MenuItem
            key={set.publicKey.toString()}
            value={set.publicKey.toString()}
          >
            {set.account.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
