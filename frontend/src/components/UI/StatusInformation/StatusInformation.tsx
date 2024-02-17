import { FC } from 'react';
import styles from './StatusInformation.module.css';
import { useTimeInterval } from '../../../hooks/useAdditionalHouseInformation';
import { IHouseStatus } from '../../../services/house/house.interface';

const StatusInformation: FC<IHouseStatus> = ({
  name,
  timeStart,
  timeEnd,
  place,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.place}>{place.name}</div>
      <div className={styles.name}>{name}</div>
      <div className={styles.time}>{useTimeInterval(timeStart, timeEnd)}</div>
    </div>
  );
};

export default StatusInformation;
