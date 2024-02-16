import React, { PropsWithChildren } from 'react';
import Header from '../UI/Header/Header';
import Footer from '../UI/Footer/Footer';
import styles from './MainLayout.module.css';
const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div className='container'>
        <div className={styles.content}>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
