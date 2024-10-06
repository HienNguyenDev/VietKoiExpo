import React from 'react';
import { Button, Checkbox, Col, Row } from 'antd';
import styles from '../../asset/scss/LoginForm.module.scss'
import PlaceHolder from '../../component/shared/placeholder/PlaceHolder';
import { Link } from 'react-router-dom';
import * as yup from  'yup'
import CustomizeButton from '../../component/shared/button/CustomizeButton';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { createContestActionApi } from '../../store/redux/action/contestAction'; // replace with your actual action

const CreateContest = () => {
  const dispatch = useDispatch();
  const frm = useFormik({
    initialValues: {
      competitionName: '', 
      description: '',
      location: '', 
      startDate: '',
      endDate: '', 
      status: '' 
    },
    onSubmit: (values) => {
      console.log('value', values);
      const actionAsync = createContestActionApi(values); 
      dispatch(actionAsync)
    },
  })

  return (
    <div style={{ zIndex: '99' }} className={`${styles.container}`}>
      <form
        style={{ maxWidth: 450 }}
        onSubmit={frm.handleSubmit}
        autoComplete="off"
        className={`${styles.loginForm}`}
      >
        <div className={`${styles.tittleLogin}`}>
          <h1>Create Contest</h1>
        </div>
        <div className={`${styles.usernameItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='competitionName' label='Competition Name' placeholder='Enter competition name' type='text' /> 
        </div>
        <div className={`${styles.usernameItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='description' label='Description' placeholder='Enter description' type='text' />
        </div>
        <div className={`${styles.usernameItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='location' label='Location' placeholder='Enter location' type='text' />
        </div>
        <div className={`${styles.usernameItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='startDate' label='Start Date' placeholder='Enter start date' type='date' />
        </div>
        <div className={`${styles.usernameItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='endDate' label='End Date' placeholder='Enter end date' type='date' /> 
        </div>
        <div className={`${styles.usernameItem}`}>
          <PlaceHolder onChange={frm.handleChange} id='status' label='Status' placeholder='Enter status' type='text' /> 
        </div>
        <div>
          <CustomizeButton/>
        </div>
      </form>
    </div>
  );
}

export default CreateContest;