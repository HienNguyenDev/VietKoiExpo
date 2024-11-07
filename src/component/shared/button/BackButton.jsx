import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './BackButton.module.scss';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      type="primary"
      icon={<ArrowLeftOutlined />}
      onClick={() => navigate(-1)}
      className={styles.backButton}
    >
      Back
    </Button>
  );
};

export default BackButton;