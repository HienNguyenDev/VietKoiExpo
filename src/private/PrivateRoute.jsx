// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Component }) => {
  const userLogin = useSelector(state => state.userReducer.userLogin);

  // Check if userLogin exists and has userId
  if (!userLogin || !userLogin.userId) {
    return <Navigate to="/home" replace />;
  }

  return <Component />;
};

export default PrivateRoute;