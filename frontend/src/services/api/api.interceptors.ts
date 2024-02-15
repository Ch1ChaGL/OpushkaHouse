import axios from 'axios';
import { errorCatch, getContentType } from './api.helper';
import { getAccessToken, removeFromStorage } from '../auth/auth.helper';
import { AuthService } from '../auth/auth.service';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: getContentType(),
});

instance.interceptors.request.use(config => {
  const accessToken = getAccessToken();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

//!Воспользоваться позже
// instance.interceptors.response.use(
//   config => config,
//   async error => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 ||
//       errorCatch(error) === 'jwt expired' ||
//       (errorCatch(error) === 'jwt must be provided' &&
//         error.config &&
//         !error.config._isRetry)
//     ) {
//       originalRequest._isRetry = true;
//       try {
//         await AuthService.getNewToken();
//         return instance.request(originalRequest);
//       } catch (err) {
//         if (errorCatch(err) === 'jwt expired') removeFromStorage();
//       }
//     }

//     throw error;
//   },
// );
