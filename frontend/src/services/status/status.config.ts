const BASE_URL = '/status';

export enum StatusEndPoint {
  GET_STATUSES_BY_PLACE_ID,
}

export const StatusEndPointsMap: Record<StatusEndPoint, string> = {
  [StatusEndPoint.GET_STATUSES_BY_PLACE_ID]: `${BASE_URL}/placeId/`,
};
