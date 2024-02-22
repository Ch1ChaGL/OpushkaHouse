import React, { FC } from 'react';
import styles from './RedactStatusCard.module.css';
import { IHouseStatus } from '../../../services/house/house.interface';
import { Card } from '@mui/material';
import { useStatusByPlaceId } from '../../../hooks/useHouseStatus';
import Loader from '../Loader/Loader';
import { IStatusUpdate } from '../../../services/status/status.interface';
import { useForm } from 'react-hook-form';

const RedactStatusCard: FC<IHouseStatus> = status => {
  const { data, isFetching } = useStatusByPlaceId(status.place.placeId);

  if (isFetching) return <Loader />;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IStatusUpdate>({
    mode: 'onChange',
  });

  return (
    <Card variant='outlined' className={styles.card}>
      <div className={styles.container}>
        <div className={styles.title}>{status.place.name}</div>
        <form>
            
        </form>
      </div>
    </Card>
  );
};

export default RedactStatusCard;
