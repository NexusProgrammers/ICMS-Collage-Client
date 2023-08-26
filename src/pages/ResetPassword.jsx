import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  HiArrowRight,
} from "../icons/index";
import { resetPasswordSchema } from "../schemas/userSchema";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Cookie from "js-cookie";
import { resetPassword } from "../service/authService";
import { useTheme } from "../context/ThemeContext";
import { Spinner } from "../components";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetPasswordLoading } = useSelector((state) => state.auth);

  const userCookie = Cookie.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
  const { _id } = user;

  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [confirmNewPasswordShow, setConfirmNewPasswordShow] = useState(false);

  const handleToggleNewPasswordVisibility = () => {
    setNewPasswordShow(!newPasswordShow);
  };

  const handleToggleConfirmNewPasswordVisibility = () => {
    setConfirmNewPasswordShow(!confirmNewPasswordShow);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        newPassword: "",
        confirm_new_password: "",
      },
      validationSchema: resetPasswordSchema,
      onSubmit: async (values) => {
       await dispatch(resetPassword({ values, navigate, _id }));
      },
    });

  const { newPassword, confirm_new_password } = values;

  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.title = 'ICMS Collage | Reset Password';
  }, []);

  return (
    <div
      className={`flex justify-center items-center h-screen px-6 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {resetPasswordLoading && <Spinner />}
      <div
        className={`w-[33rem] p-8 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-md hover:shadow-xl rounded-md h-[28rem]`}
      >
        <h4
          className={`text-xl font-medium mb-8 flex items-center justify-center ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Reset Password
        </h4>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4 h-[6rem]">
            <label htmlFor="newPassword" className="block mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                onCopy={(e) => {
                  e.preventDefault();
                  toast.error("Cannot copy from new password field");
                  return false;
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  toast.error("Cannot paste into new password field");
                  return false;
                }}
                type={newPasswordShow ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded py-2 px-3 ${
                  errors.newPassword && touched.newPassword
                    ? "border-red-500"
                    : "border-gray-400"
                } text-black bg-white`}
              />
              <button
                type="button"
                onClick={handleToggleNewPasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 "
              >
                {newPasswordShow ? (
                  <AiOutlineEye
                    className={`w-6 h-6 ${isDarkMode ? "text-black" : ""}`}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className={`w-6 h-6 ${isDarkMode ? "text-black" : ""}`}
                  />
                )}
              </button>
            </div>
            {errors.newPassword && touched.newPassword && (
              <p
                className={`${
                  isDarkMode ? "text-red-500" : "text-red-500"
                } text-sm h-4`}
              >
                {errors.newPassword}
              </p>
            )}
          </div>

          <div className="mb-4 h-[4rem]">
            <label htmlFor="confirm_new_password" className="block mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                onCopy={(e) => {
                  e.preventDefault();
                  toast.error("Cannot copy from confirm new password field");
                  return false;
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  toast.error("Cannot paste into confirm new password  field");
                  return false;
                }}
                type={confirmNewPasswordShow ? "text" : "password"}
                id="confirm_new_password"
                name="confirm_new_password"
                value={confirm_new_password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded py-2 px-3 ${
                  errors.confirm_new_password && touched.confirm_new_password
                    ? "border-red-500"
                    : "border-gray-400"
                } text-black bg-white`}
              />
              <button
                type="button"
                onClick={handleToggleConfirmNewPasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 "
              >
                {confirmNewPasswordShow ? (
                  <AiOutlineEye
                    className={`w-6 h-6 ${isDarkMode ? "text-black" : ""}`}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className={`w-6 h-6 ${isDarkMode ? "text-black" : ""}`}
                  />
                )}
              </button>
            </div>
            {errors.confirm_new_password && touched.confirm_new_password && (
              <p
                className={`${
                  isDarkMode ? "text-red-500" : "text-red-500"
                } text-sm h-4`}
              >
                {errors.confirm_new_password}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`${
              isDarkMode ? "bg-blue-600" : "bg-blue-500"
            } hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-7 flex justify-center items-center gap-2`}
          >
            Reset <HiArrowRight />
          </button>
          <p
            className={`flex justify-start py-5 hover:underline hover:duration-200 ${
              isDarkMode ? "hover:text-indigo-400" : "hover:text-indigo-600"
            }`}
          >
            <Link to={"/"}>Home</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
