import React from 'react';
import { IUserResponse } from '../../../services/user/user.interface';
import { Card, CardContent, Typography } from '@mui/material';
import Button from '../Button/Button';
import styles from './UserCard.module.css';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const UserCard: React.FC<IUserResponse> = ({
  firstName,
  lastName,
  phone,
  role,
  userId,
}) => {
  const { user } = useTypedSelector(state => state.user);

  return (
    <Card variant='outlined'>
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
            <Button text='Удалить' />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
