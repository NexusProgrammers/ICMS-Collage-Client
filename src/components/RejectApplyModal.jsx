import { useState } from "react";
import { Modal, Button, TextField } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { useSelector } from "react-redux";

const RejectApplyModal = ({ isOpen, onClose, onReject }) => {
  const { isDarkMode } = useTheme();
  const { rejectedApplyLoading } = useSelector((state) => state.apply);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleReject = () => {
    onReject(rejectionReason);
    setRejectionReason("");
  };

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
          Reject Admission Form
        </h2>
        <p className="mb-4">Please provide a reason for rejection:</p>
        <TextField
          fullWidth
          variant="outlined"
          label="Rejection Reason"
          multiline
          rows={4}
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          sx={{
            marginBottom: "1rem",
            "& .MuiInputLabel-root": {
              color: isDarkMode ? "white" : "black",
            },
            "& .MuiOutlinedInput-root": {
              backgroundColor: isDarkMode ? "#333" : "white",
              color: isDarkMode ? "white" : "black",
              borderColor: isDarkMode ? "gray" : "#ccc",
            },
            "& .MuiOutlinedInput-input": {
              color: isDarkMode ? "white" : "black",
            },
          }}
        />
        <div className="flex justify-end space-x-2">
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
            onClick={handleReject}
          >
            {rejectedApplyLoading ? (
              <div className="relative">
                <div className="w-5 h-5 border-purple-200 border-2 rounded-full"></div>
                <div className="w-5 h-5 border-purple-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
              </div>
            ) : (
              "Reject"
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

export default RejectApplyModal;
