import React from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useProgram } from '@/hooks/useProgram';

export const QuestionsList: React.FC = () => {
  const { accounts, getProgramAccount } = useProgram();

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
    <div>
      {!accounts.data?.length ? (
        <Alert severity="success">
          <AlertTitle>No accounts</AlertTitle>
          No accounts found. Create one above to get started.
        </Alert>
      ) : (
        <List>
          {accounts.data.map((question) => (
            <ListItemButton
              key={question.publicKey.toString()}
              disableGutters
              href={`/questions/${question.publicKey.toString()}`}
            >
              <ListItemText>{question.account.text}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      )}
    </div>
  );
};
