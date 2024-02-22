import React from 'react';
import HouseStatusList from '../../UI/HouseStatusList/HouseStatusList';
import styles from './HousemanHomeScreen.module.css';
import { useHousemanHouseStatus } from '../../../hooks/useHouseStatus';
import Loader from '../../UI/Loader/Loader';

const HousemanHomeScreen = () => {
  const { data, isFetching } = useHousemanHouseStatus();

  if (isFetching) return <Loader />;

  return (
    <div className={styles.container}>
      <HouseStatusList data={data} type='houseman'/>
    </div>
  );
};

export default HousemanHomeScreen;
