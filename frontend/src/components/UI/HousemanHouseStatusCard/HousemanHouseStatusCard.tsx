import React from 'react';
import styles from './HousemanHouseStatusCard.module.css';
import {
  IHousemaidHouseInformation,
  IHousemaidHouseStatus,
} from '../../../services/house/house.interface';
import {
  useAdditionalHouseInformation,
  useTimeInterval,
} from '../../../hooks/useAdditionalHouseInformation';
import { useHouseStatusMutate } from '../../../hooks/useHouseStatus';
import { HouseStatus } from '../../../consts/HouseStatus.const';
import ToggleButton from '../ToggleButton/ToggleButton';
import { Card } from '@mui/material';
import StatusInformation from '../StatusInformation/StatusInformation';
import { PlaceType } from '../../../consts/PlaceType.const';

const HousemanHouseStatusCard = (data: IHousemaidHouseInformation) => {
  const additionalInformation = useAdditionalHouseInformation(data);
  const interval = useTimeInterval(
    data.houseStatus[0].timeStart,
    data.houseStatus[0].timeEnd,
  );

  const mutate = useHouseStatusMutate();

  const site = data.houseStatus.find(
    status => status.place.placeId === PlaceType.Site,
  );
  const buthHouse = data.houseStatus.find(
    status => status.place.placeId === PlaceType.Bathhouse,
  );
  const hotTub = data.houseStatus.find(
    status => status.place.placeId === PlaceType.HotTub,
  );
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
          <div className={styles.btns}>
            <ToggleButton
              initialValue={getStatusValueForSite(site)}
              onClick={() => {}}
              text='Участок'
            />
            <ToggleButton
              initialValue={getStatusValueForButhHouse(buthHouse)}
              onClick={() => {}}
              text='Баня'
            />
            <ToggleButton
              initialValue={getStatusValueForHotTub(hotTub)}
              onClick={() => {}}
              text='Купель'
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HousemanHouseStatusCard;

const getStatusValueForSite = (site: IHousemaidHouseStatus | undefined) => {
  if (site === undefined) throw new Error('Status undefined');
  if (site.statusId === HouseStatus.NeedsSiteCleaning) return false;
  else return true;
};

const getStatusValueForButhHouse = (
  buthHouse: IHousemaidHouseStatus | undefined,
) => {
  if (buthHouse === undefined) throw new Error('Status undefined');
  if (buthHouse.statusId === HouseStatus.BathhouseLightingRequired)
    return false;
  else return true;
};

const getStatusValueForHotTub = (hotTub: IHousemaidHouseStatus | undefined) => {
  if (hotTub === undefined) throw new Error('Status undefined');
  if (hotTub.statusId === HouseStatus.HotTubKindlingRequired) return false;
  else return true;
};
