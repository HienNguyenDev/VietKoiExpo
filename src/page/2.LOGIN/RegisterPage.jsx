import React from 'react';
import { Button, Checkbox, Col, Row } from 'antd';
import styles from '../../asset/scss/RegisterPage.module.scss';
import PlaceHolder from '../../component/shared/placeholder/PlaceHolder';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import CustomizeButton from '../../component/shared/button/CustomizeButton';
import logoGoogle from '../../asset/logo/Google_Icons-09-512.webp';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { registerActionApi } from '../../store/redux/action/userAction';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const frm = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      role: 'R003' // Automatically set role to R003
    },
    onSubmit: (values) => {
      const { confirmPassword, ...dataToSend } = values; // Remove confirmPassword before sending to the API
      console.log('value', dataToSend);
      const actionAsync = registerActionApi(dataToSend);
      dispatch(actionAsync);
    },
    validationSchema: yup.object().shape({
      username: yup.string().required('Username is required'),
      password: yup.string().required('Password is required'),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      email: yup.string().email('Invalid email format').required('Email is required'),
    })
  });

  return (
    <div className={styles.container}>
      <form onSubmit={frm.handleSubmit} autoComplete="off" className={styles.registerForm}>
        <div className={styles.tittleRegister}>
          <h1>Register</h1>
        </div>
        {frm.errors.username && frm.touched.username && <div style={{ color: 'red' }}>{frm.errors.username}</div>}
        <div className={styles.formItem}>
          <PlaceHolder onChange={frm.handleChange} id='username' label='Username' placeholder='Enter your username' type='text' />
        </div>
        {frm.errors.password && frm.touched.password && <div style={{ color: 'red' }}>{frm.errors.password}</div>}
        <div className={styles.formItem}>
          <PlaceHolder onChange={frm.handleChange} id='password' label='Password' placeholder='Enter your password' type='password' />
        </div>
        {frm.errors.confirmPassword && frm.touched.confirmPassword && <div style={{ color: 'red' }}>{frm.errors.confirmPassword}</div>}
        <div className={styles.formItem}>
          <PlaceHolder onChange={frm.handleChange} id='confirmPassword' label='Confirm Password' placeholder='Confirm your password' type='password' />
        </div>
        {frm.errors.email && frm.touched.email && <div style={{ color: 'red' }}>{frm.errors.email}</div>}
        <div className={styles.formItem}>
          <PlaceHolder onChange={frm.handleChange} id='email' label='Email' placeholder='Enter your email' type='email' />
        </div>
        <Row className={styles.actionItems}>
          <Col offset={3} span={4}>
            <CustomizeButton onClick={frm.handleSubmit} />
          </Col>
          <Col offset={1} span={12} className={styles.haveAccountItem}>
            <Link to='/login'>Have an account? Login here</Link>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default RegisterForm;