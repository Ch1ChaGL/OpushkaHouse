import { HouseStatus } from '../../consts/HouseStatus.const';
import { instance } from '../api/api.interceptors';
import { HttpMethods, createRequestConfig } from '../service.config';
import { HouseEndPoint, HouseEndPointsMap } from './house.config';
import {
  IAdminHouseStatus,
  IHouseInformation,
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

  async getHousemanStatus() {
    const response = await instance<IHousemaidHouseInformation[]>(
      createRequestConfig(
        HttpMethods.GET,
        HouseEndPointsMap[HouseEndPoint.HOUSEMAN_STATUS],
      ),
    );

    return response.data;
  },
  async getHouseStatusById(houseId: number) {
    const response = await instance<IHouseInformation>(
      createRequestConfig(
        HttpMethods.GET,
        HouseEndPointsMap[HouseEndPoint.HOUSE_INFORMATION_BY_ID],
        null,
        String(houseId),
      ),
    );

    return response.data;
  },

  async updateStatus(
    houseId: number,
    placeId: number,
    statusId: number,
    timeStart: string | null = null,
    timeEnd: string | null = null,
    updateTime: boolean = false,
  ) {
    const response = await instance<void>(
      createRequestConfig(
        HttpMethods.PUT,
        HouseEndPointsMap[HouseEndPoint.UPDATE_HOUSE],
        { houseId, placeId, statusId, timeStart, timeEnd, updateTime },
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
