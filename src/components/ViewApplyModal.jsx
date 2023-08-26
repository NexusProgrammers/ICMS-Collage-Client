import { Modal, Button } from "@mui/material";
import { useTheme } from "../context/ThemeContext";

const ViewApplyModal = ({ isOpen, onClose, formData }) => {
  const { isDarkMode } = useTheme();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
          View Admission Form
        </h2>
        <div className="space-y-2 flex flex-col gap-2">
          <InfoField label="Name" value={formData?.user?.name} />
          <InfoField label="Course" value={formData?.course} />
          <InfoField label="Status" value={formData?.status} />
          <InfoField label="Marks" value={formData?.marks} />
          <InfoField label="Gender" value={formData?.gender} />
          <InfoField label="Phone Number" value={formData?.phoneNumber} />
          <InfoField
            label="Date of Birth"
            value={formatDate(formData.dateOfBirth)}
          />
          <InfoField label="Address" value={formData.address} />
          <InfoField
            label="Created At"
            value={formatDate(formData.createdAt)}
          />{" "}
          {/* Display Created At */}
        </div>
        <div className="flex justify-end mt-6">
          <Button
            size="small"
            variant="contained"
            color="info"
            sx={{ textTransform: "none" }}
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const InfoField = ({ label, value }) => {
  return (
    <div className="flex">
      <p className="font-semibold w-1/3">{label}:</p>
      <p className="w-2/3">{value}</p>
    </div>
  );
};

export default ViewApplyModal;
