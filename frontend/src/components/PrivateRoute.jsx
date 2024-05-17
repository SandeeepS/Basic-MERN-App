import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.userAuth);
  const { adminInfo } = useSelector((state) => state.adminAuth);

  // If either userInfo or adminInfo exists, allow access to the route
  return userInfo || adminInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;