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
      <ButtonMUI variant='outlined' color='info' onClick={onClick}>
        {text}
      </ButtonMUI>
    </div>
  );
};

export default Button;
