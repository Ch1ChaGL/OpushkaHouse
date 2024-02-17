import React, { useState } from 'react';
import { IUserResponse } from '../../../services/user/user.interface';
import { Card, CardContent, Typography } from '@mui/material';
import Button from '../Button/Button';
import styles from './UserCard.module.css';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useUserDelete } from '../../../hooks/user/useUser';

const UserCard: React.FC<IUserResponse> = ({
  firstName,
  lastName,
  phone,
  role,
  userId,
}) => {
  const { user } = useTypedSelector(state => state.user);

  const mutate = useUserDelete();
  return (
    <Card variant='outlined' className={styles.card}>
      <CardContent>
        <Typography variant='h5' component='h2'>
          {firstName} {lastName}
        </Typography>
        <Typography color='textSecondary' gutterBottom>
          Роль: {role.name}
        </Typography>
        <Typography variant='body2' component='p'>
          Телефон: {phone}
        </Typography>
        {user?.userId !== userId && (
          <div className={styles.btn}>
            <Button text='Удалить' onClick={() => mutate.mutate(userId)} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
