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
};
