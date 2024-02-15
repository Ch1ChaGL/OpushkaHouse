import { AuthEndPoint, AuthEndPointsMap } from './auth.config';
import { IRegisterData, ILoginData } from '../../store/user/user.interface';
import { IAuthResponse } from '../../store/user/user.interface';
import { saveToStorage, getAccessToken } from './auth.helper';
import { instance } from '../api/api.interceptors';
import { HttpMethods, createRequestConfig } from '../service.config';

export const AuthService = {
  async main(type: string, data: ILoginData | IRegisterData) {
    const response = await instance<IAuthResponse>(
      createRequestConfig(HttpMethods.POST, type, data),
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response.data;
  },

  async getNewToken() {
    console.log('TOKEN', getAccessToken());
    const response = await instance<IAuthResponse>(
      createRequestConfig(
        HttpMethods.POST,
        AuthEndPointsMap[AuthEndPoint.Chek],
        { token: getAccessToken() as string },
      ),
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
};
