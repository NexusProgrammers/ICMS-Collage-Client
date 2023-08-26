import { Modal, Button } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { useSelector } from "react-redux";

const DeleteApplyModal = ({ isOpen, onClose, onDelete }) => {
  const { isDarkMode } = useTheme();
  const { deleteApplyLoading } = useSelector((state) => state.apply);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className={`flex items-center justify-center px-4 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-[28rem] p-6 bg-white shadow-md hover:shadow-xl rounded-md ${
          isDarkMode ? "dark:bg-gray-800 text-white" : "text-black"
        }`}
      >
        <h2
          className={`text-2xl font-semibold mb-4 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Delete Admission Form
        </h2>
        <p className="mb-4">
          Are you sure you want to delete this admission form?
        </p>
        <div className="flex justify-end space-x-2">
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
            onClick={onDelete}
          >
            {deleteApplyLoading ? (
              <div className="relative">
                <div className="w-5 h-5 border-purple-200 border-2 rounded-full"></div>
                <div className="w-5 h-5 border-purple-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
              </div>
            ) : (
              "Delete"
            )}
          </Button>
          <Button
            size="small"
            variant="contained"
            color="info"
            sx={{ textTransform: "none" }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteApplyModal;
