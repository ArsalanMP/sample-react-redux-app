import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { setMessage } from '../message/messageSlice';
import { login } from './authAPI';
import { IUserData } from './interface';
import store from "store";

export interface AuthState {
  user: IUserData | undefined;
  loading: boolean;
}

const localUser = store.get('user', undefined);

const initialState: AuthState = {
  user: localUser,
  loading: false,
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (userData: IUserData,{dispatch}) => {
    try {
      const response = await login(userData);
      store.set("user", response);
      return response;
    } catch (error: any) {
      dispatch(setMessage(error.message));
      return undefined;
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = undefined;
      store.remove("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export const authState = (state: RootState) => state.auth;

export default authSlice.reducer;
