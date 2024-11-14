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

  const frm = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      email: '',
      role: 'member', // Automatically set role to 'member'
      fullName: '',
      phone: '',
      address: '',
      imageUrl: '',
      experience: 0,
      status: true
    },
    onSubmit: (values) => {
      const { confirmPassword, ...dataToSend } = values; // Remove confirmPassword before sending to the API
      console.log('value', dataToSend);
      const actionAsync = registerActionApi(dataToSend, navigate, setSuccessMessage, setErrorMessage);
      dispatch(actionAsync);
    },
    validationSchema: yup.object().shape({
      password: yup.string().required('Password is required'),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      email: yup.string().email('Invalid email format').required('Email is required'),
      fullName: yup.string().required('Full Name is required'),
      phone: yup.string().required('Phone is required'),
      address: yup.string().required('Address is required'),
      imageUrl: yup.string().url('Invalid URL format').required('Image URL is required'),
      experience: yup.number().required('Experience is required').min(0, 'Experience cannot be negative'),
      status: yup.boolean().required('Status is required')
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
          <PlaceHolder onChange={frm.handleChange} id='password' label='Password' placeholder='Enter your password' type='password' />
          {frm.errors.password && frm.touched.password && <div className={styles.error}>{frm.errors.password}</div>}
        </div>
        <div className={styles.formItem}>
          <PlaceHolder onChange={frm.handleChange} id='confirmPassword' label='Confirm Password' placeholder='Confirm your password' type='password' />
          {frm.errors.confirmPassword && frm.touched.confirmPassword && <div className={styles.error}>{frm.errors.confirmPassword}</div>}
        </div>
        <div className={styles.formItem}>
          <PlaceHolder onChange={frm.handleChange} id='fullName' label='Full Name' placeholder='Enter your full name' type='text' />
          {frm.errors.fullName && frm.touched.fullName && <div className={styles.error}>{frm.errors.fullName}</div>}
        </div>
        <div className={styles.formItem}>
          <PlaceHolder onChange={frm.handleChange} id='phone' label='Phone' placeholder='Enter your phone number' type='text' />
          {frm.errors.phone && frm.touched.phone && <div className={styles.error}>{frm.errors.phone}</div>}
        </div>
        <div className={styles.formItem}>
          <PlaceHolder onChange={frm.handleChange} id='address' label='Address' placeholder='Enter your address' type='text' />
          {frm.errors.address && frm.touched.address && <div className={styles.error}>{frm.errors.address}</div>}
        </div>
        <div className={styles.formItem}>
          <PlaceHolder onChange={frm.handleChange} id='imageUrl' label='Image URL' placeholder='Enter your image URL' type='text' />
          {frm.errors.imageUrl && frm.touched.imageUrl && <div className={styles.error}>{frm.errors.imageUrl}</div>}
        </div>
        <div className={styles.formItem}>
          <PlaceHolder onChange={frm.handleChange} id='experience' label='Experience' placeholder='Enter your experience' type='number' />
          {frm.errors.experience && frm.touched.experience && <div className={styles.error}>{frm.errors.experience}</div>}
        </div>
        <Row className={styles.actionItems}>
          <Col offset={3} span={4}>
            <CustomizeButton onClick={frm.handleSubmit} />
          </Col>
          <Col style={{marginTop:'60px',color:'#ff6d1f'}} offset={1} span={12} className={styles.haveAccountItem}>
            <Link to='/login' className={styles.link}>Have an account? Login here</Link>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default RegisterForm;