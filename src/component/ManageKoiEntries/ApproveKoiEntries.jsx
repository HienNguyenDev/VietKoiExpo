// ApproveKoiEntries.js
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
import { getKoiVarietiesApi } from '../../service/koiRegist';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from './ApproveKoiEntries.module.scss';
import BackButton from '../shared/button/BackButton'; // Import the BackButton component
import UploadImageComponent from '../shared/UploadImage/UploadImage';

const ApproveKoiEntries = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userReducer.userLogin.userId);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [koiVarieties, setKoiVarieties] = useState([]);

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

  const formik = useFormik({
    initialValues: {
      varietyId: '',
      koiName: '',
      size: '',
      age: '',
      imageUrl: '',
      status: true
    },
    validationSchema: yup.object({
      varietyId: yup.string().required('Variety ID is required'),
      koiName: yup.string().required('Koi name is required'),
      size: yup.number().typeError('Size must be a number').required('Size is required').min(0, 'Size cannot be negative'),
      age: yup.number().typeError('Age must be a number').required('Age is required').min(0, 'Age cannot be negative'),
      imageUrl: yup.string().url('Enter a valid URL').required('Image URL is required'),
      status: yup.boolean().required('Status is required')
    }),
    onSubmit: () => {
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
      userId
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

  const handleImageUploadSuccess = (url) => {
    formik.setFieldValue('imageUrl', url);
  };

  return (
    <Box className={styles.container}>
      <BackButton /> {/* Include the BackButton component */}
      <Typography variant="h4" gutterBottom className={styles.title}>
        Register Koi Entry
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
            label="Variety ID"
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
          label="Koi Name"
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
          label="Size (cm)"
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
          id="age"
          name="age"
          label="Age (years)"
          type="number"
          value={formik.values.age}
          onChange={formik.handleChange}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
          className={styles.textField}
        />

        <UploadImageComponent
          onSuccess={handleImageUploadSuccess}
          defaultUrl={formik.values.imageUrl}
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
          <Typography variant="body1" style={{ color: '#000000' }}><strong>Age:</strong> {formik.values.age} years</Typography>
          <Typography variant="body1" style={{ color: '#000000' }}><strong>Image URL:</strong> {formik.values.imageUrl || 'No Image Provided'}</Typography>
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