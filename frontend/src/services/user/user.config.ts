const BASE_URL = '/user';

export enum UserEndPoint {
  ALL,
  // HOUSEMAID_STATUS,
  // HOUSEMAN_STATUS,
  // CREATE_HOUSE,
  // UPDATE_HOUSE,
}

export const UserEndPointsMap: Record<UserEndPoint, string> = {
  [UserEndPoint.ALL]: `${BASE_URL}/all`,
};
