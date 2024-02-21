import { FC } from 'react';
import {
  HOUSE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
} from '../consts/route.const';
import Auth from '../pages/Auth/Auth';
import Home from '../pages/Home/Home';
import House from '../pages/House/House';

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
  {
    path: HOUSE_ROUTE + '/:id',
    component: House,
  },
];
export const housemaidRoute = [];
export const housemanRoute = [];
