import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HouseService } from '../services/house/house.service';
import {
  IHouseInformation,
  IHouseStatus,
} from '../services/house/house.interface';

export const useHousemaidHouseStatus = () => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['get housemaid house status'],
    initialData: [],
    queryFn: () => HouseService.getHousemaidStatus(),
  });

  return { data, isFetching, isError, isSuccess };
};

export const useHousemiadHouseStatusMutate = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: {
      houseId: number;
      placeId: number;
      statusId: number;
    }) =>
      HouseService.updateHousemaidStatus(
        data.houseId,
        data.placeId,
        data.statusId,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`get housemaid house status`],
      });
    },
  });

  return mutation;
};

export const useAdminHouseStatus = () => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['get admin house status'],
    initialData: [],
    queryFn: () => HouseService.getAdminStatus(),
  });

  return { data, isFetching, isError, isSuccess };
};

export const useHouseStatusById = (houseId: number) => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: [`get house status ${houseId}`],
    initialData: {} as IHouseInformation,
    queryFn: () => HouseService.getHouseStatusById(houseId),
  });

  return { data, isFetching, isError, isSuccess };
};
