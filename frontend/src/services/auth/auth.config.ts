const BASE_URL = '/auth';

export enum AuthEndPoint {
  Login,
  Registration,
  Chek,
}

export const AuthEndPointsMap: Record<AuthEndPoint, string> = {
  [AuthEndPoint.Login]: `${BASE_URL}/login`,
  [AuthEndPoint.Registration]: `${BASE_URL}/registration`,
  [AuthEndPoint.Chek]: `${BASE_URL}/check`,
};
