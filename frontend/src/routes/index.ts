import { ComponentType, FC, ReactNode } from 'react';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts/route.const';
import Auth from '../pages/Auth/Auth';

interface IRoutes {
  path: string;
  component: FC;
  name?: string;
}

export const publicRoute: IRoutes[] = [
  {
    path: LOGIN_ROUTE,
    component: Auth,
  },
];
export const adminRoute = [
  {
    path: REGISTRATION_ROUTE,
    component: Auth,
  },
];
export const housemaidRoute = [];
export const housemanRoute = [];
