import React, { useState } from 'react';
import styles from './RegistrationForm.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserCreate } from '../../../services/user/user.interface';
import Field from '../input/Field';
import { Modal } from '@mui/material';
import Button from '../Button/Button';
import SelectField from '../Select/SelectField';
import { useUser } from '../../../hooks/user/useUser';
import Alert from '../Alert/Alert';

interface RegistrationFormProps {
  showModal: boolean; // Пропс для отображения модального окна
  handleCloseModal: () => void; // Пропс для закрытия модального окна
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  showModal,
  handleCloseModal,
}) => {
  const [errorPopup, setErrorPopup] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const onSuccess = () => {
    reset();
    handleCloseModal(); // Закрытие модального окна после отправки формы
  };

  const onError = (error: any) => {
    reset();
    setErrorPopup(error);
  };

  const mutate = useUser(onError, onSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserCreate>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IUserCreate> = data => {
    data.roleId = +data.roleId;
    mutate.mutate(data);
  };

  const handlePopupClose = () => {
    setErrorPopup(null);
    // Assuming you have a clearError action in your useActions hook
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
            <SelectField
              register={register('roleId', {
                required: 'Роль обязательное поле',
              })}
              label='Роль'
              name='Роль'
              options={[
                { value: 1, label: 'Администратор' },
                { value: 2, label: 'Горничная' },
                { value: 3, label: 'Хаусмен' },
              ]}
              error={errors.roleId?.message}
            />
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
        {errorPopup && (
          <Alert
            type='error'
            title='Ошибка'
            description={errorPopup.message}
            open={Boolean(errorPopup)}
            onClose={handlePopupClose}
          />
        )}
      </div>
    </Modal>
  );
};

export default RegistrationForm;
