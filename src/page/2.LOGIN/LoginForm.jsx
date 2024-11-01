import React, { useState } from 'react';
import { Button, Checkbox, Col, Row, Alert } from 'antd';
import styles from '../../asset/scss/LoginForm.module.scss';
import PlaceHolder from '../../component/shared/placeholder/PlaceHolder';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import CustomizeButton from '../../component/shared/button/CustomizeButton';
import logoGoogle from '../../asset/logo/Google_Icons-09-512.webp';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { loginActionApi } from '../../store/redux/action/userAction';
import { GoogleLogin } from 'react-google-login';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

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
      } catch (error) {
        setErrorMessage('Invalid email or password. Please try again.');
      }
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Invalid email format').required('Email is required'),
      password: yup.string().required('Password is required'),
    })
  });

  const handleGoogleSuccess = async (response) => {
    console.log('Google login success:', response);
    const { tokenId } = response;
    try {
      const actionAsync = loginActionApi({ tokenId }, navigate);
      await dispatch(actionAsync);
    } catch (error) {
      setErrorMessage('Google login failed. Please try again.');
    }
  };

  const handleGoogleFailure = (response) => {
    console.error('Google login failure:', response);
    if (response.error) {
      setErrorMessage('Google login failed. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={frm.handleSubmit} autoComplete="off" className={styles.loginForm}>
        <div className={styles.titleLogin}>
          <h1>Login</h1>
        </div>
        {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
        {frm.errors.email && frm.touched.email && <div style={{ color: 'red' }}>{frm.errors.email}</div>}
        <div className={styles.userItem}>
          <PlaceHolder onChange={frm.handleChange} id='email' label='Email' placeholder='Enter your email' type='text' />
        </div>
        {frm.errors.password && frm.touched.password && <div className={styles.error}>{frm.errors.password}</div>}
        <div className={styles.passwordItem}>
          <PlaceHolder onChange={frm.handleChange} id='password' label='Password' placeholder='Enter your password' type='password' />
        </div>
        <div className={styles.rememberItem}>
          <Checkbox className={styles.checkbox}>Remember me</Checkbox>
        </div>
        <Row>
          <Col span={14}>
            <div className={styles.registerItem}>
              <Link to='/register' className={styles.link}>Chưa có tài khoản?</Link>
            </div>
          </Col>
          <Col span={10}>
            <div>
              <CustomizeButton onClick={frm.handleSubmit} />
            </div>
          </Col>
        </Row>
        <div className={styles.loginWithGoogleItem}>
          <GoogleLogin
            clientId={"676957431672-9mb5rgvuvpb000p93e3i8f7jg622a9ln.apps.googleusercontent.com"}
            buttonText="Login with Google"
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <Button type="primary" htmlType="button" className={styles.googleButton} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <div className={styles.loginWithGoogle}>
                  <p>Login With Google</p>
                  <img src={logoGoogle} alt="Google Logo" />
                </div>
              </Button>
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;