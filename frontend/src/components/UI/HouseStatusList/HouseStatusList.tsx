import React from 'react';
import styles from './HouseStatusList.module.css';
import { IHousemaidHouseInformation } from '../../../services/house/house.interface';
import HousemaidHouseStatusCard from '../HousemaidHouseStatusCard/HousemaidHouseStatusCard';

interface IHouseStatusListProps {
  type: 'admin' | 'housemaid' | 'houseman';
  data: IHousemaidHouseInformation[];
}

const HouseStatusList: React.FC<IHouseStatusListProps> = ({ type, data }) => {
  return (
    <div className={styles.list}>
      {type === 'housemaid' &&
        data.map(status => (
          <HousemaidHouseStatusCard {...status} key={status.houseId} />
        ))}
    </div>
  );
};

export default HouseStatusList;
