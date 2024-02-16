import { instance } from '../api/api.interceptors';
import { HttpMethods, createRequestConfig } from '../service.config';
import { HouseEndPoint, HouseEndPointsMap } from './house.config';
import { IHousemaidHouseInformation } from './house.interface';

export const HouseService = {
  async getHousemaidStatus() {
    const response = await instance<IHousemaidHouseInformation[]>(
      createRequestConfig(
        HttpMethods.GET,
        HouseEndPointsMap[HouseEndPoint.HOUSEMAID_STATUS],
      ),
    );

    return response.data;
  },
};
