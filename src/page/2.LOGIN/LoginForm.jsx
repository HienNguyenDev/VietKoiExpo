import React from 'react';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import styles from '../../asset/scss/LoginForm.module.scss'
import PlaceHolder from '../../component/placeholder/PlaceHolder';
import { Link } from 'react-router-dom';
import CustomizeButton from '../../component/button/CustomizeButton';
import logoGoogle from '../../asset/logo/Google_Icons-09-512.webp'
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

// const PasswordWithPlaceholder = ({ id, label, placeholder }) => {
//   return (
//     <Input.Password
//       id={id}
//       placeholder={placeholder}
//     />
//   );
// };

const LoginForm = () => (
  <div  style={{zIndex:'99'}} className={`${styles.container}`}>
    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth:450,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className={`${styles.loginForm}`}
  >
    <Form.Item > 
      <div className={`${styles.tittleLogin}`}>
      <h1 style={{}}>Login</h1>
      </div>
     
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
        offset: 1,
        span: 12,
      }}
    >
      <Checkbox style={{fontFamily:'futura,helvetica,sans-serif',color:'  rgb(202, 140, 140)'}}>Remember me</Checkbox>
    </Form.Item>
    <Row>
      <Col span={14}>
        <Form.Item 
          className={`${styles.registerItem}`}
          wrapperCol={{
            offset:1,
            span: 16,
          }}
        >
          <Link to='/register' style={{color:'rgb(202, 140, 140)'}}>Chưa có tài khoản?</Link>
        </Form.Item>
      </Col>
      <Col span={10}>
      <Form.Item
      wrapperCol={{
        offset: 1,
        span: 16,
      }}
    >
      <CustomizeButton/>
    </Form.Item>
      </Col>
    </Row>
    {/* create a login with google */}
    <Form.Item
    className={styles.loginWithGoogleItem}
      wrapperCol={{
        offset: 5,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
       <div className={styles.loginWithGoogle}>
       <p>Login With Google</p>
        <img src={logoGoogle} style={{width:'20px',height:'20px'}}></img>
        
       </div>
      </Button>
    </Form.Item>
    
  </Form>
  </div>
);
export default LoginForm;