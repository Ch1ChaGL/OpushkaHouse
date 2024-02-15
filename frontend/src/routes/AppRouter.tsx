import { Route, Routes, Navigate } from 'react-router-dom';
import {
  adminRoute,
  authRoute,
  housemaidRoute,
  housemanRoute,
  publicRoute,
} from './index';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { LOGIN_ROUTE } from '../utils/consts/route.const';

function AppRouter() {
  const { user } = useTypedSelector(state => state.user);
  return (
    <Routes>
      {user &&
        authRoute.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      {/* {user?.roleId === 1 &&
        adminRoute.map(route => (
          <Route key={route} path={route.path} element={route.component} />
        ))}
      {user?.roleId === 2 &&
        housemaidRoute.map(route => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      {user?.roleId === 3 &&
        housemanRoute.map(route => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))} */}
      {publicRoute.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
      <Route path='*' element={<Navigate replace to={LOGIN_ROUTE} />} />
    </Routes>
  );
}

export default AppRouter;
