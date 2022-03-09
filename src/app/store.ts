import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import messageReducer from '../features/message/messageSlice';
import dataTableReducer from '../features/dataTable/dataTableSlice';
import galleryReducer from '../features/gallery/gallerySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    dataTable: dataTableReducer,
    gallery: galleryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
