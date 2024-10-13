import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ApproveKoiEntries = () => {
  const [koiDetails, setKoiDetails] = useState({
    name: '',
    size: '',
    age: '',
    photo: '',
    ownerName: '',
    contactInfo: '',
    description: '',
  });
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKoiDetails({ ...koiDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true); // Open the confirmation dialog
  };

  const handleConfirm = () => {
    setOpen(false);
    // Handle form submission logic here
    console.log('Koi Details:', koiDetails);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Approve Koi Entry
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: '300px',
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Koi Name"
          name="name"
          value={koiDetails.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Size (cm)"
          name="size"
          type="number"
          value={koiDetails.size}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Age (years)"
          name="age"
          type="number"
          value={koiDetails.age}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Photo URL"
          name="photo"
          value={koiDetails.photo}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Owner Name"
          name="ownerName"
          value={koiDetails.ownerName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Contact Information"
          name="contactInfo"
          value={koiDetails.contactInfo}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={koiDetails.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Approve
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleCancel}
      >
        <DialogTitle>Confirm Approval</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve this Koi entry with the following details?
          </DialogContentText>
          <Typography variant="body1"><strong>Koi Name:</strong> {koiDetails.name}</Typography>
          <Typography variant="body1"><strong>Size:</strong> {koiDetails.size} cm</Typography>
          <Typography variant="body1"><strong>Age:</strong> {koiDetails.age} years</Typography>
          <Typography variant="body1"><strong>Owner Name:</strong> {koiDetails.ownerName}</Typography>
          <Typography variant="body1"><strong>Contact Information:</strong> {koiDetails.contactInfo}</Typography>
          <Typography variant="body1"><strong>Description:</strong> {koiDetails.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApproveKoiEntries;