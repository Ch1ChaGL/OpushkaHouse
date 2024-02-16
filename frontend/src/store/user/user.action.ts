import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthResponse, ILoginData, IRegisterData } from './user.interface';
import { IUserCommon } from '../../types/user/user.interaface';
import { removeFromStorage } from '../../services/auth/auth.helper';
import { AuthService } from '../../services/auth/auth.service';
import {
  AuthEndPoint,
  AuthEndPointsMap,
} from '../../services/auth/auth.config';
import { errorCatch } from '../../services/api/api.helper';

export const register = createAsyncThunk<IAuthResponse, IRegisterData>(
  'auth/registration',
  async (data, thunkAPI) => {
    try {
      const response = await AuthService.main(
        AuthEndPointsMap[AuthEndPoint.Registration],
        data,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const clearError = createAction('user/clearError');

export const login = createAsyncThunk<IAuthResponse, ILoginData>(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      const response = await AuthService.main(
        AuthEndPointsMap[AuthEndPoint.Login],
        data,
      );
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// export const revalidateUser = createAsyncThunk<IUserCommon, string>(
//   'user/',
//   async (userId, thunkAPI) => {},
// );

export const logout = createAsyncThunk('auth/logout', async () => {
  removeFromStorage();
});

export const checkAuth = createAsyncThunk<IAuthResponse>(
  'auth/check',
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.getNewToken();
      return response.data;
    } catch (error) {
      console.log(error);
      if (errorCatch(error) === 'jwt expired') {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// export const updateUserInformation = createAsyncThunk<IUserCommon, IUserUpdate>(
//   'users/',
//   async (data, thunkAPI) => {},
// );
