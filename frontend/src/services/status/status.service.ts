import { HouseStatus } from '../../consts/HouseStatus.const';
import { instance } from '../api/api.interceptors';
import { HttpMethods, createRequestConfig } from '../service.config';
import { StatusEndPoint, StatusEndPointsMap } from './status.config';
import { IStatus } from './status.interface';

export const StatusService = {
  async getStatusesByPlaceId(placeId: number) {
    const response = await instance<IStatus[]>(
      createRequestConfig(
        HttpMethods.GET,
        StatusEndPointsMap[StatusEndPoint.GET_STATUSES_BY_PLACE_ID],
        null,
        String(placeId),
      ),
    );

    return response.data;
  },
};
