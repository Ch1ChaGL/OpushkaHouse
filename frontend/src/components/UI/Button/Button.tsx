import { FC } from 'react';
import { Button as ButtonMUI } from '@mui/material';
import styles from './Button.module.css';

interface IButtonProps {
  text: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color?: string;
  hover?: string;
}

const Button: FC<IButtonProps> = ({ text, onClick, type, color, hover }) => {
  return (
    <div className={styles.container}>
      <ButtonMUI
        variant='outlined'
        color='info'
        onClick={onClick}
        sx={{
          padding: '5px 25px',
          color: '#fff', // Задаем цвет текста
          bgcolor: `${color ? color : '#236092'}`, // Задаем цвет фона
          '&:hover': {
            bgcolor: `${hover ? hover : '#1a4970'}`, // Задаем цвет фона при наведении
          },
        }}
        type={type}
      >
        {text}
      </ButtonMUI>
    </div>
  );
};

export default Button;
