// src/page/2.LOGIN/LoginForm.js

import React, { useState } from 'react';
import { Button, Checkbox, Col, Row, Alert } from 'antd';
import styles from '../../asset/scss/LoginForm.module.scss';
import PlaceHolder from '../../component/shared/placeholder/PlaceHolder';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import CustomizeButton from '../../component/shared/button/CustomizeButton';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { loginActionApi } from '../../store/redux/action/userAction';
import GoogleLoginComponent from './GoogleLoginComponent';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const frm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      console.log('value', values);
      try {
        const actionAsync = loginActionApi(values, navigate);
        await dispatch(actionAsync);
        setSuccessMessage('Login successful! Redirecting...');
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Invalid email or password. Please try again.');
        setSuccessMessage('');
      }
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Invalid email format').required('Email is required'),
      password: yup.string().required('Password is required'),
    })
  });

  return (
    <div className={styles.container}>
      <form onSubmit={frm.handleSubmit} autoComplete="off" className={styles.loginForm}>
        <div className={styles.titleLogin}>
          <h1>Login</h1>
        </div>
        {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
        {successMessage && <Alert message={successMessage} type="success" showIcon />}
        {frm.errors.email && frm.touched.email && <div  className={styles.error}>{frm.errors.email}</div>}
        <div className={styles.userItem}>
          <PlaceHolder onChange={frm.handleChange} id='email' label='Email' placeholder='Enter your email' type='text' />
        </div>
        {frm.errors.password && frm.touched.password && <div className={styles.error}>{frm.errors.password}</div>}
        <div className={styles.passwordItem}>
          <PlaceHolder onChange={frm.handleChange} id='password' label='Password' placeholder='Enter your password' type='password' />
        </div>
        <Row>
          <Col span={14}>
            <div className={styles.registerItem}>
              <Link to='/register' className={styles.link}>Chưa có tài khoản?</Link>
            </div>
            <div className={styles.registerItem}>
              <Link to='/forget-password' className={styles.link}>Quên mật khẩu?</Link>
            </div>
          </Col>
          <Col span={10}>
            <div>
              <CustomizeButton onClick={frm.handleSubmit} />
            </div>
          </Col>
        </Row>
        <div className={styles.loginWithGoogleItem}>
          <GoogleLoginComponent />
        </div>
        <div style={{marginTop:'50px'}}>
          {/* Back to homepage */}
          <Link  to='/home' className={styles.link}>Back to Homepage</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;