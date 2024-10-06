import React from 'react';
import { Button, Select } from 'antd';
import styles from '../../asset/scss/LoginForm.module.scss'
import PlaceHolder from '../../component/shared/placeholder/PlaceHolder';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { registerActionApi } from '../../store/redux/action/userAction';

const { Option } = Select;

const CreateUser = () => {
  const dispatch = useDispatch();
  const frm = useFormik({
    initialValues: {
      email: '', 
      password: '',
      confirmPassword: '', 
      fullName: '',
      phone: '', 
      roleID: '' 
    },
    onSubmit: (values) => {
      console.log('value', values);
      const actionAsync = registerActionApi(values); 
      dispatch(actionAsync)
    },
  })

  return (
    <div style={ { height:'100%', zIndex: '99' }} className={`${styles.container}`}>
      <form
        style={{ maxWidth: 450 }}
        onSubmit={frm.handleSubmit}
        autoComplete="off"
        className={`${styles.loginForm}`}
      >
        <div className={`${styles.tittleLogin}`}>
          <h1>Create User</h1>
        </div>
        <div className={`${styles.usernameItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='email' label='Email' placeholder='Enter user email' type='email' /> 
        </div>
        <div className={`${styles.passwordItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='password' label='Password' placeholder='Enter user password' type='password' />
        </div>
        <div className={`${styles.passwordItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='confirmPassword' label='Confirm Password' placeholder='Confirm user password' type='password' />
        </div>
        <div className={`${styles.usernameItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='fullName' label='Full Name' placeholder='Enter user full name' type='text' />
        </div>
        <div className={`${styles.usernameItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='phone' label='Phone' placeholder='Enter user phone number' type='tel' /> 
        </div>
        <div className={`${styles.usernameItem}`}>
          <label>Role</label>
          <Select id='roleID' onChange={value => frm.setFieldValue('roleID', value)}>
            <Option value="admin">Admin</Option>
            <Option value="member">Member</Option>
          </Select>
        </div>
        <div>
          <Button type="submit">Create User</Button>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;