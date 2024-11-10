// src/component/GoogleLoginComponent.js

import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { loginWithGoogle } from '../../store/redux/action/loginGGAction';
import { useNavigate } from 'react-router-dom';
import { Alert, Button } from 'antd';
import logoGoogle from '../../asset/logo/Google_Icons-09-512.webp';
import styles from '../../asset/scss/LoginForm.module.scss';

const GoogleLoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleSuccess = async (response) => {
    console.log('Google login success:', response);
    const { tokenId } = response;
    try {
      await dispatch(loginWithGoogle(tokenId, navigate));
    } catch (error) {
      console.error('Google login error:', error);
      setErrorMessage('Google login failed. Please try again.');
    }
  };

  const handleGoogleFailure = (response) => {
    console.error('Google login failure:', response);
    setErrorMessage('Google login failed. Please try again.');
  };

  return (
    <div>
      {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
      <GoogleLogin
        clientId="676957431672-9mb5rgvuvpb000p93e3i8f7jg622a9ln.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
        cookiePolicy={'single_host_origin'}
        render={renderProps => (
          <Button type="primary" htmlType="button" className={styles.googleButton} onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <div className={styles.loginWithGoogle}>
              <p>Login With Google</p>
              <img src={logoGoogle} alt="Google Logo" />
            </div>
          </Button>
        )}
      />
    </div>
  );
};

export default GoogleLoginComponent;