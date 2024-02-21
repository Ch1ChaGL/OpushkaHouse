import React from 'react';
import styles from './House.module.css';
import { useParams } from 'react-router-dom';
import { useHouseStatusById } from '../../hooks/useHouseStatus';
import HouseRedactScreen from '../../components/screens/HouseRedactScreen/HouseRedactScreen';
const House = () => {
  const { id } = useParams();
  const houseId = id as string;
  const { data } = useHouseStatusById(+houseId);
  return <HouseRedactScreen {...data} />;
};

export default House;
