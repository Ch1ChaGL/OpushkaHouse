import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';

const App = () => {
  return (
    <BrowserRouter>
      <div className='wrapper'>
        <div className='main'>
          <AppRouter />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
