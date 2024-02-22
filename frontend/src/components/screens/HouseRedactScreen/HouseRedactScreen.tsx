import React from 'react';
import styles from './HouseRedactScreen.module.css';
import { IHouseInformation } from '../../../services/house/house.interface';
import RedactStatusCard from '../../UI/RedactStatusCard/RedactStatusCard';

const HouseRedactScreen: React.FC<IHouseInformation> = data => {
  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>
        <div className={styles.houseId}>{data.houseId}</div>
        <div className={styles.houseInformation}>
          <div className={styles.houseName}>
            Тип дома: {data.houseType.name}
          </div>
          <div className={styles.houseCountPeople}>
            Количество людей: {data.peopleCount}
          </div>
        </div>
      </div>
      <div className={styles.housemaidStatus}>
        {data.status.map(status => (
          <RedactStatusCard
            {...status}
            key={status.statusId}
            houseId={data.houseId}
          />
        ))}
      </div>
    </div>
  );
};

export default HouseRedactScreen;
