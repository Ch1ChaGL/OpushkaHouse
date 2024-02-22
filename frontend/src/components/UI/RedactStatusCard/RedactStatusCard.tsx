import React, { FC } from 'react';
import styles from './RedactStatusCard.module.css';
import { IHouseStatus } from '../../../services/house/house.interface';
import { Card, MenuItem, TextField } from '@mui/material';
import { useStatusByPlaceId } from '../../../hooks/useHouseStatus';
import Loader from '../Loader/Loader';
import { IStatusUpdate } from '../../../services/status/status.interface';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Title } from '@mui/icons-material';
import {
  DatePicker,
  DateTimeField,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '../Button/Button';

const RedactStatusCard: FC<IHouseStatus> = status => {
  const { data, isFetching } = useStatusByPlaceId(status.place.placeId);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IStatusUpdate>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IStatusUpdate> = data => {
    console.log(data);
  };

  if (isFetching) return <Loader />;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "yyyy-MM-dd'T'HH:mm");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card variant='outlined' className={styles.card}>
        <div className={styles.container}>
          <div className={styles.title}>{status.place.name}</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.field}>
              <Controller
                name='statusId'
                control={control}
                defaultValue={status.statusId} // Значение по умолчанию из status
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label='Статус'
                    variant='outlined'
                    fullWidth
                    id='statusId'
                  >
                    {data.map(item => (
                      <MenuItem key={item.statusId} value={item.statusId}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </div>
            <div className={styles.field}>
              <Controller
                name='timeStart'
                control={control}
                defaultValue={
                  status.timeStart ? formatDate(status.timeStart) : ''
                } // Значение по умолчанию из status
                render={({ field }) => (
                  <TextField
                    id='timeStart'
                    InputLabelProps={{ shrink: true }}
                    label={'Время начала'} // Сделать label видимым
                    {...field}
                    type='datetime-local'
                    variant='outlined'
                    fullWidth
                  />
                )}
              />
            </div>
            <div className={styles.field}>
              <Controller
                name='timeEnd'
                control={control}
                defaultValue={status.timeEnd ? formatDate(status.timeEnd) : ''} // Значение по умолчанию из status
                render={({ field }) => (
                  <TextField
                    id='timeEnd'
                    {...field}
                    label={'Время окончания'}
                    InputLabelProps={{ shrink: true }}
                    type='datetime-local'
                    variant='outlined'
                    fullWidth
                  />
                )}
              />
            </div>
            <Button type='submit' text='Сохранить' />
          </form>
        </div>
      </Card>
    </LocalizationProvider>
  );
};

export default RedactStatusCard;
