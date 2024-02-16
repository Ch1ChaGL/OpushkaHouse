import React, { useState } from 'react';
import styles from './ToggleButton.module.css';

interface IToggleButtonProprs {
  initialValue: boolean;
  onClick: () => void;
}

const ToggleButton: React.FC<IToggleButtonProprs> = ({
  initialValue,
  onClick,
}) => {
  const [isActive, setIsActive] = useState(initialValue);

  const handleClick = () => {
    setIsActive(!isActive); // Изменяем состояние кнопки при клике
    onClick();
  };

  return (
    <div className={styles['toggle-button']} onClick={handleClick}>
      <div
        className={`${styles['rectangle']} ${isActive ? styles['active'] : ''}`}
      ></div>
      <div className={styles['button-text']}>Убрано</div>
    </div>
  );
};

export default ToggleButton;
