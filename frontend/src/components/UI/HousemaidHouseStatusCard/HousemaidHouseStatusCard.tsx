import React from 'react';
import { IHousemaidHouseInformation } from '../../../services/house/house.interface';
import styles from './HousemaidHouseStatusCard.module.css';
import {
  useAdditionalHouseInformation,
  useTimeInterval,
} from '../../../hooks/useAdditionalHouseInformation';
import { HouseStatus } from '../../../consts/HouseStatus.const';
import ToggleButton from '../ToggleButton/ToggleButton';
import { useHousemiadHouseStatusMutate } from '../../../hooks/useHouseStatus';

const HousemaidHouseStatusCard = (data: IHousemaidHouseInformation) => {
  const additionalInformation = useAdditionalHouseInformation(data);
  const interval = useTimeInterval(
    data.houseStatus[0].timeStart,
    data.houseStatus[0].timeEnd,
  );

  const mutate = useHousemiadHouseStatusMutate();

  return (
    <div
      className={`${styles.container} ${
        data.houseStatus[0].statusId !== HouseStatus.NeedCheckCleanHouse
          ? ''
          : styles.active
      }`}
    >
      <div className={styles.content}>
        <div className={styles.houseId}>{data.houseId}</div>
        <div className={styles.houseInformations}>
          <div
            className={`${styles.houseStatus} ${
              data.houseStatus[0].statusId !== HouseStatus.NeedCheckCleanHouse
                ? styles.red
                : styles.blue
            }`}
          >
            {data.houseStatus[0].name}
          </div>
          <div className={styles.houseInformation}>{additionalInformation}</div>
          <div className={styles.houseInterval}>{interval}</div>
        </div>
      </div>
      <div className={styles.btn}>
        <ToggleButton
          initialValue={
            data.houseStatus[0].statusId !== HouseStatus.NeedCheckCleanHouse
              ? false
              : true
          }
          onClick={() =>
            mutate.mutate({
              houseId: data.houseId,
              placeId: data.houseStatus[0].placeId,
              statusId:
                data.houseStatus[0].statusId !== HouseStatus.NeedCheckCleanHouse
                  ? HouseStatus.NeedCheckCleanHouse
                  : HouseStatus.NeedsHouseCleaning,
            })
          }
        />
      </div>
    </div>
  );
};

export default HousemaidHouseStatusCard;
