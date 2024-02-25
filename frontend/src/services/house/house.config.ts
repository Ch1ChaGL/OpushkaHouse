const BASE_URL = '/house';

export enum HouseEndPoint {
  ALL,
  HOUSE_INFORMATION_BY_ID,
  HOUSEMAID_STATUS,
  HOUSEMAN_STATUS,
  CREATE_HOUSE,
  UPDATE_HOUSE,
  UPDATE_FROM_EXCEL,
}

export const HouseEndPointsMap: Record<HouseEndPoint, string> = {
  [HouseEndPoint.ALL]: `${BASE_URL}/all`,
  [HouseEndPoint.HOUSEMAID_STATUS]: `${BASE_URL}/housemaidStatus`,
  [HouseEndPoint.HOUSEMAN_STATUS]: `${BASE_URL}/housemanStatus`,
  [HouseEndPoint.CREATE_HOUSE]: `${BASE_URL}/create`,
  [HouseEndPoint.UPDATE_HOUSE]: `${BASE_URL}/updateStatus`,
  [HouseEndPoint.HOUSE_INFORMATION_BY_ID]: `${BASE_URL}/`,
  [HouseEndPoint.UPDATE_FROM_EXCEL]: `${BASE_URL}/updateFromExcel`,
};
