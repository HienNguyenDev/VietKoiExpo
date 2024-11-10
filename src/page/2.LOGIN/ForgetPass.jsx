import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Layout } from 'antd';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import axios from 'axios';
import styles from './ForgetPass.module.scss';

const { Content } = Layout;

const ForgetPass = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('https://vietkoiexpo-backend.hiennguyendev.id.vn/Forgot-Password', {
        email: values.email,
      });
      setLoading(false);
      message.success('Password reset link has been sent to your email!');
    } catch (error) {
      setLoading(false);
      message.error('Failed to send password reset link. Please try again.');
    }
  };

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#ff6f61', // Pastel Coral
      },
      background: {
        default: '#f7f9fc', // Light pastel blue background
        paper: '#ffffff', // White card background
      },
      text: {
        primary: '#333333', // Dark gray for primary text
        secondary: '#555555', // Medium gray for secondary text
        title: '#ff6f61', // Pastel Coral for titles
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#00ffcc', // Neon cyan for primary elements
      },
      background: {
        default: '#141414', // Darker background for neon contrast
        paper: '#1c1c1c', // Dark card background
      },
      text: {
        primary: '#ffffff', // White for primary text
        secondary: '#ff00ff', // Neon magenta for secondary text
        title: '#00ffcc', // Neon cyan for titles
      },
    },
  });

  const [themeMode, setThemeMode] = useState('light');
  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
      <Layout style={{ minHeight: '100vh',minWidth:'100vw'}} className={styles.container}>
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px' }}>
          <div className={styles.forgetPassForm}>
            <div className={styles.titleForgetPass}>
              <Typography.Title className={styles.titleForgetPass} level={2}><h1>Forget Password</h1></Typography.Title>
            </div>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label={<Typography.Text className={styles.emailLabel}>Email</Typography.Text>}
                name="email"
                rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} className={styles.submitButton}>
                  Send Reset Link
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
  );
};

export default ForgetPass;