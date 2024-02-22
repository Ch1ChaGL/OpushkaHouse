import React, { FC, useState } from 'react';
import styles from './RedactStatusCard.module.css';
import { IHouseStatus } from '../../../services/house/house.interface';
import { Card, MenuItem, TextField } from '@mui/material';
import {
  useHouseStatusMutate,
  useStatusByPlaceId,
} from '../../../hooks/useHouseStatus';
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
import Alert from '../Alert/Alert';

interface IRedactStatusCardProps extends IHouseStatus {
  houseId: number;
}

const RedactStatusCard: FC<IRedactStatusCardProps> = status => {
  const { data, isFetching } = useStatusByPlaceId(status.place.placeId);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
  } = useForm<IStatusUpdate>({
    mode: 'onChange',
  });

  const mutate = useHouseStatusMutate(() => setSuccess(true));

  const onSubmit: SubmitHandler<IStatusUpdate> = value => {
    const updateObject: IStatusUpdate = {
      houseId: status.houseId,
      placeId: status.place.placeId,
      statusId: value.statusId,
      updateTime: true,
      timeStart: value.timeStart ? value.timeStart : null,
      timeEnd: value.timeEnd ? value.timeEnd : null,
    };
    if (
      value.timeStart &&
      value.timeEnd &&
      new Date(value.timeStart) > new Date(value.timeEnd)
    ) {
      // Устанавливаем ошибку в объекте errors
      setError('timeStart', {
        type: 'manual',
        message: 'Время начала не может быть позже времени окончания',
      });
      return; // Прерываем отправку формы
    }
    mutate.mutate(updateObject);
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
            <div className={styles.error}>{errors.timeStart?.message}</div>
            <div className={styles.btns}>
              <Button type='submit' text='Сохранить' />
              <Button
                text='Сбросить'
                onClick={() => reset()}
                color={'#e84900'}
                hover={'#ad3802'}
              />
            </div>
            {success && (
              <Alert
                type='success'
                title='Успех'
                description='Информация успешно сохранена'
                open={success}
                color='#28a745'
                onClose={() => setSuccess(false)}
              />
            )}
          </form>
        </div>
      </Card>
    </LocalizationProvider>
  );
};

export default RedactStatusCard;
