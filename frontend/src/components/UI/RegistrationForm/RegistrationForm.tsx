import React from 'react';
import styles from './RegistrationForm.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserCreate } from '../../../services/user/user.interface';
import Field from '../input/Field';
import { Modal, Box, TextField, MenuItem } from '@mui/material';
import Button from '../Button/Button';

interface RegistrationFormProps {
  showModal: boolean; // Пропс для отображения модального окна
  handleCloseModal: () => void; // Пропс для закрытия модального окна
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  showModal,
  handleCloseModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserCreate>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IUserCreate> = data => {
    console.log(data); // Обработка отправки формы
    handleCloseModal(); // Закрытие модального окна после отправки формы
  };

  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.fields}>
            <Field
              mask='+{7}0000000000'
              text='Номер телефона'
              type='tel'
              placeholder='+7(000)000-00-00'
              register={register('phone', {
                required: 'Номер обязательное поле',
                pattern: {
                  value: /^\+7\d{10}$/,
                  message: 'Формат номера не верный',
                },
              })}
              error={errors.phone?.message}
            />
            <Field
              text='Имя'
              register={register('firstName', {
                required: 'Имя обязательное поле',
              })}
              error={errors.firstName?.message}
            />
            <Field
              text='Фамилия'
              register={register('lastName', {
                required: 'Фамилия обязательное поле',
              })}
              error={errors.lastName?.message}
            />
            <Field
              text='Пароль'
              register={register('password', {
                required: 'Пароль обязательное поле',
                minLength: {
                  value: 5,
                  message: 'Пароль должен быть больше 5 символов',
                },
              })}
              error={errors.password?.message}
            />
            <TextField
              select
              label='Роль'
              variant='outlined'
              fullWidth
              {...register('roleId', { required: true })}
            >
              <MenuItem value={1}>Администратор</MenuItem>
              <MenuItem value={2}>Горничная</MenuItem>
              <MenuItem value={3}>Хаусмен</MenuItem>
            </TextField>
          </div>
          <div className={styles.btn}>
            <Button type='submit' text='Создать' />
            <Button
              text='Закрыть'
              onClick={() => handleCloseModal()}
              color={'#e84900'}
              hover={'#ad3802'}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RegistrationForm;
