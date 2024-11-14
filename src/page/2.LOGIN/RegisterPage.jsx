// src/page/2.LOGIN/RegisterForm.js

import React, { useState } from 'react';
import { Button, Checkbox, Col, Row, Alert } from 'antd';
import styles from '../../asset/scss/RegisterPage.module.scss';
import PlaceHolder from '../../component/shared/placeholder/PlaceHolder';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import CustomizeButton from '../../component/shared/button/CustomizeButton';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { registerActionApi } from '../../store/redux/action/userAction';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

   // Update the validation schema in RegisterForm.jsx
  const frm = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      email: '',
      role: 'member'
    },
    onSubmit: (values) => {
      const { confirmPassword, ...dataToSend } = values;
      console.log('value', dataToSend);
      const actionAsync = registerActionApi(dataToSend, navigate, setSuccessMessage, setErrorMessage);
      dispatch(actionAsync);
    },
    validationSchema: yup.object().shape({
      password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          'Password must contain at least one uppercase letter, one number and one special character'
        ),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      email: yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    })
  });

  return (
    <div className={styles.container}>
      <form onSubmit={frm.handleSubmit} autoComplete="off" className={styles.registerForm}>
        <div className={styles.tittleRegister}>
          <h1>Register</h1>
        </div>
        {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
        {successMessage && <Alert message={successMessage} type="success" showIcon />}
        <div className={styles.formItem}>
          <PlaceHolder onChange={frm.handleChange} id='email' label='Email' placeholder='Enter your email' type='email' />
          {frm.errors.email && frm.touched.email && <div className={styles.error}>{frm.errors.email}</div>}
        </div>
        <div className={styles.formItem}>
  <PlaceHolder 
    onChange={frm.handleChange} 
    id='password' 
    label='Password' 
    placeholder='Enter your password (min 8 chars, 1 uppercase, 1 number, 1 special char)' 
    type='password' 
  />
  {frm.errors.password && frm.touched.password && 
    <div className={styles.error}>{frm.errors.password}</div>
  }
</div>
        <div className={styles.formItem}>
          <PlaceHolder onChange={frm.handleChange} id='confirmPassword' label='Confirm Password' placeholder='Confirm your password' type='password' />
          {frm.errors.confirmPassword && frm.touched.confirmPassword && <div className={styles.error}>{frm.errors.confirmPassword}</div>}
        </div>
       
        <Row className={styles.actionItems}>
          <Col offset={3} span={4}>
            <CustomizeButton onClick={frm.handleSubmit} />
          </Col>
          <Col style={{marginTop:'70px',fontWeight:'700'}} offset={1} span={12} className={styles.haveAccountItem}>
            <Link to='/login' className={styles.link}>Have an account? Login here</Link>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default RegisterForm;