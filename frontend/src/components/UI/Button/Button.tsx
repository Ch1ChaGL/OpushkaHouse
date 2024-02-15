import { FC } from 'react';
import { Button as ButtonMUI } from '@mui/material';
import styles from './Button.module.css';

interface IButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<IButtonProps> = ({ text, onClick }) => {
  return (
    <div className={styles.container}>
      <ButtonMUI
        variant='outlined'
        color='info'
        onClick={onClick}
        sx={{
          padding: '5px 25px',
          color: '#fff', // Задаем цвет текста
          bgcolor: '#236092', // Задаем цвет фона
          '&:hover': {
            bgcolor: '#1a4970', // Задаем цвет фона при наведении
          },
        }}
      >
        {text}
      </ButtonMUI>
    </div>
  );
};

export default Button;
