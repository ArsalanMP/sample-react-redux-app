import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { useAppSelector } from '../app/hooks';
import { authState } from '../features/auth/authSlice';
import Drawer from './Drawer';

const MainLayout = () => {
  let location = useLocation();

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
      </Box>
    </>
  );
};

export default MainLayout;
