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
import UploadImageComponent from '../../component/shared/UploadImage/UploadImage';
import { Box } from '@mui/system';

const RegisterForm = () => {
  const handleImageUploadSuccess = (url) => {
    console.log('Image uploaded successfully:', url);
    frm.setFieldValue('imageUrl', url);
  };
  const defaultImageUrl = '';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

   // Update the validation schema in RegisterForm.jsx
   const frm = useFormik({ initialValues: { password: '', confirmPassword: '', email: '', role: 'member', fullName: '', phone: '', address: '', imageUrl: '', experience: 0, status: true }, onSubmit: (values) => { const { confirmPassword, ...dataToSend } = values; console.log('value', dataToSend); const actionAsync = registerActionApi(dataToSend, navigate, setSuccessMessage, setErrorMessage); dispatch(actionAsync); }, validationSchema: yup.object().shape({   password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      'Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một số và một ký tự đặc biệt'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
    .required('Xác nhận mật khẩu là bắt buộc'), email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'), fullName: yup.string().required('Họ và tên là bắt buộc'), phone: yup.string().required('Số điện thoại là bắt buộc'), address: yup.string().required('Địa chỉ là bắt buộc'), imageUrl: yup.string().url('URL không hợp lệ').required('URL hình ảnh là bắt buộc'), experience: yup.number().required('Kinh nghiệm là bắt buộc').min(0, 'Kinh nghiệm không thể là số âm'), status: yup.boolean().required('Trạng thái là bắt buộc') }) });

  return (
      <div className={styles.container}>
        <form onSubmit={frm.handleSubmit} autoComplete="off" className={styles.registerForm}>
          <div className={styles.tittleRegister}>
            <h1>Đăng ký</h1>
          </div>
          {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
          {successMessage && <Alert message={successMessage} type="success" showIcon />}
          <div className={styles.formItem}>
            <PlaceHolder onChange={frm.handleChange} id='email' label='Email' placeholder='Nhập email của bạn' type='email' />
            {frm.errors.email && frm.touched.email && <div className={styles.error}>{frm.errors.email}</div>}
          </div>
          <div className={styles.formItem}>
            <PlaceHolder 
              onChange={frm.handleChange} 
              id='password' 
              label='Mật khẩu' 
              placeholder='Nhập mật khẩu của bạn (tối thiểu 8 ký tự, 1 chữ hoa, 1 số, 1 ký tự đặc biệt)' 
              type='password' 
            />
            {frm.errors.password && frm.touched.password && 
              <div className={styles.error}>{frm.errors.password}</div>
            }
          </div>
          <div className={styles.formItem}>
            <PlaceHolder onChange={frm.handleChange} id='confirmPassword' label='Xác nhận mật khẩu' placeholder='Xác nhận mật khẩu của bạn' type='password' />
            {frm.errors.confirmPassword && frm.touched.confirmPassword && <div className={styles.error}>{frm.errors.confirmPassword}</div>}
          </div>
          <div className={styles.formItem}>
            <PlaceHolder onChange={frm.handleChange} id='fullName' label='Họ và tên' placeholder='Nhập họ và tên của bạn' type='text' />
            {frm.errors.fullName && frm.touched.fullName && <div className={styles.error}>{frm.errors.fullName}</div>}
          </div>
          <div className={styles.formItem}>
            <PlaceHolder onChange={frm.handleChange} id='phone' label='Số điện thoại' placeholder='Nhập số điện thoại của bạn' type='text' />
            {frm.errors.phone && frm.touched.phone && <div className={styles.error}>{frm.errors.phone}</div>}
          </div>
          <div className={styles.formItem}>
            <PlaceHolder onChange={frm.handleChange} id='address' label='Địa chỉ' placeholder='Nhập địa chỉ của bạn' type='text' />
            {frm.errors.address && frm.touched.address && <div className={styles.error}>{frm.errors.address}</div>}
          </div>
          <div className={styles.formItem}>
            <Box id='imageUrl' placeholder='Nhập URL hình ảnh của bạn' type='text' />
            <UploadImageComponent onChange={(imageUrl) => frm.setFieldValue('imageUrl', imageUrl)} label='URL hình ảnh' onSuccess={(url) => handleImageUploadSuccess(url)} defaultUrl={defaultImageUrl} />
            {frm.errors.imageUrl && frm.touched.imageUrl && <div className={styles.error}>{frm.errors.imageUrl}</div>}
          </div>
          <div className={styles.formItem}>
            <PlaceHolder onChange={frm.handleChange} id='experience' label='Kinh nghiệm' placeholder='Nhập kinh nghiệm của bạn' type='number' />
            {frm.errors.experience && frm.touched.experience && <div className={styles.error}>{frm.errors.experience}</div>}
          </div>
          <Row className={styles.actionItems}>
            <Col offset={3} span={4}>
              <CustomizeButton onClick={frm.handleSubmit} />
            </Col>
            <Col style={{marginTop:'60px',color:'#ff6d1f'}} offset={1} span={12} className={styles.haveAccountItem}>
              <Link to='/login' className={styles.link}>Bạn đã có tài khoản? Đăng nhập tại đây</Link>
            </Col>
          </Row>
        </form>
      </div>
    );
}

export default RegisterForm;
