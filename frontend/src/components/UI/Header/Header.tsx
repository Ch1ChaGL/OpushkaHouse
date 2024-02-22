import styles from './Header.module.css';
import Button from '../Button/Button';
import { useWorkShift } from '../../../hooks/useWorkShift';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useUserWorkShiftInformation } from '../../../hooks/user/useUserWorkShiftInformation';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const workShift = useWorkShift();
  const { logout } = useActions();
  const { user } = useTypedSelector(state => state.user);
  const userInf = useUserWorkShiftInformation(user);
  const navigate = useNavigate();

  return (
    <div className={styles.container__header}>
      <div className={styles['container__row']}>
        <div className={styles.information}>
          <div
            className={styles['container__img']}
            onClick={() => navigate('/')}
          >
            <img src='/img/logo.png' alt='logo' />
          </div>
          <div className={styles.workShiftInformation}>
            <div className={styles['container__date']}>{workShift}</div>
            <div className={styles['container__user']}>{userInf}</div>
          </div>
        </div>
        <div className={styles.btns}>
          <Button text='Выйти' onClick={() => logout()} />
        </div>
      </div>
    </div>
  );
};

export default Header;
