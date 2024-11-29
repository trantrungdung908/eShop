import { PATHS } from "@/constants/path";
import { tokenMethod } from "@/utils/tokenMethod";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  if (tokenMethod.get() === null) {
    return <Navigate to={PATHS.HOME} />;
  }
  return <Outlet />;
};

export default PrivateRoute;
