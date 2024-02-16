import { useQuery } from '@tanstack/react-query';
import { HouseService } from '../services/house/house.service';
import { IHousemaidHouseInformation } from '../services/house/house.interface';

export const useHousemaidHouseStatus = () => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['get housemaid house status'],
    initialData: [],
     queryFn: () => HouseService.getHousemaidStatus(),
  });

  return { data, isFetching, isError, isSuccess };
};
