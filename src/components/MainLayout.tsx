import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Box, Snackbar } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { authState } from '../features/auth/authSlice';
import Drawer from './Drawer';
import {
  messageState,
  setMessage,
} from '../features/message/messageSlice';

const MainLayout = () => {
  let location = useLocation();

  const dispatch = useAppDispatch();
  const messageValue = useAppSelector(messageState);
  const auth = useAppSelector(authState);

  if (auth.user === undefined) {
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  return (
    <>
      <Box display="flex" width="100%" height="100%">
        <Drawer />
        <Box flex={1}>
          <Outlet />
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={5000}
          open={messageValue !== ''}
          onClose={() => {
            dispatch(setMessage(''));
          }}
          message={messageValue}
        />
      </Box>
    </>
  );
};

export default MainLayout;
