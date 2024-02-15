import { FC, useEffect, useRef } from 'react';
import { IField } from './field.interface';
import styles from './Field.module.css';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import IMask from 'imask';

const Field: FC<IField> = ({
  error,
  className,
  type = 'text',
  text,
  mask = '',
  register,
  ...rest
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && mask) {
      const maskInstance = IMask(inputRef.current, {
        mask,
      });

      return () => {
        maskInstance.destroy();
      };
    }
  }, [mask]);

  return (
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
            borderColor: '#3f88c4',
            borderWidth: '3.5px', // Задание толщины обводки при фокусировке
          },
        '& .MuiIconButton-root': {
          color: '#236092', // Задание цвета для кнопки
        },
      }}
      variant='outlined'
    >
      <InputLabel htmlFor='outlined-adornment-input'>{text}</InputLabel>
      <OutlinedInput
        {...rest}
        {...register}
        id='outlined-adornment-input'
        type={type}
        label={text}
        placeholder={rest.placeholder}
        inputRef={inputRef}
      />
      {error && <div className={styles.error}>{error}</div>}
    </FormControl>
  );
};

export default Field;
