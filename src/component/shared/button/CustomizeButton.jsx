// CustomizeButton.jsx
import React from 'react';
import { Button } from 'antd';
import styles from './CustomizeButton.module.scss';

const CustomizeButton = ({ onClick }) => {
  return (
    <Button 
      type="primary" 
      onClick={onClick}
      className={styles.loginButton}
    >
      Đăng nhập
    </Button>
  );
};

export default CustomizeButton;