import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from '../../asset/scss/LoginPage.module.scss'
import PlaceHolder from '../../component/placeholder/PlaceHolder';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const PasswordWithPlaceholder = ({ id, label, placeholder }) => {
  return (
    <Input.Password
      id={id}
      placeholder={placeholder}
    />
  );
};

const LoginPage = () => (
  <div className={`${styles.container}`}>
    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className={`${styles.loginForm}`}
  >
    <Form.Item>
      <h1>LOGIN</h1>
    </Form.Item>
    <Form.Item
  className={`${styles.usernameItem}`}
  // label={<span className={`${styles.usernameLabel}`}>Username</span>}
  name="username"
  rules={[
    {
      required: true,
      message: 'Please input your username!',
    },
  ]}
>
  <PlaceHolder id='username' label='Username' placeholder='Enter your username' type='text' />
</Form.Item>

<Form.Item
  className={`${styles.passwordItem}`}
  // label={<span className={`${styles.passwordLabel}`}>Password</span>}
  name="password"
  rules={[
    {
      required: true,
      message: 'Please input your password!',
    },
  ]}
>
  <PlaceHolder id='password' label='Password' placeholder='Enter your password' type='password' />
</Form.Item>

    <Form.Item
     className={`${styles.rememberItem}`}
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>
    <Form.Item 
     className={`${styles.registerItem}`}
    label="Chưa có tài khoản?"
    wrapperCol={{
      offset: 8,
      span: 16,
    }}>
      <Button type="primary" htmlType="submit">
        Register
      </Button>
  </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
);
export default LoginPage;