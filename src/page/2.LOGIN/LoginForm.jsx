import React from 'react';
import { Button, Checkbox, Col, Row } from 'antd';
import styles from '../../asset/scss/LoginForm.module.scss';
import PlaceHolder from '../../component/shared/placeholder/PlaceHolder';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import CustomizeButton from '../../component/shared/button/CustomizeButton';
import logoGoogle from '../../asset/logo/Google_Icons-09-512.webp';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { loginActionApi } from '../../store/redux/action/userAction';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const frm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log('value', values);
      const actionAsync = loginActionApi(values, navigate);
      dispatch(actionAsync);
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email is required'),
      password: yup.string().required('Password is required'),
    })
  });

  return (
    <div className={styles.container}>
      <form onSubmit={frm.handleSubmit} autoComplete="off" className={styles.loginForm}>
        <div className={styles.tittleLogin}>
          <h1>Login</h1>
        </div>
        {frm.errors.email && frm.touched.email && <div style={{ color: 'red' }}>{frm.errors.email}</div>}
        <div className={styles.userItem}>
          <PlaceHolder onChange={frm.handleChange} id='email' label='Email' placeholder='Enter your email' type='text' />
        </div>
        {frm.errors.password && frm.touched.password && <div style={{ color: 'red' }}>{frm.errors.password}</div>}
        <div className={styles.passwordItem}>
          <PlaceHolder onChange={frm.handleChange} id='password' label='Password' placeholder='Enter your password' type='password' />
        </div>
        <div className={styles.rememberItem}>
          <Checkbox style={{ fontFamily: 'futura,helvetica,sans-serif', color: 'rgb(202, 140, 140)' }}>Remember me</Checkbox>
        </div>
        <Row>
          <Col span={14}>
            <div className={styles.registerItem}>
              <Link to='/register' style={{ color: 'rgb(202, 140, 140)' }}>Chưa có tài khoản?</Link>
            </div>
          </Col>
          <Col span={10}>
            <div>
              <CustomizeButton onClick={frm.handleSubmit} />
            </div>
          </Col>
        </Row>
        <div className={styles.loginWithGoogleItem}>
          <Button type="primary" htmlType="button">
            <div className={styles.loginWithGoogle}>
              <p>Login With Google</p>
              <img src={logoGoogle} alt="Google Logo" />
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;