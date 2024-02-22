import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert as AlertMUI, AlertTitle } from '@mui/material';

interface AlertProps {
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
  color?: string;
}

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  description,
  open,
  onClose,
  color = '#e84900',
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      sx={{ color: color }}
    >
      <AlertMUI onClose={onClose} severity={type} sx={{ color: color }}>
        <AlertTitle>{title}</AlertTitle>
        {description}
      </AlertMUI>
    </Snackbar>
  );
};

export default Alert;
