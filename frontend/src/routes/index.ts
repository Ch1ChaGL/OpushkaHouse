import { FC } from 'react';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts/route.const';
import Auth from '../pages/Auth/Auth';
import Home from '../pages/Home/Home';

interface IRoutes {
  path: string;
  component: FC;
  name?: string;
}

export const authRoute: IRoutes[] = [
  {
    path: '/',
    component: Home,
  },
];

export const publicRoute: IRoutes[] = [
  {
    path: LOGIN_ROUTE,
    component: Auth,
  },
];
export const adminRoute = [
  {
    path: REGISTRATION_ROUTE,
    component: Home,
  },
];
export const housemaidRoute = [];
export const housemanRoute = [];
