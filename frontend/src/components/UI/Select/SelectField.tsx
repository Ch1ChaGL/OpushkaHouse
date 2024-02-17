import { FC } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import styles from './SelectField.module.css';

interface ISelectFieldProps {
  label: string;
  name: string;
  options: { value: string | number; label: string }[];
  error?: string;
  register: UseFormRegisterReturn;
  rules?: RegisterOptions;
}

const SelectField: FC<ISelectFieldProps> = ({
  label,
  options,
  error,
  register,
}) => {
  return (
    <FormControl
      fullWidth
      variant='outlined'
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
    >
      <InputLabel>{label}</InputLabel>
      <Select
        {...register}
        label={label}
        defaultValue={options[0].value}
        className={styles.select}
      >
        {options.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
            className={styles.menuItem}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <div className={styles.error}>{error}</div>}
    </FormControl>
  );
};

export default SelectField;
