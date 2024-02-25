import React from 'react';
import styles from './ExcelFileUploader.module.css';
import { useUploadExcelFile } from '../../../hooks/useHouseStatus';

const ExcelFileUploader: React.FC = () => {
  const mutate = useUploadExcelFile();
  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) {
      return; // Если файл не выбран, ничего не делаем
    }
    mutate.mutate(file);
  };

  return (
    <div className={styles.container}>
      <label htmlFor='fileInput' className={styles.uploadButton}>
        Выбрать файл
      </label>
      <input
        id='fileInput'
        type='file'
        accept='.xlsx, .xls'
        className={styles.fileInput}
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default ExcelFileUploader;
