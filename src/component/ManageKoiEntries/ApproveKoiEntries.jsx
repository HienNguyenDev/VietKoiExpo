import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button as MuiButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerKoi } from '../../store/redux/action/koiRegisterAction';
import { getKoiVarietiesApi } from '../../service/koiRegistAPI';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from './ApproveKoiEntries.module.scss';
import BackButton from '../shared/button/BackButton'; // Import the BackButton component
import UploadImageComponent from '../shared/UploadImage/UploadImage';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const ApproveKoiEntries = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userReducer.userLogin.userId);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [koiVarieties, setKoiVarieties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKoiVarieties = async () => {
      try {
        const data = await getKoiVarietiesApi();
        if (Array.isArray(data)) {
          setKoiVarieties(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Failed to fetch koi varieties:', error);
      }
    };
    fetchKoiVarieties();
  }, []);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    // Calculate months for partial year
    const months = monthDiff < 0 ? 12 + monthDiff : monthDiff;
    const partialYear = months / 12;
    
    // Round based on 0.5 threshold
    return partialYear >= 0.5 ? Math.ceil(age) : Math.floor(age);
  };

  const formik = useFormik({
    initialValues: {
      varietyId: '',
      koiName: '',
      size: '',
      birthDate: '',
      imageUrl: '',
      certificateImageUrl: '',
      status: true
    },
    validationSchema: yup.object({
      varietyId: yup.string().required('Loại cá Koi là bắt buộc'),
      koiName: yup.string().required('Tên cá Koi là bắt buộc'),
      size: yup.number()
        .typeError('Kích thước phải là số')
        .required('Kích thước là bắt buộc')
        .min(0, 'Kích thước không thể âm'),
      birthDate: yup.date()
        .required('Ngày sinh là bắt buộc')
        .max(new Date(), 'Ngày sinh không thể trong tương lai'),
      imageUrl: yup.string()
        .url('URL không hợp lệ')
        .required('Ảnh cá Koi là bắt buộc'),
      certificateImageUrl: yup.string()
        .url('URL không hợp lệ')
        .required('Ảnh chứng chỉ là bắt buộc'),
      status: yup.boolean().required('Trạng thái là bắt buộc')
    }),
    onSubmit: (values) => {
      const age = calculateAge(values.birthDate);
      const dataToSend = {
        ...values,
        userId,
        age
      };
      setOpen(true);
    }
  });

  const handleConfirm = async () => {
    setOpen(false);
    if (!userId) {
      setErrorMessage('User information is missing. Please log in again.');
      return;
    }
    const dataToSend = {
      ...formik.values,
      userId,
      age: calculateAge(formik.values.birthDate)
    };

    try {
      await dispatch(registerKoi(dataToSend));
      formik.resetForm();
      alert('Registration successful. Awaiting approval.');
    } catch (error) {
      setErrorMessage('Failed to register koi. Please try again.');
      console.error(error);
    }
  };

  const handleKoiImageUpload = (url) => {
    formik.setFieldValue('imageUrl', url);
  };

  const handleCertificateImageUpload = (url) => {
    formik.setFieldValue('certificateImageUrl', url);
  };

  return (
    <Box className={styles.container}>
      <Button className={styles.backButton} onClick={() => navigate('/home')}>Quay về trang chủ</Button>
      <Typography variant="h4" gutterBottom className={styles.title}>
        Đăng kí form cá Koi
      </Typography>
      <Box component="form" className={styles.form} onSubmit={formik.handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="varietyId-label" className={styles.textField}>Variety ID</InputLabel>
          <Select
            labelId="varietyId-label"
            id="varietyId"
            name="varietyId"
            value={formik.values.varietyId}
            onChange={formik.handleChange}
            label="Loại cá"
            className={styles.textField}
          >
            {koiVarieties.map(variety => (
              <MenuItem key={variety.varietyId} value={variety.varietyId}>
                {variety.varietyName}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.varietyId && formik.errors.varietyId && (
            <Typography color="error">{formik.errors.varietyId}</Typography>
          )}
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          id="koiName"
          name="koiName"
          label="Tên của Koi"
          value={formik.values.koiName}
          onChange={formik.handleChange}
          error={formik.touched.koiName && Boolean(formik.errors.koiName)}
          helperText={formik.touched.koiName && formik.errors.koiName}
          className={styles.textField}
        />

        <TextField
          fullWidth
          margin="normal"
          id="size"
          name="size"
          label="Kích thước (cm)"
          type="number"
          value={formik.values.size}
          onChange={formik.handleChange}
          error={formik.touched.size && Boolean(formik.errors.size)}
          helperText={formik.touched.size && formik.errors.size}
          className={styles.textField}
        />

        <TextField
          fullWidth
          margin="normal"
          id="birthDate"
          name="birthDate"
          label="Ngày sinh"
          type="date"
          value={formik.values.birthDate}
          onChange={formik.handleChange}
          error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
          helperText={formik.touched.birthDate && formik.errors.birthDate}
          className={styles.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <p>Ảnh cá Koi</p>
        <UploadImageComponent
          onSuccess={handleKoiImageUpload}
          defaultUrl={formik.values.imageUrl}
        />

        <p>Ảnh chứng chỉ</p>
        <UploadImageComponent
          onSuccess={handleCertificateImageUpload}
          defaultUrl={formik.values.certificateImageUrl}
        />

        <FormControlLabel
          control={
            <Checkbox
              id="status"
              name="status"
              checked={formik.values.status}
              onChange={formik.handleChange}
              color="primary"
            />
          }
          label="Active Status"
          style={{ color: '#ffffff' }}
        />
        {formik.touched.status && formik.errors.status && (
          <Typography color="error">{formik.errors.status}</Typography>
        )}

        <MuiButton
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          className={styles.submitButton}
        >
          Register
        </MuiButton>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="confirm-dialog-title">
        <DialogTitle id="confirm-dialog-title" className={styles.dialogTitle}>Confirm Registration</DialogTitle>
        <DialogContent>
          <DialogContentText className={styles.dialogContentText}>
            Are you sure you want to register this Koi entry with the following details?
          </DialogContentText>
          <Typography variant="body1" style={{ color: '#000000' }}><strong>Variety ID:</strong> {formik.values.varietyId}</Typography>
          <Typography variant="body1" style={{ color: '#000000' }}><strong>Koi Name:</strong> {formik.values.koiName}</Typography>
          <Typography variant="body1" style={{ color: '#000000' }}><strong>Size:</strong> {formik.values.size} cm</Typography>
          <Typography variant="body1" style={{ color: '#000000' }}><strong>Age:</strong> {calculateAge(formik.values.birthDate)} years</Typography>
          <Typography variant="body1" style={{ color: '#000000' }}><strong>Birth Date:</strong> {new Date(formik.values.birthDate).toLocaleDateString()}</Typography>
          <Typography variant="body1" style={{ color: '#000000' }}><strong>Image URL:</strong> {formik.values.imageUrl || 'No Image Provided'}</Typography>
          <Typography variant="body1" style={{ color: '#000000' }}><strong>Certificate Image URL:</strong> {formik.values.certificateImageUrl || 'No Image Provided'}</Typography>
          <Typography variant="body1" style={{ color: '#000000' }}><strong>Status:</strong> {formik.values.status ? 'Active' : 'Inactive'}</Typography>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={() => setOpen(false)} className={styles.dialogButton}>
            Cancel
          </MuiButton>
          <MuiButton onClick={handleConfirm} className={styles.dialogButton}>
            Confirm
          </MuiButton>
        </DialogActions>
      </Dialog>

      {errorMessage && (
        <Typography color="error" variant="body2" style={{ marginTop: '16px' }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default ApproveKoiEntries;