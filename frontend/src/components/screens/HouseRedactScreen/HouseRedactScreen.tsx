import React from 'react';
import styles from './HouseRedactScreen.module.css';
import { IHouseInformation } from '../../../services/house/house.interface';

const HouseRedactScreen: React.FC<IHouseInformation> = data => {
  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>{}</div>
      <div className={styles.housemaidStatus}></div>
    </div>
  );
};

export default HouseRedactScreen;
