import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Login.module.css';
import { ILoginData } from '../../../store/user/user.interface';
import Field from '../../UI/input/Field';
import { Button } from '@mui/material';
import PasswordInput from '../../UI/InputMui/PasswordInput/PasswordInput';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ILoginData> = data => {
    console.log('asdasds');
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
            <Field
              text=''
              type='text'
              placeholder='Номер телефона'
              {...register('phone', {
                pattern: {
                  value: /^\+7\d{10}$/,
                  message: 'Формат номера не верный',
                },
                required: 'Номер обязательное поле',
              })}
              error={errors.phone?.message}
            />

            <PasswordInput
              register={register('password', {
                minLength: {
                  value: 6,
                  message: 'Пароль должен быть больше 6 символов',
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
        </form>
      </div>
    </div>
  );
};

export default Login;
