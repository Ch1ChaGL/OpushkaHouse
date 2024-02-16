import { Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import React, { useMemo } from 'react';
import AdminUserRegisterScreen from '../AdminUserRegiserScreen/AdminUserRegisterScreen';

const AdminHomeScreen = () => {
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const tabs = useMemo(
    () => [
      { label: 'Дома', path: '/' },
      { label: 'Пользователи', path: '/registration' },
    ],
    [],
  );

  React.useEffect(() => {
    // Находим индекс таба, который соответствует текущему маршруту
    const tabIndex = tabs.findIndex(tab => tab.path === location.pathname);
    // Если индекс найден, обновляем состояние value
    if (tabIndex !== -1) {
      setValue(tabIndex);
    }
  }, [location, tabs]);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        variant={isMobile ? 'scrollable' : 'standard'}
        scrollButtons='auto'
        textColor='primary'
        indicatorColor='primary'
        sx={{
          bgcolor: '#ffffff', // цвет фона таба
          '& .MuiTab-root': {
            color: '#236092', // цвет текста таба
            '&.Mui-selected': {
              fontWeight: '600',
              color: '#236092', // цвет текста активного таба
            },
          },
          '& .PrivateTabIndicator-root': {
            backgroundColor: '#236092', // цвет индикатора
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            component={RouterLink}
            to={tab.path}
          />
        ))}
      </Tabs>

      {/* Отображаемый компонент зависит от текущего маршрута */}
      {location.pathname === '/registration' && <AdminUserRegisterScreen />}
      {location.pathname === '/' && <div>Дома</div>}
      {/* Здесь должен быть компонент для маршрута Settings */}
    </>
  );
};

export default AdminHomeScreen;
