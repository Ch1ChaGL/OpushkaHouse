export interface IUserResponse {
  userId: number;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  role: {
    roleId: number;
    name: string;
  };
}
