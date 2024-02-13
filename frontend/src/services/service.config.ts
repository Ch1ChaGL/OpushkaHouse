import { AxiosRequestConfig } from 'axios';
import { AuthEndPoint, AuthEndPointsMap } from './auth/auth.config';
import { getContentType } from './api/api.helper';

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const createRequestConfig = (
  method: HttpMethods,
  endPoint: string,
  data?: any,
  id?: string,
): AxiosRequestConfig => ({
  url: id ? endPoint + id : endPoint,
  method,
  data,
  headers: getContentType(),
});
