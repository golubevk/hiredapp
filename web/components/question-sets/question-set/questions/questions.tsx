import React from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useProgram } from '@/hooks/useProgram';

interface IProps {
  selected: string[];
  onChange: (value: string[]) => void;
}

export const Questions: React.FC<IProps> = ({ selected, onChange }) => {
  const { questions: accounts, getProgramAccount } = useProgram();

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

  const handleChange = (value: string) => {
    const nextSelected = selected.some((i) => i === value)
      ? selected.filter((s) => s !== value)
      : [...selected, value];

    onChange(nextSelected);
  };

  return (
    <List>
      {accounts.data.map((question) => {
        const key = question.publicKey.toString();
        const selectedItem = selected.some((s) => s === key);
        return (
          <ListItemButton
            key={key}
            disableGutters
            selected={selectedItem}
            onClick={() => handleChange(key)}
          >
            <ListItemText>{question.account.text}</ListItemText>
          </ListItemButton>
        );
      })}
    </List>
  );
};
