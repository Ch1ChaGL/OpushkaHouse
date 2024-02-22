import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        Created by{' '}
        <a href='https://github.com/Ch1ChaGL' className={styles.link}>
          Ch1ChaGl
        </a>{' '}
        &{' '}
        <a href='https://vk.com/princessunlight' className={styles.link}>
          Margo
        </a>
      </div>
    </div>
  );
};

export default Footer;
