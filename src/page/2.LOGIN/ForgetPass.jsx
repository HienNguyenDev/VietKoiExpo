import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Layout } from 'antd';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const { Content } = Layout;

const ForgetPass = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      message.success('Password reset link has been sent to your email!');
    }, 2000);
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
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Layout style={{ minHeight: '100vh', backgroundColor: currentTheme.palette.background.default }}>
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px' }}>
          <div style={{ width: '100%', maxWidth: '400px', backgroundColor: currentTheme.palette.background.paper, padding: '20px', borderRadius: '10px', boxShadow: `0 0 10px ${currentTheme.palette.primary.main}` }}>
            <Typography.Title level={2} style={{ textAlign: 'center', color: currentTheme.palette.primary.main }}>Forget Password</Typography.Title>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label={<Typography.Text style={{ color: currentTheme.palette.text.primary }}>Email</Typography.Text>}
                name="email"
                rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  Send Reset Link
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </ThemeProvider>
  );
};

export default ForgetPass;