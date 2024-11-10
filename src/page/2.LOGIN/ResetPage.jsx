import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios';
import styles from './ResetPasswordPage.module.scss';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log('token:', token);
      const response = await axios.post(`https://vietkoiexpo-backend.hiennguyendev.id.vn/Reset-Password?token=${token}`, {
        token,
        newPassword: values.newPassword,
      });
      message.success('Password reset successfully!');
      navigate('/login');
    } catch (error) {
      message.error('Failed to reset password. Please try again.');
      console.error('Error resetting password:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <Typography.Title level={2}>Reset Password</Typography.Title>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[{ required: true, message: 'Please enter your new password' }]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your new password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;