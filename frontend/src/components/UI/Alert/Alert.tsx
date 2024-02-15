import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert as AlertMUI, AlertTitle } from '@mui/material';

interface AlertProps {
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  description,
  open,
  onClose,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <AlertMUI onClose={onClose} severity={type}>
        <AlertTitle>{title}</AlertTitle>
        {description}
      </AlertMUI>
    </Snackbar>
  );
};

export default Alert;
