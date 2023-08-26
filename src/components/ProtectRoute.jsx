import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectRoute = ({ children }) => {
  const token = Cookie.get("token");

  const userCookie = Cookie.get("user");

  const user = userCookie ? JSON.parse(userCookie) : null;

  const Authentication = !user?.forgotPasswordCode && token;

  if (!Authentication) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default ProtectRoute;
