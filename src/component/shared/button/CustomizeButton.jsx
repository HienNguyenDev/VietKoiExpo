import React from 'react';
import { Button } from 'antd';

const CustomizeButton = ({ onClick }) => {
  return (
    <Button type="primary" onClick={onClick}>
      Login
    </Button>
  );
};

export default CustomizeButton;