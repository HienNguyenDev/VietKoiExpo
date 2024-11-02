// ApproveKoiEntries.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
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
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Snackbar
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerKoi,  } from '../../store/redux/action/koiRegisterAction';
import {assignKoiToContestActionApi, fetchAllContests }  from '../../store/redux/action/contestAction';
import { getKoiVarietiesApi} from '../../service/koiRegist';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from './ApproveKoiEntries.module.scss';
import { Alert } from 'antd';

const ApproveKoiEntries = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user?.userLogin?.userId);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [koiVarieties, setKoiVarieties] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [registeringCompetition, setRegisteringCompetition] = useState(false);
  const [koiId, setKoiId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const steps = ['Register Koi', 'Select Competition'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const varietiesData = await getKoiVarietiesApi();
        if (Array.isArray(varietiesData)) {
          setKoiVarieties(varietiesData);
        } else {
          console.error('Unexpected variety data format:', varietiesData);
        }

        const contestsData = await fetchAllContests();
        if (Array.isArray(contestsData)) {
          setCompetitions(contestsData);
        } else {
          console.error('Unexpected contests data format:', contestsData);
        }
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        setErrorMessage('Failed to fetch initial data.');
      }
    };
    fetchData();
  }, []);

  const formikStep1 = useFormik({
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
      size: yup.number().typeError('Size must be a number').required('Size is required'),
      age: yup.number().typeError('Age must be a number').required('Age is required'),
      imageUrl: yup.string().url('Enter a valid URL').required('Image URL is required'),
      status: yup.boolean().required('Status is required')
    }),
    onSubmit: () => {
      setOpen(true);
    }
  });

  const handleConfirmStep1 = async () => {
    setOpen(false);
    if (!userId) {
      setErrorMessage('User information is missing. Please log in again.');
      setSnackbar({ open: true, message: 'User information is missing. Please log in again.', severity: 'error' });
      return;
    }
    const dataToSend = {
      ...formikStep1.values,
      userId
    };

    try {
      const response = await dispatch(registerKoi(dataToSend));
      console.log('Register Koi Response:', response); // Should now log the response data

      if (response && response.koiId) {
        setKoiId(response.koiId); // Store the Koi ID
        setActiveStep(1); // Proceed to Step 2
        formikStep1.resetForm();
        setSnackbar({ open: true, message: 'Koi registration successful. Proceed to select a competition.', severity: 'success' });
      } else {
        throw new Error('Invalid response payload');
      }
    } catch (error) {
      setErrorMessage('Failed to register koi. Please try again.');
      setSnackbar({ open: true, message: 'Failed to register koi. Please try again.', severity: 'error' });
      console.error(error);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const formikStep2 = useFormik({
    initialValues: {
      competitionId: ''
    },
    validationSchema: yup.object({
      competitionId: yup.string().required('Competition selection is required')
    }),
    onSubmit: async (values) => {
      if (!userId) {
        setErrorMessage('User information is missing. Please log in again.');
        setSnackbar({ open: true, message: 'User information is missing. Please log in again.', severity: 'error' });
        return;
      }

      if (!koiId) {
        setErrorMessage('Koi ID is missing. Please register the Koi first.');
        setSnackbar({ open: true, message: 'Koi ID is missing. Please register the Koi first.', severity: 'error' });
        return;
      }

      setRegisteringCompetition(true);
      try {
        const response = await dispatch(assignKoiToContestActionApi(values.competitionId, koiId));
        console.log('Assign Koi to Competition Response:', response);
        setSnackbar({ open: true, message: 'Koi successfully registered for the competition!', severity: 'success' });
        formikStep2.resetForm();
        setActiveStep(0);
        setKoiId(null);
      } catch (error) {
        setErrorMessage('Failed to register Koi to competition. Please try again.');
        setSnackbar({ open: true, message: 'Failed to register Koi to competition. Please try again.', severity: 'error' });
        console.error(error);
      } finally {
        setRegisteringCompetition(false);
      }
    }
  });

  return (
    <Box className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Approve Koi Entries
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <>
          <Box component="form" className={styles.form} onSubmit={formikStep1.handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="varietyId-label">Variety ID</InputLabel>
              <Select
                labelId="varietyId-label"
                id="varietyId"
                name="varietyId"
                value={formikStep1.values.varietyId}
                onChange={formikStep1.handleChange}
                label="Variety ID"
              >
                {koiVarieties.map(variety => (
                  <MenuItem key={variety.varietyId} value={variety.varietyId}>
                    {variety.varietyName}
                  </MenuItem>
                ))}
              </Select>
              {formikStep1.touched.varietyId && formikStep1.errors.varietyId && (
                <Typography color="error">{formikStep1.errors.varietyId}</Typography>
              )}
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              id="koiName"
              name="koiName"
              label="Koi Name"
              value={formikStep1.values.koiName}
              onChange={formikStep1.handleChange}
              error={formikStep1.touched.koiName && Boolean(formikStep1.errors.koiName)}
              helperText={formikStep1.touched.koiName && formikStep1.errors.koiName}
            />

            <TextField
              fullWidth
              margin="normal"
              id="size"
              name="size"
              label="Size (cm)"
              type="number"
              value={formikStep1.values.size}
              onChange={formikStep1.handleChange}
              error={formikStep1.touched.size && Boolean(formikStep1.errors.size)}
              helperText={formikStep1.touched.size && formikStep1.errors.size}
            />

            <TextField
              fullWidth
              margin="normal"
              id="age"
              name="age"
              label="Age (years)"
              type="number"
              value={formikStep1.values.age}
              onChange={formikStep1.handleChange}
              error={formikStep1.touched.age && Boolean(formikStep1.errors.age)}
              helperText={formikStep1.touched.age && formikStep1.errors.age}
            />

            <TextField
              fullWidth
              margin="normal"
              id="imageUrl"
              name="imageUrl"
              label="Image URL"
              type="text"
              value={formikStep1.values.imageUrl}
              onChange={formikStep1.handleChange}
              error={formikStep1.touched.imageUrl && Boolean(formikStep1.errors.imageUrl)}
              helperText={formikStep1.touched.imageUrl && formikStep1.errors.imageUrl}
            />

            <FormControlLabel
              control={
                <Checkbox
                  id="status"
                  name="status"
                  checked={formikStep1.values.status}
                  onChange={formikStep1.handleChange}
                  color="primary"
                />
              }
              label="Active Status"
            />
            {formikStep1.touched.status && formikStep1.errors.status && (
              <Typography color="error">{formikStep1.errors.status}</Typography>
            )}

            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              style={{ marginTop: '16px' }}
            >
              Register Koi
            </Button>
          </Box>

          <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="confirm-dialog-title">
            <DialogTitle id="confirm-dialog-title">Confirm Koi Registration</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to register this Koi entry with the following details?
              </DialogContentText>
              <Typography variant="body1"><strong>Variety ID:</strong> {formikStep1.values.varietyId}</Typography>
              <Typography variant="body1"><strong>Koi Name:</strong> {formikStep1.values.koiName}</Typography>
              <Typography variant="body1"><strong>Size:</strong> {formikStep1.values.size} cm</Typography>
              <Typography variant="body1"><strong>Age:</strong> {formikStep1.values.age} years</Typography>
              <Typography variant="body1"><strong>Image URL:</strong> {formikStep1.values.imageUrl || 'No Image Provided'}</Typography>
              <Typography variant="body1"><strong>Status:</strong> {formikStep1.values.status ? 'Active' : 'Inactive'}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmStep1} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {activeStep === 1 && (
        <>
          <Box component="form" className={styles.form} onSubmit={formikStep2.handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="competitionId-label">Select Competition</InputLabel>
              <Select
                labelId="competitionId-label"
                id="competitionId"
                name="competitionId"
                value={formikStep2.values.competitionId}
                onChange={formikStep2.handleChange}
                label="Select Competition"
              >
                {competitions.map(competition => (
                  <MenuItem key={competition.compId} value={competition.compId}>
                    {competition.compName}
                  </MenuItem>
                ))}
              </Select>
              {formikStep2.touched.competitionId && formikStep2.errors.competitionId && (
                <Typography color="error">{formikStep2.errors.competitionId}</Typography>
              )}
            </FormControl>

            <Box display="flex" justifyContent="space-between" marginTop="16px">
              <Button
                variant="outlined"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={registeringCompetition}
              >
                {registeringCompetition ? <CircularProgress size={24} /> : 'Register for Competition'}
              </Button>
            </Box>
          </Box>
        </>
      )}

      {errorMessage && (
        <Typography color="error" variant="body2" style={{ marginTop: '16px' }}>
          {errorMessage}
        </Typography>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ApproveKoiEntries;