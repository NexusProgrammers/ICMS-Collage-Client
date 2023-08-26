import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewApplyModal from "../components/ViewApplyModal";
import { useTheme } from "../context/ThemeContext";
import {
  deleteApply,
  getAcceptedApplies,
  getApplies,
  getNewApplies,
  getRejectedApplies,
  getTotalApplies,
  getViewedApplies,
} from "../service/applyService";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import {
  AcceptApplyModal,
  DeleteApplyModal,
  RejectApplyModal,
  Spinner,
} from "../components";
import {
  BsCheckCircle,
  BsEye,
  BsFileEarmarkText,
  BsXCircle,
  AiOutlineEyeInvisible,
  AiOutlineSearch,
  BsChevronRight,
  BsChevronLeft,
  BiSolidDownload,
} from "../icons/index";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import {
  acceptApply,
  downloadPDF,
  rejectApply,
  viewApply,
} from "../service/adminService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const Home = () => {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const { getAppliesLoading, applies } = useSelector((state) => state.apply);

  const userCookie = Cookie.get("user");

  const user = userCookie ? JSON.parse(userCookie) : null;

  const token = Cookie.get("token");

  const [selectedForm, setSelectedForm] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [selectedApplyId, setSelectedApplyId] = useState(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [filteredAndSortedApplies, setFilteredAndSortedApplies] = useState([]);

  const appliesPerPage = 8;

  useEffect(() => {
    dispatch(getApplies());
  }, [dispatch]);

  const offset = currentPage * appliesPerPage;
  const pageCount = Math.ceil(filteredAndSortedApplies.length / appliesPerPage);

  const handleViewClick = async (form, applyId) => {
    setSelectedForm(form);
    setViewModalOpen(true);
    if (user?.role === "admin" && token) {
      await dispatch(viewApply({ id: applyId }));
    }
  };

  const handleCloseView = async () => {
    setSelectedForm(null);
    setViewModalOpen(false);
    await dispatch(getApplies());
  };

  const handleDeleteClick = (applyId) => {
    setSelectedApplyId(applyId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await dispatch(deleteApply({ id: selectedApplyId }));
    setDeleteModalOpen(false);
    setSelectedApplyId(null);
    await dispatch(getApplies());
  };

  const handleAcceptClick = (applyId) => {
    setSelectedApplyId(applyId);
    setAcceptModalOpen(true);
  };

  const handleConfirmAccept = async () => {
    await dispatch(acceptApply({ id: selectedApplyId }));
    setAcceptModalOpen(false);
    setSelectedApplyId(null);
    await dispatch(getApplies());
  };

  const handleRejectClick = (applyId) => {
    setSelectedApplyId(applyId);
    setRejectModalOpen(true);
  };

  const handleConfirmReject = async (rejectionReason) => {
    setRejectModalOpen(false);
    setSelectedApplyId(null);
    if (!rejectionReason) {
      return toast.warn("Please Provide Rejection Reason", {
        autoClose: 2000,
      });
    }
    await dispatch(rejectApply({ id: selectedApplyId, rejectionReason }));
    await dispatch(getApplies());
  };

  const handleDownloadClick = async (applyId) => {
    try {
      const response = await dispatch(downloadPDF({ id: applyId }));
      const applyData = response.payload.apply;

      const doc = new jsPDF();
      doc.setFontSize(16);

      const pageWidth = doc.internal.pageSize.getWidth();
      const textOptions = { align: "center" };

      doc.setTextColor("#4B0082");
      doc.text("Student Details", pageWidth / 2, 10, textOptions);

      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.text(`Name: ${applyData.user.name}`, pageWidth / 2, 30, textOptions);
      doc.text(
        `Email: ${applyData.user.email}`,
        pageWidth / 2,
        40,
        textOptions
      );
      doc.text(`Gender: ${applyData.gender}`, pageWidth / 2, 50, textOptions);

      const dateOfBirth = new Date(applyData.dateOfBirth).toLocaleDateString();
      doc.text(`Date of Birth: ${dateOfBirth}`, pageWidth / 2, 60, textOptions);

      doc.text(
        `Phone Number: ${applyData.phoneNumber}`,
        pageWidth / 2,
        70,
        textOptions
      );
      doc.text(`Address: ${applyData.address}`, pageWidth / 2, 80, textOptions);

      doc.setTextColor("#4B0082");
      doc.setFontSize(14);
      doc.text("Application Information", pageWidth / 2, 100, textOptions);

      doc.setTextColor("#000000");
      doc.text(`Course: ${applyData.course}`, pageWidth / 2, 110, textOptions);
      doc.text(`Marks: ${applyData.marks}`, pageWidth / 2, 120, textOptions);
      doc.text(`Status: ${applyData.status}`, pageWidth / 2, 130, textOptions);
      doc.text(
        `Rejection Reason: ${
          applyData.rejectionReason
            ? applyData.rejectionReason
            : "Not specified"
        }`,
        pageWidth / 2,
        140,
        textOptions
      );

      doc.save("application.pdf");
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }

    toast.success("PDF Download Successfully", {
      autoClose: 2000,
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  useEffect(() => {
    const filteredApplies = applies.filter(
      (apply) =>
        apply?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apply?.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apply?.marks?.toString().includes(searchTerm.toLowerCase())
    );

    const sortedApplies = filteredApplies.sort((a, b) => {
      if (user) {
        if (a.user._id === user._id && b.user._id !== user._id) return -1;
        if (a.user._id !== user._id && b.user._id === user._id) return 1;
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setFilteredAndSortedApplies(sortedApplies);
  }, [applies, searchTerm]);

  const currentApplies = filteredAndSortedApplies.slice(
    offset,
    offset + appliesPerPage
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleAcceptApplication = async () => {
    await dispatch(getAcceptedApplies());
  };

  const handleRejectApplication = async () => {
    await dispatch(getRejectedApplies());
  };

  const handleTotalApplication = async () => {
    await dispatch(getTotalApplies());
  };

  const handleNewApplication = async () => {
    await dispatch(getNewApplies());
  };

  const handleViewedApplication = async () => {
    await dispatch(getViewedApplies());
  };

  const totalApplications = applies.length;
  const totalUnviewedApplications = applies.filter(
    (apply) => apply.status === "pending" && !apply.viewed
  ).length;
  const totalViewedApplications = applies.filter(
    (apply) => apply.status === "view" && !apply.viewed
  ).length;

  const totalAccepted = applies.filter(
    (apply) => apply.status === "accepted"
  ).length;

  const totalRejected = applies.filter(
    (apply) => apply.status === "rejected"
  ).length;
  const totalPending = applies.filter(
    (apply) => apply.status === "pending"
  ).length;
  const totalView = applies.filter((apply) => apply.status === "view").length;

  useEffect(() => {
    document.title = "ICMS Collage | Home";
  }, []);

  return (
    <div
      className={`xs:w-full lg:h-screen flex items-center justify-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <div
        className={`p-4 md:p-8 rounded-lg shadow-lg w-full hover:shadow-2xl h-full ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex flex-col gap-4 justify-between items-center mb-4">
          <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <button
              onClick={handleAcceptApplication}
              className="relative p-4 bg-gradient-to-r from-green-200 to-green-300 rounded-lg flex flex-col justify-center items-center"
            >
              {totalAccepted > 0 && (
                <span className="absolute top-2 right-2 bg-green-700 text-xs text-white rounded-full px-2 py-1">
                  {totalAccepted}
                </span>
              )}
              <BsCheckCircle size={32} className="text-green-700" />
              <p className="text-sm font-medium text-center text-green-700">
                Accepted
              </p>
            </button>

            <button
              onClick={handleRejectApplication}
              className="relative p-4 bg-gradient-to-r from-red-200 to-red-300 rounded-lg flex flex-col justify-center items-center"
            >
              {totalRejected > 0 && (
                <span className="absolute top-2 right-2 bg-red-700 text-xs text-white rounded-full px-2 py-1">
                  {totalRejected}
                </span>
              )}
              <BsXCircle size={32} className="text-red-700" />
              <p className="text-sm font-medium text-center text-red-700">
                Rejected
              </p>
            </button>

            <button
              onClick={handleTotalApplication}
              className="relative p-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg flex flex-col justify-center items-center"
            >
              {totalApplications > 0 && (
                <span className="absolute top-2 right-2 bg-blue-700 text-xs text-white rounded-full px-2 py-1">
                  {totalApplications}
                </span>
              )}
              <BsFileEarmarkText size={28} className="text-blue-700" />
              <p className="text-sm font-medium text-center text-blue-700">
                Total Applications
              </p>
            </button>

            <button
              onClick={handleNewApplication}
              className="relative p-4 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-lg flex flex-col justify-center items-center"
            >
              {totalUnviewedApplications > 0 && (
                <span className="absolute top-2 right-2 bg-yellow-700 text-xs text-white rounded-full px-2 py-1">
                  {totalPending}
                </span>
              )}
              <AiOutlineEyeInvisible size={32} className="text-yellow-700" />
              <p className="text-sm font-medium text-center text-yellow-700">
                New Applications (Unviewed)
              </p>
            </button>

            <button
              onClick={handleViewedApplication}
              className="relative p-4 bg-gradient-to-r from-sky-200 to-sky-300 rounded-lg flex flex-col justify-center items-center"
            >
              {totalViewedApplications > 0 && (
                <span className="absolute top-3 right-2 bg-sky-700 text-xs text-white rounded-full px-2 py-1">
                  {totalView}
                </span>
              )}
              <BsEye size={28} className="text-sky-700" />
              <p className="text-sm font-medium text-center text-sky-700">
                Viewed Applications
              </p>
            </button>
          </div>

          <div className="relative w-full md:w-96 h-12 flex rounded-lg focus-within:shadow-lg overflow-hidden bg-gray-200">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <AiOutlineSearch size={24} color="white" />
            </div>
            <input
              className="peer bg-gray-200 h-full w-full outline-none text-sm pr-2 text-black"
              type="text"
              id="search"
              placeholder="Search by name or course or marks..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {getAppliesLoading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto">
            <table
              className={`w-full ${
                isDarkMode ? "table-dark" : "table-light"
              } border-collapse`}
            >
              <thead>
                <tr
                  className={`text-white border bg-${
                    isDarkMode ? "gray-800" : "gray-200"
                  } dark:bg-gray-500`}
                >
                  <th className="px-4 py-2 text-left whitespace-nowrap">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left whitespace-nowrap">
                    Course
                  </th>
                  <th className="px-4 py-2 text-left whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left whitespace-nowrap">
                    Marks
                  </th>
                  <th className="px-4 py-2 text-center whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              {filteredAndSortedApplies.length === 0 ? (
                <tbody>
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-gray-600 dark:text-gray-400 py-4"
                    >
                      {searchTerm
                        ? "No forms match the search criteria."
                        : "Currently no applies."}
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {currentApplies.map((apply) => {
                    return (
                      <tr
                        key={apply._id}
                        className={`hover:bg-${
                          isDarkMode ? "gray-700" : "gray-200"
                        }`}
                      >
                        <td className="px-4 py-2 whitespace-nowrap">
                          {apply?.user?.name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {apply.course}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded ${
                              apply?.status === "pending"
                                ? "text-yellow-600"
                                : apply.status === "accepted"
                                ? "text-green-600"
                                : apply.status === "rejected"
                                ? "text-red-600"
                                : apply.status === "view"
                                ? "text-blue-600"
                                : ""
                            }`}
                          >
                            {apply.status}
                          </span>
                        </td>

                        <td className="px-4 py-2 whitespace-nowrap">
                          {apply.marks}
                        </td>
                        <td className="px-4 py-2 text-center ">
                          {user?.role === "admin" && token ? (
                            <div className="whitespace-nowrap">
                              <span className="mx-2">|</span>
                              <span
                                className="cursor-pointer text-blue-500 hover:text-blue-700 mr-2"
                                onClick={() =>
                                  handleViewClick(apply, apply._id)
                                }
                              >
                                View
                              </span>

                              <span className="mx-2">|</span>
                              <span
                                className="cursor-pointer text-green-500 hover:text-green-700 mr-2"
                                onClick={() => handleAcceptClick(apply._id)}
                              >
                                Accept
                              </span>
                              <span className="mx-2">|</span>
                              <span
                                className="cursor-pointer text-red-500 hover:text-red-700"
                                onClick={() => handleRejectClick(apply._id)}
                              >
                                Reject
                              </span>
                              <span className="mx-2">|</span>

                              <span
                                className="cursor-pointer text-blue-500 hover:text-blue-700 mr-2"
                                onClick={() => handleDownloadClick(apply._id)}
                              >
                                <BiSolidDownload
                                  size={20}
                                  className="mr-1 inline-block"
                                />
                              </span>
                              <span>|</span>
                            </div>
                          ) : (
                            <>
                              <span className="mx-2">|</span>
                              <span
                                className="cursor-pointer text-blue-500 hover:text-blue-700 mr-2"
                                onClick={() =>
                                  handleViewClick(apply, apply._id)
                                }
                              >
                                View
                              </span>
                              <span className="mx-2">|</span>
                              {user?._id === apply?.user?._id && token ? (
                                <>
                                  <Link
                                    to={`/update/apply/${apply._id}`}
                                    className="cursor-pointer text-yellow-500 hover:text-yellow-700"
                                  >
                                    Update
                                  </Link>
                                  <span className="mx-2">|</span>
                                  <span
                                    className="cursor-pointer text-red-500 hover:text-red-700"
                                    onClick={() => handleDeleteClick(apply._id)}
                                  >
                                    Delete
                                  </span>
                                </>
                              ) : null}
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
        )}

        <div className="my-6 flex justify-center items-center">
          <ReactPaginate
            previousLabel={
              <button className="pagination__link flex items-center justify-center">
                <BsChevronLeft size={20} className="mr-1" />
              </button>
            }
            nextLabel={
              <button className="pagination__link flex items-center justify-center">
                <BsChevronRight size={20} className="ml-1" />
              </button>
            }
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"pagination flex gap-2"}
            pageLinkClassName={`pagination__link rounded-sm text-sm font-medium transition duration-300 flex items-center justify-center ${
              isDarkMode ? "text-white" : " "
            }`}
            previousLinkClassName={`pagination__link flex items-center justify-center rounded-sm text-sm font-medium  transition duration-300 bg-gray-800 ${
              isDarkMode ? "bg-white text-black" : "bg-gray-800 text-white"
            }`}
            nextLinkClassName={`pagination__link flex items-center justify-center rounded-sm text-sm font-medium  transition duration-300 bg-gray-800 ${
              isDarkMode ? "bg-white text-black" : "bg-gray-800 text-white"
            }`}
            breakLabel={
              <button className="pagination__link flex items-center justify-center">
                ...
              </button>
            }
            breakClassName={
              "pagination__link rounded-sm text-sm font-medium text-white transition duration-300 flex items-center justify-center"
            }
            activeClassName={
              "pagination__link bg-indigo-500 text-white px-2 rounded-sm text-sm font-medium flex items-center justify-center"
            }
          />
        </div>

        {selectedForm && (
          <ViewApplyModal
            isOpen={viewModalOpen}
            onClose={handleCloseView}
            formData={selectedForm}
          />
        )}
        {deleteModalOpen && (
          <DeleteApplyModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={handleConfirmDelete}
          />
        )}
        {acceptModalOpen && (
          <AcceptApplyModal
            isOpen={acceptModalOpen}
            onClose={() => setAcceptModalOpen(false)}
            onAccept={handleConfirmAccept}
          />
        )}
        {rejectModalOpen && (
          <RejectApplyModal
            isOpen={rejectModalOpen}
            onClose={() => setRejectModalOpen(false)}
            onReject={handleConfirmReject}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
