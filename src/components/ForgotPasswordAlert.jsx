import { GoInfo } from "../icons/index";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { cancelForgotPasswordCode } from "../service/authService";
import { useTheme } from "../context/ThemeContext";
import {} from "react-router-dom";

const ForgotPasswordAlert = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cancelForgotPasswordLoading } = useSelector((state) => state.auth);
  const userCookie = Cookie.get("user");

  const user = userCookie ? JSON.parse(userCookie) : null;
  const token = Cookie.get("token");

  const handleCancel = () => {
    dispatch(cancelForgotPasswordCode({ navigate }));
  };

  const { isDarkMode } = useTheme();

  return (
    user?.forgotPasswordCode &&
    token && (
      <div
        className={`flex justify-center py-2 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div
          className={`p-1 text-red-900 border rounded-lg max-w-xl max-h-16 ${
            isDarkMode ? "bg-red-300" : "bg-red-200"
          }`}
          role="alert"
        >
          <div className="flex items-center gap-2">
            <GoInfo />
            <h3 className="text-base font-medium">Forgot Password</h3>
          </div>
          <div
            className={`text-sm flex items-center gap-2 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <p>Password reset requested. Check email for code.</p>
            <div className="flex justify-center gap-2">
              {cancelForgotPasswordLoading ? (
                <div className="relative">
                  <div className="w-5 h-5 border-purple-200 border-2 rounded-full"></div>
                  <div
                    className={`w-5 h-5 ${
                      isDarkMode ? "border-gray-700" : "border-purple-700"
                    } border-t-2 animate-spin rounded-full absolute left-0 top-0`}
                  ></div>
                </div>
              ) : (
                <button
                  onClick={handleCancel}
                  className={`text-white focus:outline-none font-medium rounded-lg text-xs px-2 py-1 text-center items-center ${
                    isDarkMode ? "bg-blue-600" : "bg-blue-500"
                  }`}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ForgotPasswordAlert;
