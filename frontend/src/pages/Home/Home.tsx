import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import Loader from '../../components/UI/Loader/Loader';
import { UserRole } from '../../types/user/user.interaface';
import AdminHomeScreen from '../../components/screens/AdminHomeScreen/AdminHomeScreen';
import HousemaidHomeScreen from '../../components/screens/HousemaidHomeScreen/HousemaidHomeScreen';
import HousemanHomeScreen from '../../components/screens/HousemanHomeScreen/HousemanHomeScreen';
import styles from './Home.module.css';
import Header from '../../components/UI/Header/Header';
const Home = () => {
  const user = useTypedSelector(state => state.user);
  const { logout } = useActions();

  if (user.isLoading) return <Loader />;

  let roleComponent;
  switch (user.user?.roleId) {
    case UserRole.ADMIN:
      roleComponent = <AdminHomeScreen />;
      break;
    case UserRole.Housemaid:
      roleComponent = <HousemaidHomeScreen />;
      break;
    case UserRole.Houseman:
      roleComponent = <HousemanHomeScreen />;
      break;
    default:
      break;
  }

  return (
    <div className='container'>
      <div className={styles.container}>
        <div className={styles.content}>{roleComponent}</div>
      </div>
    </div>
  );
};

export default Home;
