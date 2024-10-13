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
import { loginActionApi } from '../../store/redux/action/userAction';
import { useState } from 'react';
const LoginForm = () =>{
  const dispatch=useDispatch();
  const frm=useFormik({
    initialValues:{
      username:'',
      password:''
    },
    onSubmit:(values)=>{
      console.log('value',values);
      const actionAsync=loginActionApi  (values);
      dispatch(actionAsync)
    },
    validationSchema:yup.object().shape({
      username:yup.string().required('Username is required'),
      password:yup.number().typeError("Password must be a number").required('Password is required')
    })
  })

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [status,setStatus]=React.useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Submitting...');
    try {
      // Replace this with your actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('Submitted successfully!');
      setErrorMessage('');
    } catch (error) {
      setStatus('Submission failed');
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };

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
          <h1>Login</h1>
        </div>
        {frm.errors.username && frm.touched.username && <div style={{color:'red'}}>{frm.errors.username}</div>}
        <div className={`${styles.usernameItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='username' label='Username' placeholder='Enter your username' type='text' /> 
         
        </div>
        {frm.errors.password && frm.touched.password && <div style={{color:'red'}}>{frm.errors.password}</div>}
        <div className={`${styles.passwordItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='password' label='Password' placeholder='Enter your password' type='password' />
         
        </div>
        <div className={`${styles.rememberItem}`}>
          <Checkbox style={{fontFamily:'futura,helvetica,sans-serif',color:'  rgb(202, 140, 140)'}}>Remember me</Checkbox>
        </div>
        <Row>
          <Col span={14}>
            <div className={`${styles.registerItem}`}>
              <Link to='/register' style={{color:'rgb(202, 140, 140)'}}>Chưa có tài khoản?</Link>
            </div>
          </Col>
          <Col span={10}>
            <div>
              <CustomizeButton/>
            </div>
          </Col>
        </Row>
   
        <div className={styles.loginWithGoogleItem}>
          <Button type="primary" htmlType="submit">
            <div className={styles.loginWithGoogle}>
              <p>Login With Google</p>
              <img src={logoGoogle} style={{width:'20px',height:'20px'}}></img>
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
}
export default LoginForm;