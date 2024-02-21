import React from 'react';
import styles from './House.module.css';
import { useParams } from 'react-router-dom';
const House = () => {
  const { id } = useParams();



  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>{id}</div>
      <div className={styles.housemaidStatus}>
            
      </div>
    </div>
  );
};

export default House;
