import React from 'react';
import { useHousemaidHouseStatus } from '../../../hooks/useHouseStatus';
import Loader from '../../UI/Loader/Loader';
import HouseStatusList from '../../UI/HouseStatusList/HouseStatusList';
import styles from './HousemaidHomeScreen.module.css';

const HousemaidHomeScreen = () => {
  const { data, isFetching } = useHousemaidHouseStatus();

  if (isFetching) return <Loader />;

  return (
    <div className={styles.container}>
      <HouseStatusList type='housemaid' data={data} />
    </div>
  );
};

export default HousemaidHomeScreen;
