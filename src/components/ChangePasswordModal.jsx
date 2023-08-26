import { Button, Modal } from "@mui/material";
import { useFormik } from "formik";
import { changePasswordSchema } from "../schemas/userSchema";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  TbArrowsExchange,
} from "../icons/index";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { changeUserPassword } from "../service/authService";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const { changeUserPasswordLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setConfirmShowNewPassword] = useState(false);

  const handleToggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmNewPassword = () => {
    setConfirmShowNewPassword(!showConfirmNewPassword);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      validationSchema: changePasswordSchema,
      onSubmit: async (values) => {
        dispatch(changeUserPassword({ values, navigate }));
      },
    });

  const { oldPassword, newPassword, confirmNewPassword } = values;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className={`flex items-center justify-center px-6 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-[33rem] p-8 bg-white shadow-md hover:shadow-xl rounded-md ${
          isDarkMode ? "dark:bg-gray-800" : ""
        }`}
      >
        <h2
          className={`text-xl font-semibold mb-6 flex items-center gap-3 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          <TbArrowsExchange className="w-6 h-6" /> Change Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 h-[5rem]">
            <label
              htmlFor="oldPassword"
              className={`block mb-1 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Old Password
            </label>
            <div className="relative">
              <input
                onCopy={(e) => {
                  e.preventDefault();
                  toast.error("Cannot copy from old password field");
                  return false;
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  toast.error("Cannot paste into old password field");
                  return false;
                }}
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded py-2 px-3 ${
                  errors.oldPassword && touched.oldPassword
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              <button
                type="button"
                onClick={handleToggleOldPassword}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black"
              >
                {showOldPassword ? (
                  <AiOutlineEye className="w-6 h-6" />
                ) : (
                  <AiOutlineEyeInvisible className="w-6 h-6" />
                )}
              </button>
            </div>
            {errors.oldPassword && touched.oldPassword && (
              <p className="text-red-500 text-sm h-4">{errors.oldPassword}</p>
            )}
          </div>
          <div className="mb-4 h-[5rem]">
            <label
              htmlFor="newPassword"
              className={`block mb-1 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
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
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded py-2 px-3 ${
                  errors.newPassword && touched.newPassword
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              <button
                type="button"
                onClick={handleToggleNewPassword}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black"
              >
                {showNewPassword ? (
                  <AiOutlineEye className="w-6 h-6" />
                ) : (
                  <AiOutlineEyeInvisible className="w-6 h-6" />
                )}
              </button>
            </div>
            {errors.newPassword && touched.newPassword && (
              <p className="text-red-500 text-sm h-4">{errors.newPassword}</p>
            )}
          </div>
          <div className="mb-4 h-[5rem]">
            <label
              htmlFor="confirm_new_password"
              className={`block mb-1 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
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
                  toast.error("Cannot paste into confirm new password field");
                  return false;
                }}
                type={showConfirmNewPassword ? "text" : "password"}
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded py-2 px-3 ${
                  errors.confirmNewPassword && touched.confirmNewPassword
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              <button
                type="button"
                onClick={handleToggleConfirmNewPassword}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black"
              >
                {showConfirmNewPassword ? (
                  <AiOutlineEye className="w-6 h-6" />
                ) : (
                  <AiOutlineEyeInvisible className="w-6 h-6" />
                )}
              </button>
            </div>
            {errors.confirmNewPassword && touched.confirmNewPassword && (
              <p className="text-red-500 text-sm h-4">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button
              size="small"
              type="button"
              variant="contained"
              color="info"
              sx={{ textTransform: "none" }}
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button
              size="small"
              type="submit"
              variant="contained"
              color="info"
              sx={{ textTransform: "none", width: 70 }}
            >
              {changeUserPasswordLoading ? (
                <div className="relative">
                  <div className="w-5 h-5 border-purple-200 border-2 rounded-full"></div>
                  <div className="w-5 h-5 border-purple-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
                </div>
              ) : (
                "Change"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
