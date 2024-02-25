import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { useEffect } from 'react';
import { useActions } from './hooks/useActions';

const App = () => {
  const { checkAuth } = useActions();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <div className='wrapper'>
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};

export default App;
