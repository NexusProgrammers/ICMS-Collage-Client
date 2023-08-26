import { Button, Modal } from "@mui/material";
import { AiOutlineDoubleRight } from "../icons";
import { useTheme } from "../context/ThemeContext"; // Import the useTheme hook
import { useSelector } from "react-redux";

const ConfirmDeleteModal = ({ isOpen, onConfirm, onCancel }) => {
  const { isDarkMode } = useTheme();

  const { deleteUserAccountLoading } = useSelector((state) => state.auth);

  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
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
          <AiOutlineDoubleRight
            className={`w-4 h-4 ${isDarkMode ? "text-gray-300" : "text-black"}`}
          />
          Confirm Deletion
        </h2>
        <p className={`${isDarkMode ? "text-white" : "text-black"}`}>
          Are you sure you want to delete your account?
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <Button
            size="small"
            variant="contained"
            color="info"
            sx={{ textTransform: "none" }}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={{ textTransform: "none", width: 120 }}
            onClick={onConfirm}
          >
            {deleteUserAccountLoading ? (
              <div className="relative">
                <div className="w-5 h-5 border-purple-200 border-2 rounded-full"></div>
                <div className="w-5 h-5 border-purple-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
              </div>
            ) : (
              "Confirm Delete"
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
