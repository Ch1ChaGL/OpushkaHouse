import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HouseService } from '../services/house/house.service';
import {
  IHouseInformation,
  IHouseStatus,
} from '../services/house/house.interface';
import { StatusService } from '../services/status/status.service';

export const useHousemaidHouseStatus = () => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['get house status'],
    initialData: [],
    queryFn: () => HouseService.getHousemaidStatus(),
  });

  return { data, isFetching, isError, isSuccess };
};

export const useUploadExcelFile = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (file: any) => HouseService.uploadExcel(file),
    onSuccess: () => {
      onSuccessCallback && onSuccessCallback();
      queryClient.invalidateQueries({
        queryKey: [`get admin house status`],
      });
    },
  });

  return mutation;
};

export const useHousemanHouseStatus = () => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['get house status'],
    initialData: [],
    queryFn: () => HouseService.getHousemanStatus(),
  });

  return { data, isFetching, isError, isSuccess };
};

export const useHouseStatusMutate = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: {
      houseId: number;
      placeId: number;
      statusId: number;
      timeStart?: string | null;
      timeEnd?: string | null;
      updateTime?: boolean;
    }) =>
      HouseService.updateStatus(
        data.houseId,
        data.placeId,
        data.statusId,
        data.timeStart,
        data.timeEnd,
        data.updateTime,
      ),
    onSuccess: () => {
      onSuccessCallback && onSuccessCallback();
      queryClient.invalidateQueries({
        queryKey: [`get house status`],
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

export const useStatusByPlaceId = (placeId: number) => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: [`get allowed status by place id: ${placeId}`],
    initialData: [],
    queryFn: () => StatusService.getStatusesByPlaceId(placeId),
  });

  return { data, isFetching, isError, isSuccess };
};
