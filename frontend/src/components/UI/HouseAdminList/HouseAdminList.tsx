import React from 'react';
import styles from './HouseAdminList.module.css';
import { useAdminHouseStatus } from '../../../hooks/useHouseStatus';
import Loader from '../Loader/Loader';
import HouseAdminCard from '../HouseAdminCard/HouseAdminCard';
import ExcelFileUploader from '../ExcelFileUploader/ExcelFileUploader';

const HouseAdminList = () => {
  const { data, isFetching } = useAdminHouseStatus();
  if (isFetching) return <Loader />;

  return (
    <div className={styles.container}>
      <ExcelFileUploader />
      {data.map(house => (
        <HouseAdminCard {...house} key={house.houseId} />
      ))}
    </div>
  );
};

export default HouseAdminList;
