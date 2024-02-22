import { LocalizationProvider } from '@mui/x-date-pickers';
import React, { FC } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from 'react-hook-form';

const DateTimePicker: FC = ({ label, field, ...rest }: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={field.name}
        control={field.control}
        defaultValue={field.defaultValue}
        render={({ field }) => (
          <DateTimePicker {...field} label={label} {...rest} />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
