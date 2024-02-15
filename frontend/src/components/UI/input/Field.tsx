import { FC } from 'react';
import { IField } from './field.interface';
import styles from './Field.module.css';
import ReactInputMask from 'react-input-mask';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import TextMaskCustom from './TextMaskCustom';

const Field: FC<IField> = (
  { error, className, type = 'text', text, mask = '', ...rest },
  ref,
) => {
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
            borderColor: '#236092',
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
        className={className}
        id='outlined-adornment-input'
        type={type}
        inputComponent={props => (
          <TextMaskCustom
            {...props}
            {...rest}
            inputRef={inputElement =>
              props.inputRef && props.inputRef(inputElement)
            }
          />
        )}
        label={text}
      />
      {error && <div className={styles.error}>{error}</div>}
    </FormControl>
  );
};

export default Field;
