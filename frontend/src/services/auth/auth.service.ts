import { AuthEndPoint, AuthEndPointsMap } from './auth.config';
import { IRegisterData, ILoginData } from '../../store/user/user.interface';
import { IAuthResponse } from '../../store/user/user.interface';
import { saveToStorage } from './auth.helper';
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
    const response = await instance<IAuthResponse>(
      createRequestConfig(HttpMethods.GET, AuthEndPointsMap[AuthEndPoint.Chek]),
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
};
