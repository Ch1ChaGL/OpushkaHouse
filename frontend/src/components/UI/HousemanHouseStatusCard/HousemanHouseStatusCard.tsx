import React from 'react';
import styles from './HousemanHouseStatusCard.module.css';
import { IHousemaidHouseInformation } from '../../../services/house/house.interface';
import {
  useAdditionalHouseInformation,
  useTimeInterval,
} from '../../../hooks/useAdditionalHouseInformation';
import { useHouseStatusMutate } from '../../../hooks/useHouseStatus';
import { HouseStatus } from '../../../consts/HouseStatus.const';
import ToggleButton from '../ToggleButton/ToggleButton';
import { Card } from '@mui/material';

const HousemanHouseStatusCard = (data: IHousemaidHouseInformation) => {
  const additionalInformation = useAdditionalHouseInformation(data);
  const interval = useTimeInterval(
    data.houseStatus[0].timeStart,
    data.houseStatus[0].timeEnd,
  );

  const mutate = useHouseStatusMutate();

  return (
    <Card variant='outlined' className={styles.card}>
      <div
        className={`${styles.container} ${
          data.houseStatus[0].statusId === HouseStatus.NeedCheckCleanSite ||
          data.houseStatus[0].statusId === HouseStatus.CleanSite
            ? styles.active
            : ''
        }`}
      >
        <div className={styles.content}>
          <div className={styles.houseId}>{data.houseId}</div>
          <div className={styles.houseInformations}>
            <div
              className={`${styles.houseStatus} ${
                data.houseStatus[0].statusId ===
                  HouseStatus.NeedCheckCleanSite ||
                data.houseStatus[0].statusId === HouseStatus.CleanSite
                  ? styles.blue
                  : styles.red
              }`}
            >
              {data.houseStatus[0].name}
            </div>
            <div className={styles.houseInformation}>
              {additionalInformation}
            </div>
            <div className={styles.houseInterval}>{interval}</div>
          </div>
        </div>
        <div className={styles.btn}>
          <ToggleButton
            initialValue={
              data.houseStatus[0].statusId ===
                HouseStatus.NeedCheckCleanHouse ||
              data.houseStatus[0].statusId === HouseStatus.CleanSite
                ? true
                : false
            }
            onClick={() =>
              mutate.mutate({
                houseId: data.houseId,
                placeId: data.houseStatus[0].place.placeId,
                statusId:
                  data.houseStatus[0].statusId ===
                    HouseStatus.NeedCheckCleanSite ||
                  data.houseStatus[0].statusId === HouseStatus.CleanSite
                    ? HouseStatus.NeedsSiteCleaning
                    : HouseStatus.NeedCheckCleanSite,
              })
            }
          />
        </div>
      </div>
    </Card>
  );
};

export default HousemanHouseStatusCard;
