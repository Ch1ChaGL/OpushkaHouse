import React, { PropsWithChildren } from 'react';
import Header from '../UI/Header/Header';
import Footer from '../UI/Footer/Footer';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='container'>
      <Header />
      <>{children}</>
      <Footer />
    </div>
  );
};

export default MainLayout;
