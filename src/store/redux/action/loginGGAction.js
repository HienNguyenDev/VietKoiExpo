// src/store/redux/action/loginGGAction.js

import axios from 'axios';
import { loginAction } from '../reducers/userReducer';

export const loginWithGoogle = (tokenId, navigate) => {
  return async (dispatch) => {
    try {
      console.log('Sending tokenId to backend:', tokenId);
      const response = await axios.post('https://localhost:7246/api/Auth/Google-Validation', { tokenId });
      const { data } = response;
      console.log('Received JWT from backend:', data);

      dispatch(loginAction(data));

      navigate('/home');
    } catch (error) {
      console.error('Error during Google login:', error);
      throw error;
    }
  };
};