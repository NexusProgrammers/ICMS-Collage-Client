import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  HiArrowRight,
  PiBookmarksSimpleBold,
  MdOutlinePhoneEnabled,
  FaRegAddressCard,
} from "../icons/index";
import { useTheme } from "../context/ThemeContext";
import { apply } from "../service/applyService";
import { Spinner } from "../components";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { applySchema } from "../schemas/applySchema";
import { useEffect } from "react";

const Apply = () => {
  const { applyFormLoading } = useSelector((state) => state.auth);
  const userCookie = Cookie.get("user");
  const token = Cookie.get("token");
  const user = userCookie ? JSON.parse(userCookie) : null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        course: "",
        marks: "",
        gender: "",
        phoneNumber: "",
        dateOfBirth: "",
        address: "",
      },
      validationSchema: applySchema,
      onSubmit: async (values) => {
        if (!token || !user) {
          toast.warn("Please Login To Your Account", {
            autoClose: 3000,
          });
          navigate("/signin");
          return;
        }
       await dispatch(apply({ values, navigate }));
      },
    });

  const { course, marks, gender, phoneNumber, dateOfBirth, address } = values;

  useEffect(() => {
    document.title = 'ICMS Collage | Apply';
  }, []);


  return (
    <div
      className={`flex justify-center items-center px-6 h-[120vh] ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {applyFormLoading && <Spinner />}
      <div
        className={`w-[34rem] p-10 bg-white shadow-xl hover:shadow-2xl rounded-md h-[46rem] ${
          isDarkMode ? "dark:bg-gray-800" : ""
        }`}
      >
        <h4
          className={`text-xl font-medium mb-4 flex items-center justify-center ${
            isDarkMode ? "text-white " : "text-black "
          }`}
        >
          APPLY FORM
        </h4>
        <form onSubmit={handleSubmit}>
          <div className={`mb-4 h-[5rem] relative`}>
            <label htmlFor="course" className="block mb-1">
              Course
            </label>
            <select
              id="course"
              name="course"
              value={course}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded py-2 px-3 ${
                errors.course && touched.course
                  ? "border-red-500"
                  : "bg-white text-black border-gray-400"
              }`}
              style={{ color: " black" }}
            >
              <option value="" disabled>
                Select a course
              </option>
              <option value="pre-medical">Pre-Medical</option>
              <option value="pre-engineering">Pre-Engineering</option>
              <option value="computer-science">Computer Science</option>
              <option value="arts">Arts</option>
            </select>
            {errors.course && touched.course && (
              <p className="text-red-500 text-sm h-4">{errors.course}</p>
            )}
          </div>
          <div className={`mb-4 h-[5rem] relative`}>
            <label htmlFor="marks" className="block mb-1">
              Matric Marks
            </label>
            <input
              type="text"
              id="marks"
              name="marks"
              value={marks}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded py-2 px-3 ${
                errors.marks && touched.marks
                  ? "border-red-500"
                  : "bg-white text-black border-gray-400"
              }`}
              style={{ color: "black" }}
            />
            {errors.marks && touched.marks && (
              <p className="text-red-500 text-sm h-4">{errors.marks}</p>
            )}
            <span
              className={`absolute top-12 right-3 transform -translate-y-1/2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <PiBookmarksSimpleBold className="w-5 h-5 text-black" />
            </span>
          </div>
          <div className={`mb-4 h-[5rem] relative`}>
            <label htmlFor="gender" className="block mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded py-2 px-3 ${
                errors.gender && touched.gender
                  ? "border-red-500"
                  : "bg-white text-black border-gray-400"
              }`}
              style={{ color: "black" }}
            >
              <option value="" disabled>
                Select a gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && touched.gender && (
              <p className="text-red-500 text-sm h-4">{errors.gender}</p>
            )}
          </div>
          <div className={`mb-4 h-[5rem] relative`}>
            <label htmlFor="phoneNumber" className="block mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded py-2 px-3 ${
                errors.phoneNumber && touched.phoneNumber
                  ? "border-red-500"
                  : "bg-white text-black border-gray-400"
              }`}
              style={{ color: "black" }}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <p className="text-red-500 text-sm h-4">{errors.phoneNumber}</p>
            )}
            <span
              className={`absolute top-12 right-3 transform -translate-y-1/2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <MdOutlinePhoneEnabled className="w-5 h-5 text-black" />
            </span>
          </div>
          <div className={`mb-4 h-[5rem] relative`}>
            <label htmlFor="dateOfBirth" className="block mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded py-2 px-3 ${
                errors.dateOfBirth && touched.dateOfBirth
                  ? "border-red-500"
                  : "bg-white text-black border-gray-400"
              }`}
              style={{ color: "black" }}
            />
            {errors.dateOfBirth && touched.dateOfBirth && (
              <p className="text-red-500 text-sm h-4">{errors.dateOfBirth}</p>
            )}
          </div>
          <div className={`mb-4 h-[5rem] relative`}>
            <label htmlFor="address" className="block mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded py-2 px-3 ${
                errors.address && touched.address
                  ? "border-red-500"
                  : "bg-white text-black border-gray-400"
              }`}
              style={{ color: "black" }}
            />
            {errors.address && touched.address && (
              <p className="text-red-500 text-sm h-4">{errors.address}</p>
            )}
            <span
              className={`absolute top-12 right-3 transform -translate-y-1/2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <FaRegAddressCard className="w-5 h-5 text-black" />
            </span>
          </div>
          <button
            type="submit"
            className={`${
              isDarkMode
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-blue-600 hover:bg-blue-800"
            } text-white py-2 px-4 rounded w-full mt-6 flex justify-center items-center gap-2`}
          >
            {applyFormLoading ? (
              <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin dark:border-white"></div>
            ) : (
              <>
                Apply <HiArrowRight />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Apply;
