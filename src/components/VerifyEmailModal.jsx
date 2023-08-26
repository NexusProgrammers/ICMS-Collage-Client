import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { resendVerificationCode, verifyEmail } from "../service/authService";
import Cookie from "js-cookie";
import { useTheme } from "../context/ThemeContext";
import Spinner from "./Spinner";

const VerifyEmailModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { verifyEmailLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const { resendVerificationCodeLoading } = useSelector((state) => state.auth);
  const userCookie = Cookie.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const updatedVerificationCode = [...verificationCode];
      updatedVerificationCode[index] = value;
      setVerificationCode(updatedVerificationCode);

      if (value.length === 1 && index < inputRefs.current.length - 1) {
        const nextInputRef = inputRefs.current[index + 1];
        if (nextInputRef && nextInputRef.current) {
          nextInputRef.current.focus();
        }
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedChars = pastedData
      .split("")
      .filter((char) => /^\d*$/.test(char));

    const updatedVerificationCode = [...verificationCode];
    for (
      let i = 0;
      i < Math.min(pastedChars.length, inputRefs.current.length);
      i++
    ) {
      updatedVerificationCode[i] = pastedChars[i];
    }

    setVerificationCode(updatedVerificationCode);

    if (
      pastedChars.length >= 1 &&
      pastedChars.length < inputRefs.current.length
    ) {
      const nextInputRef = inputRefs.current[pastedChars.length];
      if (nextInputRef && nextInputRef.current) {
        nextInputRef.current.focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && verificationCode[index] === "") {
      const updatedVerificationCode = [...verificationCode];
      updatedVerificationCode[index] = "";
      setVerificationCode(updatedVerificationCode);

      if (index > 0) {
        inputRefs.current[index - 1].current.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const joinedVerificationCode = verificationCode.join("");
    const response = await dispatch(
      await dispatch(
        verifyEmail({ verificationCode: joinedVerificationCode, navigate })
      )
    );
    if (response?.payload?.success) {
      onClose();
    }
  };

  const handleResetOTP = async () => {
    await dispatch(resendVerificationCode());
  };

  return (
    <>
      {verifyEmailLoading && <Spinner />}

      <Modal
        open={isOpen}
        onClose={null}
        className={`flex items-center justify-center h-full px-5 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div
          className={`max-w-lg flex flex-col gap-8 p-12 bg-${
            isDarkMode ? "gray-900" : "white"
          } shadow-md hover:shadow-xl rounded-md text-${
            isDarkMode ? "white" : "black"
          }`}
        >
          <div
            className={`font-semibold text-3xl flex justify-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Email Verification
          </div>
          <div
            className={`flex flex-row text-sm font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-400"
            }`}
          >
            <p>We have sent a code to your email {user?.email}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-8">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-md">
                {verificationCode.map((code, index) => (
                  <div key={index} className="w-12 h-12">
                    <input
                      ref={inputRefs.current[index]}
                      className={`w-full h-full flex items-center justify-center text-center px-4 outline-none rounded-xl border ${
                        isDarkMode ? "border-gray-600" : "border-gray-200"
                      } text-lg bg-white ${
                        isDarkMode ? "text-black" : "text-black"
                      } focus:bg-${
                        isDarkMode ? "gray" : "white"
                      }-50 focus:ring-1 ${
                        isDarkMode ? "ring-gray-600" : "ring-blue-700"
                      }`}
                      type="text"
                      value={code}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleBackspace(e, index)}
                      onPaste={handlePaste}
                      maxLength={1}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-row space-x-4 mt-4 justify-center">
                <Button
                  type="button"
                  onClick={onClose}
                  size="small"
                  variant="contained"
                  color="error"
                  sx={{ textTransform: "none" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  color="success"
                  sx={{ textTransform: "none" }}
                >
                  Verify
                </Button>
              </div>
            </div>
          </form>
          <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 py-6">
            <p>Didn't receive code?</p>
            {resendVerificationCodeLoading ? (
              <div className="relative">
                <div className="w-5 h-5 border-purple-200 border-2 rounded-full"></div>
                <div className="w-5 h-5 border-purple-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleResetOTP}
                className="flex flex-row items-center text-blue-600"
              >
                Resend
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VerifyEmailModal;
