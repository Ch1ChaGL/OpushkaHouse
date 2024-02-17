import { IRegisterData } from './../../store/user/user.interface';
import { IAuthResponse, ILoginData } from '../../store/user/user.interface';
import { instance } from '../api/api.interceptors';
import { HttpMethods, createRequestConfig } from '../service.config';
import { UserEndPoint, UserEndPointsMap } from './user.config';
import { IUserResponse } from './user.interface';

export const UserService = {
  async getUsers() {
    const response = await instance<IUserResponse[]>(
      createRequestConfig(HttpMethods.GET, UserEndPointsMap[UserEndPoint.ALL]),
    );

    return response.data;
  },

  async registrationUser(data: IRegisterData) {
    const response = await instance<IAuthResponse>(
      createRequestConfig(
        HttpMethods.POST,
        UserEndPointsMap[UserEndPoint.REGISTER_USER],
        data,
      ),
    );
    return response;
  },

  async deleteUser(userId: number) {
    const response = await instance<IAuthResponse>(
      createRequestConfig(
        HttpMethods.DELETE,
        UserEndPointsMap[UserEndPoint.DELETE] + `${userId}`,
      ),
    );
    return response.data;
  },
};
