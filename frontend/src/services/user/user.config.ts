const BASE_URL = '/user';

export enum UserEndPoint {
  ALL,
  REGISTER_USER,
  DELETE,
  // HOUSEMAID_STATUS,
  // HOUSEMAN_STATUS,
  // CREATE_HOUSE,
  // UPDATE_HOUSE,
}

export const UserEndPointsMap: Record<UserEndPoint, string> = {
  [UserEndPoint.ALL]: `${BASE_URL}/all`,
  [UserEndPoint.REGISTER_USER]: `/auth/registration`,
  [UserEndPoint.DELETE]: `${BASE_URL}/`,
};
