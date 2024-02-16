const BASE_URL = '/house';

export enum HouseEndPoint {
  ALL,
  HOUSEMAID_STATUS,
  HOUSEMAN_STATUS,
  CREATE_HOUSE,
  UPDATE_HOUSE,
}

export const HouseEndPointsMap: Record<HouseEndPoint, string> = {
  [HouseEndPoint.ALL]: `${BASE_URL}/all`,
  [HouseEndPoint.HOUSEMAID_STATUS]: `${BASE_URL}/housemaidStatus`,
  [HouseEndPoint.HOUSEMAN_STATUS]: `${BASE_URL}/housemanStatus`,
  [HouseEndPoint.CREATE_HOUSE]: `${BASE_URL}/create`,
  [HouseEndPoint.UPDATE_HOUSE]: `${BASE_URL}/updateStatus`,
};
