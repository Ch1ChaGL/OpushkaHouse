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
import StatusInformation from '../StatusInformation/StatusInformation';

const HousemanHouseStatusCard = (data: IHousemaidHouseInformation) => {
  const additionalInformation = useAdditionalHouseInformation(data);
  const interval = useTimeInterval(
    data.houseStatus[0].timeStart,
    data.houseStatus[0].timeEnd,
  );

  const mutate = useHouseStatusMutate();

  return (
    <Card variant='outlined' className={styles.card}>
      <div>
        <div className={styles.content}>
          <div className={styles.houseId}>{data.houseId}</div>
          <div className={styles.houseInformations}>
            {data.houseStatus
              .sort((a, b) => a.place.placeId - b.place.placeId)
              .map(status => (
                <div
                  className={styles.housemanStatus__card}
                  key={status.statusId}
                >
                  <StatusInformation {...status} name={status.name} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HousemanHouseStatusCard;
