import { useContext } from "react";
import { Route } from "react-router";
import { Navigate } from "react-router-dom";
import AuthContext from "../providers/AuthProvider";
const PrivateRoute = (props) => {
  const authCtx = useContext(AuthContext);
  console.log({ authCtx });
  return authCtx.isLoggedIn ? props.children : <Navigate to="/auth" />;
};
export default PrivateRoute;
