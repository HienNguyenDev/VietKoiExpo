import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Outlet } from 'react-router-dom';

const ManageUsersPage = () => {
  // This is just dummy data. Replace this with actual user data.
  const users = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
    // ...
  ];

  return (
    <div style={{background:'#ffffff'}}>
      <h1>Manage Users</h1>
      <Button variant="contained" color="primary">Create User</Button>
     
      <Outlet />
    </div>
  );
};

export default ManageUsersPage;