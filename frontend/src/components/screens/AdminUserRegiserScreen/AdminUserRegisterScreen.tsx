import React, { useState } from 'react';
import styles from './AdminUserRegisterScreen.module.css';
import Button from '../../UI/Button/Button';
import { useUsers } from '../../../hooks/user/useUsers';
import Loader from '../../UI/Loader/Loader';
import UserCard from '../../UI/UserCard/UserCard';
import { MenuItem, Modal, Select } from '@mui/material';
import RegistrationForm from '../../UI/RegistrationForm/RegistrationForm';

const AdminUserRegisterScreen = () => {
  const { data, isFetching } = useUsers();

  const [filter, setFilter] = useState(-1); // Стейт для хранения текущего фильтра
  const [showModal, setShowModal] = useState(false); // Стейт для управления модальным окном

  const handleOpenModal = () => {
    setShowModal(true); // Открываем модальное окно
  };

  const handleCloseModal = () => {
    setShowModal(false); // Закрываем модальное окно
  };

  const handleChange = (event: any) => {
    setFilter(event.target.value);
  };

  // Функция для фильтрации пользователей по типу
  const filteredUsers = data.filter(user => {
    if (filter === -1) return true;
    return user.role.roleId === filter;
  });

  if (isFetching) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.createUserBtn}>
        <Button
          text='Зарегестрировать пользователя'
          onClick={() => handleOpenModal()}
        />
      </div>
      <div className={styles.select}>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={filter}
          onChange={handleChange}
        >
          <MenuItem value={-1}>Все</MenuItem>
          <MenuItem value={1}>Администраторы</MenuItem>
          <MenuItem value={2}>Горничные</MenuItem>
          <MenuItem value={3}>Хаусманы</MenuItem>
        </Select>
      </div>
      <ul className={styles.userList}>
        {filteredUsers.map(user => (
          <li key={user.userId}>
            <UserCard {...user} key={user.userId} />
          </li>
        ))}
      </ul>
      <div className={styles.userActivity}></div>
      <RegistrationForm
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default AdminUserRegisterScreen;
