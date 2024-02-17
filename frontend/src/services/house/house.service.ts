import { HouseStatus } from '../../consts/HouseStatus.const';
import { instance } from '../api/api.interceptors';
import { HttpMethods, createRequestConfig } from '../service.config';
import { HouseEndPoint, HouseEndPointsMap } from './house.config';
import {
  IAdminHouseStatus,
  IHousemaidHouseInformation,
} from './house.interface';

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

  async updateHousemaidStatus(
    houseId: number,
    placeId: number,
    statusId: number,
  ) {
    const response = await instance<void>(
      createRequestConfig(
        HttpMethods.PUT,
        HouseEndPointsMap[HouseEndPoint.UPDATE_HOUSE],
        { houseId, placeId, statusId },
      ),
    );

    return response.data;
  },

  async getAdminStatus() {
    const response = await instance<IAdminHouseStatus[]>(
      createRequestConfig(
        HttpMethods.GET,
        HouseEndPointsMap[HouseEndPoint.ALL],
      ),
    );

    return response.data;
  },
};
