import { Button, Modal } from "@mui/material";
import { useFormik } from "formik";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineWarning,
} from "../icons/index";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { deleteUserAccount } from "../service/authService";

const DeleteAccountModel = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmDelete = () => {
    if (!password) {
      return toast.error("Please Provide Your Password");
    }
    setShowConfirmModal(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async () => {
      handleConfirmDelete();
    },
  });

  const { password } = values;

  return (
    <>
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
            className={`text-xl font-semibold mb-6 flex gap-2 items-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <AiOutlineWarning
              className={`w-6 h-6 ${
                isDarkMode ? "text-red-500" : "text-red-900"
              }`}
            />
            Delete Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 h-[5rem]">
              <label
                htmlFor="password"
                className={`block mb-1 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Enter Your Password
              </label>
              <div className="relative">
                <input
                  onCopy={(e) => {
                    e.preventDefault();
                    toast.error("Cannot copy from password field");
                    return false;
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    toast.error("Cannot paste into password field");
                    return false;
                  }}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={"w-full border rounded py-2 px-3"}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black"
                >
                  {showPassword ? (
                    <AiOutlineEye className="w-6 h-6" />
                  ) : (
                    <AiOutlineEyeInvisible className="w-6 h-6" />
                  )}
                </button>
              </div>
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
                color="error"
                sx={{ textTransform: "none" }}
              >
                Delete
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <ConfirmDeleteModal
        isOpen={showConfirmModal}
        onConfirm={async () => {
          await dispatch(deleteUserAccount({ values, navigate }));
          onClose();
        }}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default DeleteAccountModel;
