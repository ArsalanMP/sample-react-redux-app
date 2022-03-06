import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import logo from '../../logo.svg';
import { authState, loginAsync } from './authSlice';
import { IUserData } from './interface';

import { clearMessage, message } from '../message/messageSlice';

const initialLoginData: IUserData = Object.freeze({
  username: '',
  password: '',
});

const initialErrorState = Object.freeze({
  apiError: '',
  usernameError: '',
  passwordError: '',
});

const Auth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(authState);
  const messageValue = useAppSelector(message);
  const [formData, setFormData] = React.useState(initialLoginData);
  const [errors, setErrors] = useState(initialErrorState);

  useEffect(() => {
    if (messageValue) {
      dispatch(clearMessage());
      setErrors({ ...errors, apiError: messageValue });
    }
  }, [messageValue]);

  if (auth.user !== undefined) {
    return <Navigate to="/" />;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setErrors({ ...errors, apiError: '' });
    const loginData: IUserData = {
      username: formData.username,
      password: formData?.password,
    };

    dispatch(loginAsync(loginData));
  };

  const usernameOnChange = (e: any) => {
    const data = e.target.value.trim();
    setFormData({
      ...formData,
      username: data,
    });
    if (data === '') {
      setErrors({ ...errors, usernameError: 'Username is required' });
    } else if (data.length < 4) {
      setErrors({
        ...errors,
        usernameError: 'Username must have a minimum length of 4',
      });
    } else {
      setErrors({ ...errors, usernameError: '' });
    }
  };

  const passwordOnChange = (e: any) => {
    const data = e.target.value.trim();
    setFormData({
      ...formData,
      password: data,
    });
    if (data === '') {
      setErrors({ ...errors, passwordError: 'Password is required' });
    } else if (data.length < 5) {
      setErrors({
        ...errors,
        passwordError: 'Password must have a minimum length of 5',
      });
    } else {
      setErrors({ ...errors, passwordError: '' });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      alignItems="center"
    >
      <img src={logo} className="App-logo" alt="logo" />
      <Box component="form" onSubmit={onSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          id="username"
          label="Username"
          name="username"
          onChange={usernameOnChange}
          error={errors.usernameError !== ''}
          helperText={errors.usernameError}
          autoFocus
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={passwordOnChange}
          error={errors.passwordError !== ''}
          helperText={errors.passwordError}
        />
        <Box>
          {!auth.loading ? (
            <Button
              fullWidth
              color="primary"
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          ) : (
            <LinearProgress />
          )}
        </Box>
      </Box>
      {errors.apiError && (
        <Box color="red" margin="10px">
          <Typography>{errors.apiError}</Typography>
        </Box>
      )}
      <Box color="green" margin="10px">
        <Typography>Please login as arsalan:test123</Typography>
      </Box>
    </Box>
  );
};

export default Auth;
