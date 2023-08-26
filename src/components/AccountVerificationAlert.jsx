import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoInfo } from "../icons/index";
import { resendVerificationCode } from "../service/authService";
import Cookie from "js-cookie";
import { useTheme } from "../context/ThemeContext";
import VerifyEmailModal from "./VerifyEmailModal";

const AccountVerificationAlert = () => {
  const dispatch = useDispatch();
  const { resendVerificationCodeLoading } = useSelector((state) => state.auth);

  const token = Cookie.get("token");

  const { user } = useSelector((state) => state.auth);

  const { isDarkMode } = useTheme();

  const [isVerifyEmailModalOpen, setIsVerifyEmailModalOpen] = useState(false);

  const sendOTP = async () => {
    await dispatch(resendVerificationCode());
    setIsVerifyEmailModalOpen(true);
  };


  return (
    <div>
      {token && !user?.emailVerified && (
        <div
          className={`flex justify-center py-2 ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          <div
            className={`p-1 text-red-900 border rounded-lg max-w-md max-h-16 ${
              isDarkMode ? "bg-red-300" : "bg-red-200"
            }`}
            role="alert"
          >
            <div className="flex items-center gap-2">
              <GoInfo />
              <h3 className="text-base font-medium">Verification Account</h3>
            </div>
            <div
              className={`text-sm flex gap-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Your account is not verified. Please verify your email.
              <button
                onClick={sendOTP}
                className={`text-white focus:outline-none font-medium rounded-lg text-xs px-2 py-1 text-center items-center ${
                  isDarkMode ? "bg-blue-600" : "bg-blue-500"
                }`}
              >
                {resendVerificationCodeLoading ? (
                  <div className="relative">
                    <div className="w-5 h-5 border-purple-200 border-2 rounded-full"></div>
                    <div className="w-5 h-5 border-purple-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
                  </div>
                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {isVerifyEmailModalOpen && (
        <VerifyEmailModal
          isOpen={isVerifyEmailModalOpen}
          onClose={() => setIsVerifyEmailModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AccountVerificationAlert;
