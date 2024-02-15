import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Login.module.css';
import { ILoginData } from '../../../store/user/user.interface';
import Field from '../../UI/input/Field';
import { Button } from '@mui/material';
import PasswordInput from '../../UI/InputMui/PasswordInput/PasswordInput';
import { useActions } from '../../../hooks/useActions';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import Alert from '../../UI/Alert/Alert';

const Login = () => {
  const [errorPopup, setErrorPopup] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const { login, clearError } = useActions();
  const navigate = useNavigate();
  const user = useTypedSelector(state => state.user);

  useEffect(() => {
    if (user.user) navigate('/', { replace: true });

    if (user.error !== null) {
      setErrorPopup({ title: 'Произошла ошибка', message: user.error });
      clearError();
    }
  }, [user, navigate]);

  const handlePopupClose = () => {
    setErrorPopup(null);
    // Assuming you have a clearError action in your useActions hook
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ILoginData> = data => {
    login(data);
    reset();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <div className={styles.logo}>
          <img src='/img/logo.png' alt='logo' />
          <div className={styles.title}>Opushka House</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.fields}>
            <div className={styles.tel}>
              <Field
                className={styles.tel}
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
            </div>

            <PasswordInput
              register={register('password', {
                minLength: {
                  value: 5,
                  message: 'Пароль должен быть больше 5 символов',
                },
                required: 'Пароль обязательное поле',
              })}
              error={errors.password?.message}
            />
          </div>

          <div className={styles.submit}>
            <Button
              type='submit'
              variant='contained'
              sx={{
                maxWidth: '150px',
                borderRadius: '8px',
                width: '100%',
                backgroundColor: '#236092', // Задаем цвет фона
                color: '#fff', // Задаем цвет текста
                '&:hover': {
                  backgroundColor: '#1a4970', // Задаем цвет фона при наведении
                },
              }}
            >
              Войти
            </Button>
          </div>
          {errorPopup && (
            <Alert
              type='error'
              title='Ошибка'
              description={errorPopup.message}
              open={Boolean(errorPopup)}
              onClose={handlePopupClose}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
