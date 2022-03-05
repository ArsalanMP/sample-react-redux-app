
import { Navigate, useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useAppSelector } from "../app/hooks";
import { authState } from "../features/auth/authSlice";

const MainLayout = () => {
  let location = useLocation();

  const auth = useAppSelector(authState);

  if (auth.user === undefined) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Typography>this is my main</Typography>
    </>
  );
};

export default MainLayout;
