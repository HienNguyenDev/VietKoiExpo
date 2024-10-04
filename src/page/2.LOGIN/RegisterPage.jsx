import React from 'react';
import { Button, Checkbox, Col, Row } from 'antd';
import styles from '../../asset/scss/LoginForm.module.scss'
import PlaceHolder from '../../component/shared/placeholder/PlaceHolder';
import { Link } from 'react-router-dom';
import * as yup from  'yup'
import CustomizeButton from '../../component/shared/button/CustomizeButton';
import logoGoogle from '../../asset/logo/Google_Icons-09-512.webp' 
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { registerActionApi } from '../../store/redux/action/userAction';


const RegisterForm = () => {
  const dispatch=useDispatch();
  const frm=useFormik({
    initialValues:{
      email:'', 
      password:'',
      confirmPassword: '', 
      fullName: '',
      phone: '', 
      roleID: 'member' 
    },
    onSubmit:(values)=>{
      console.log('value',values);
      const actionAsync=registerActionApi  (values); 
      dispatch(actionAsync)
    },
  })

  return  (
    <div  style={{zIndex:'99'}} className={`${styles.container}`}>
      <form
        style={{
          maxWidth:450,
        }}
        onSubmit={frm.handleSubmit}
        autoComplete="off"
        className={`${styles.loginForm}`}
      >
        <div className={`${styles.tittleLogin}`}>
          <h1>Register</h1> // Change title to Register
        </div>
        <div className={`${styles.usernameItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='email' label='Email' placeholder='Enter your email' type='email' /> 
        </div>
        <div className={`${styles.passwordItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='password' label='Password' placeholder='Enter your password' type='password' />
        </div>
        <div className={`${styles.passwordItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='confirmPassword' label='Confirm Password' placeholder='Confirm your password' type='password' />
        </div>
        <div className={`${styles.usernameItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='fullName' label='Full Name' placeholder='Enter your full name' type='text' />
        </div>
        <div className={`${styles.usernameItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='phone' label='Phone' placeholder='Enter your phone number' type='tel' /> 
        </div>
        <div>
          <CustomizeButton/>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm; 