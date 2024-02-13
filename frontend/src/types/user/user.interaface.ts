export interface IUserAdmin {
  userId: number;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
  roleId: number;
}

export interface IUserCommon
  extends Omit<IUserAdmin, 'password' | 'createdAt'> {}

export interface IUserLogin {
  phone: string;
  password: string;
}

