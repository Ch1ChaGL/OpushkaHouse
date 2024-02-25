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
    <Card
      variant='outlined'
      className={`${styles.card} ${
        getStatusValueForButhHouse(buthHouse) &&
        getStatusValueForSite(site) &&
        getStatusValueForHotTub(hotTub)
          ? styles.active
          : ''
      }`}
    >
      <div>
        <div className={styles.content}>
          <div className={styles.title}>
            <div className={styles.houseId}>{data.houseId}</div>
            <div className={styles.additionalInformation}>
              {additionalInformation}
            </div>
          </div>

          <div className={styles.houseInformations}>
            {data.houseStatus
              .sort((a, b) => a.place.placeId - b.place.placeId)
              .map(status => (
                <div
                  className={`${styles.housemanStatus__card} ${
                    getStatusValueByPlaceId(status) ? styles.active : styles.red
                  }`}
                  key={status.statusId}
                >
                  <StatusInformation {...status} name={status.name} />
                </div>
              ))}
          </div>
          <div className={styles.btns}>
            <ToggleButton
              initialValue={getStatusValueForSite(site)}
              onClick={() => {
                mutate.mutate({
                  placeId: PlaceType.Site,
                  houseId: data.houseId,
                  statusId:
                    getStatusValueForSite(site) === false
                      ? HouseStatus.NeedCheckCleanSite
                      : HouseStatus.NeedsSiteCleaning,
                });
              }}
              text='Участок'
            />
            <ToggleButton
              initialValue={getStatusValueForButhHouse(buthHouse)}
              onClick={() => {
                mutate.mutate({
                  placeId: PlaceType.Bathhouse,
                  houseId: data.houseId,
                  statusId:
                    getStatusValueForButhHouse(buthHouse) === false
                      ? HouseStatus.NeedChekBathhous
                      : HouseStatus.BathhouseLightingRequired,
                });
              }}
              text='Баня'
            />
            <ToggleButton
              initialValue={getStatusValueForHotTub(hotTub)}
              onClick={() => {
                mutate.mutate({
                  placeId: PlaceType.HotTub,
                  houseId: data.houseId,
                  statusId:
                    getStatusValueForHotTub(hotTub) === false
                      ? HouseStatus.NeedChekHotTub
                      : HouseStatus.HotTubKindlingRequired,
                });
              }}
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

const getStatusValueByPlaceId = (ter: IHousemaidHouseStatus | undefined) => {
  if (ter === undefined) throw new Error('Expect undefined');
  switch (ter.place.placeId) {
    case PlaceType.Site:
      return getStatusValueForSite(ter);
    case PlaceType.Bathhouse:
      return getStatusValueForButhHouse(ter);
    case PlaceType.HotTub:
      return getStatusValueForHotTub(ter);
  }
};
