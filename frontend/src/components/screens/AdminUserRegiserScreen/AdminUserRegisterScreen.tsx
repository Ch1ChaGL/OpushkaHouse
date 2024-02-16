import React from 'react';
import styles from './AdminUserRegisterScreen.module.css';
import Button from '../../UI/Button/Button';
import { useUsers } from '../../../hooks/user/useUsers';
import Loader from '../../UI/Loader/Loader';
import UserCard from '../../UI/UserCard/UserCard';

const AdminUserRegisterScreen = () => {
  const { data, isFetching } = useUsers();

  if (isFetching) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.createUserBtn}>
        <Button text='Зарегестрировать пользователя' />
      </div>
      <ul className={styles.userList}>
        {data.map(user => (
          <li key={user.userId}>
            <UserCard {...user} key={user.userId} />
          </li>
        ))}
      </ul>
      <div className={styles.userActivity}></div>
    </div>
  );
};

export default AdminUserRegisterScreen;
