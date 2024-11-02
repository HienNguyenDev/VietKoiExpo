// UploadKoiForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerKoi } from '../../../store/redux/action/koiRegisterAction';
import { useFormik } from 'formik';
import * as yup from 'yup';

const UploadKoiForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user); // Lấy thông tin người dùng từ Redux store
  const [errorMessage, setErrorMessage] = useState('');

  const frm = useFormik({
    initialValues: {
      varietyId: '',
      koiName: '',
      size: 0,
      age: 0,
      imageUrl: '',
      status: true
    },
    onSubmit: async (values) => {
      const dataToSend = {
        ...values,
        userId: user.id // Sử dụng userId từ thông tin người dùng
      };
      try {
        await dispatch(registerKoi(dataToSend));
      } catch (error) {
        setErrorMessage('Failed to upload koi. Please try again.');
      }
    },
    validationSchema: yup.object().shape({
      varietyId: yup.string().required('Variety ID is required'),
      koiName: yup.string().required('Koi name is required'),
      size: yup.number().required('Size is required'),
      age: yup.number().required('Age is required'),
      imageUrl: yup.string().required('Image URL is required'),
      status: yup.boolean().required('Status is required')
    })
  });

  return (
    <form onSubmit={frm.handleSubmit}>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <input type="text" id="varietyId" name="varietyId" onChange={frm.handleChange} value={frm.values.varietyId} placeholder="Variety ID" />
      {frm.errors.varietyId && frm.touched.varietyId && <div style={{ color: 'red' }}>{frm.errors.varietyId}</div>}
      <input type="text" id="koiName" name="koiName" onChange={frm.handleChange} value={frm.values.koiName} placeholder="Koi Name" />
      {frm.errors.koiName && frm.touched.koiName && <div style={{ color: 'red' }}>{frm.errors.koiName}</div>}
      <input type="number" id="size" name="size" onChange={frm.handleChange} value={frm.values.size} placeholder="Size" />
      {frm.errors.size && frm.touched.size && <div style={{ color: 'red' }}>{frm.errors.size}</div>}
      <input type="number" id="age" name="age" onChange={frm.handleChange} value={frm.values.age} placeholder="Age" />
      {frm.errors.age && frm.touched.age && <div style={{ color: 'red' }}>{frm.errors.age}</div>}
      <input type="text" id="imageUrl" name="imageUrl" onChange={frm.handleChange} value={frm.values.imageUrl} placeholder="Image URL" />
      {frm.errors.imageUrl && frm.touched.imageUrl && <div style={{ color: 'red' }}>{frm.errors.imageUrl}</div>}
      <input type="checkbox" id="status" name="status" onChange={frm.handleChange} checked={frm.values.status} />
      {frm.errors.status && frm.touched.status && <div style={{ color: 'red' }}>{frm.errors.status}</div>}
      <button type="submit">Upload Koi</button>
    </form>
  );
};

export default UploadKoiForm;