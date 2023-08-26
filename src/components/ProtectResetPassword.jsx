import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectResetPassword = ({ children }) => {
  const userCookie = Cookie.get("user");

  const user = userCookie ? JSON.parse(userCookie) : null;

  if (!user?.forgotPasswordCode) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default ProtectResetPassword;
