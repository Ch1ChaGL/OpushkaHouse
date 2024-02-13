import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React from 'react';
import styles from './PasswordInput.module.css';
import { UseFormRegisterReturn } from 'react-hook-form';

interface PasswordInputProps {
  error?: string;
  register: UseFormRegisterReturn; // Типизируйте ошибку в соответствии с вашими потребностями
  // Другие пропсы, если они присутствуют
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  error,
  register,
  ...rest
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl
        sx={{
          width: '100%',
          '& .MuiInputLabel-root': {
            color: '#236092', // Задание цвета для метки
          },
          '& .MuiInputBase-root': {
            color: '#236092', // Задание цвета для текста в поле ввода
          },
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#236092', // Задание цвета обводки
            borderWidth: '3.5px',
            borderRadius: '10px', // Задание толщины обводки
          },
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#236092',
            borderWidth: '3.5px',
            // Задание цвета обводки при наведении мыши
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              borderColor: '#236092',
              borderWidth: '3.5px', // Задание толщины обводки при фокусировке
            },
          '& .MuiIconButton-root': {
            color: '#236092', // Задание цвета для кнопки
          },
        }}
        variant='outlined'
      >
        <InputLabel htmlFor='outlined-adornment-password'>Пароль</InputLabel>
        <OutlinedInput
          {...rest}
          {...register}
          id='outlined-adornment-password'
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label='Пароль'
        />
      </FormControl>
      {error && <div className={styles.error}>{error}</div>}
    </>
  );
};

export default PasswordInput;
