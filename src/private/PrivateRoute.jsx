import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Component }) => {
  const userLogin = useSelector(state => state.userReducer.userLogin);

  return userLogin.userId ? <Component /> : <Navigate to="/home" />;
};

export default PrivateRoute;

