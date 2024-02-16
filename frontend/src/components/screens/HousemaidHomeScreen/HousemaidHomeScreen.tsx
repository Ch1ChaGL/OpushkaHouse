import React from 'react';
import { useHousemaidHouseStatus } from '../../../hooks/useHouseStatus';
import Loader from '../../UI/Loader/Loader';

const HousemaidHomeScreen = () => {
  const { data, isFetching } = useHousemaidHouseStatus();

  if (isFetching) return <Loader />;
  console.log(data);
  
  return <div></div>;
};

export default HousemaidHomeScreen;
