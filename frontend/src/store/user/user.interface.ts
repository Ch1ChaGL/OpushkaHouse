import { IUserAdmin, IUserCommon } from '../../types/user/user.interaface';

export interface IUserState extends IUserCommon {}

export interface IToken {
  accessToken: string;
}

export interface IInitialState {
  user: IUserState | null;
  isLoading: boolean;
  error: string | null;
}

export interface ILoginData {
  phone: string;
  password: string;
}

export interface IRegisterData {
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: number;
}

export interface IAuthResponse extends IToken {
  user: IUserCommon;
}
