import React from 'react';
import { IAdminHouseStatus } from '../../../services/house/house.interface';
import { RoleType } from '../../../consts/Role.const';
import styles from './HouseAdminCard.module.css';
import StatusInformation from '../StatusInformation/StatusInformation';
import { Card } from '@mui/material';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { HOUSE_ROUTE } from '../../../consts/route.const';

const HouseAdminCard = (house: IAdminHouseStatus) => {
  const housemaidStatus = house.houseStatus.filter(
    status => status.roleId === RoleType.Housemaid,
  );
  const navigate = useNavigate();

  const housemanStatus = house.houseStatus
    .filter(status => status.roleId === RoleType.Houseman)
    .sort((a, b) => a.statusId - b.statusId);

  return (
    <Card variant='outlined' className={styles.card}>
      <div className={styles.container}>
        <div className={styles['card__row']}>
          <div className={styles['houseId']}>{house.houseId}</div>
          <div className={styles['status__row']}>
            <div className={styles['housemaidStatus']}>
              <div className={styles['status__title']}>Статусы горничной:</div>
              <div className={styles['housemaidStatus__body']}>
                {housemaidStatus.map(status => (
                  <div
                    className={styles.housemaidStatus__card}
                    key={status.statusId}
                  >
                    <StatusInformation {...status} key={status.statusId} />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles['housemanStatus']}>
              <div className={styles['status__title']}>Статусы хаусмена:</div>
              <div className={styles['housemanStatus__body']}>
                {housemanStatus.map(status => (
                  <div
                    className={styles.housemanStatus__card}
                    key={status.statusId}
                  >
                    <StatusInformation {...status} key={status.statusId} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.btn}>
            <Button text='Редактировать' onClick={() => navigate(`${HOUSE_ROUTE}/${house.houseId}`)}/>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HouseAdminCard;
