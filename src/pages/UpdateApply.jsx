import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import {
  PiBookmarksSimpleBold,
  MdOutlinePhoneEnabled,
  FaRegAddressCard,
  HiArrowRight,
} from "../icons/index";
import { useTheme } from "../context/ThemeContext";
import { updateApplySchema } from "../schemas/applySchema";
import { updateApply, getApply } from "../service/applyService";
import { Spinner } from "../components";

const UpdateApply = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isDarkMode } = useTheme();

  const { apply, updateApplyLoading } = useSelector((state) => state.apply);

  const formik = useFormik({
    initialValues: {
      course: "",
      marks: "",
      gender: "",
      phoneNumber: "",
      dateOfBirth: "",
      address: "",
    },
    validationSchema: updateApplySchema,
    onSubmit: async (values) => {
      await dispatch(updateApply({ values, navigate }));
    },
  });

  useEffect(() => {
    dispatch(getApply({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (apply) {
      const { course, marks, gender, phoneNumber, dateOfBirth, address } =
        apply;
      formik.setValues({
        ...formik.values,
        course: course || "",
        marks: marks || "",
        gender: gender || "",
        phoneNumber: phoneNumber || "",
        dateOfBirth: dateOfBirth || "",
        address: address || "",
      });
    }
  }, [apply]);

  useEffect(() => {
    document.title = "ICMS Collage | Update Apply";
  }, []);

  return (
    <div
      className={`flex justify-center items-center px-6 h-[120vh] ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {updateApplyLoading && <Spinner />}
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
          UPDATE ADMISSION FORM
        </h4>
        <form onSubmit={formik.handleSubmit}>
          <div className={`mb-4 h-[5rem] relative`}>
            <label htmlFor="course" className="block mb-1">
              Course
            </label>
            <select
              id="course"
              name="course"
              value={formik.values.course}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded py-2 px-3 ${
                formik.errors.course && formik.touched.course
                  ? "border-red-500"
                  : "bg-white text-black border-gray-400"
              }`}
              style={{ color: "black" }}
            >
              <option value="" disabled>
                Select a course
              </option>
              <option value="pre-medical">Pre-Medical</option>
              <option value="pre-engineering">Pre-Engineering</option>
              <option value="computer-science">Computer Science</option>
              <option value="arts">Arts</option>
            </select>
            {formik.errors.course && formik.touched.course && (
              <p className="text-red-500 text-sm h-4">{formik.errors.course}</p>
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
              value={formik.values.marks}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded py-2 px-3 ${
                formik.errors.marks && formik.touched.marks
                  ? "border-red-500"
                  : "bg-white text-black border-gray-400"
              }`}
              style={{ color: "black" }}
            />
            {formik.errors.marks && formik.touched.marks && (
              <p className="text-red-500 text-sm h-4">{formik.errors.marks}</p>
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
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded py-2 px-3 ${
                formik.errors.gender && formik.touched.gender
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
            {formik.errors.gender && formik.touched.gender && (
              <p className="text-red-500 text-sm h-4">{formik.errors.gender}</p>
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
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded py-2 px-3 ${
                formik.errors.phoneNumber && formik.touched.phoneNumber
                  ? "border-red-500"
                  : "bg-white text-black border-gray-400"
              }`}
              style={{ color: "black" }}
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
              <p className="text-red-500 text-sm h-4">
                {formik.errors.phoneNumber}
              </p>
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
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded py-2 px-3 ${
                formik.errors.dateOfBirth && formik.touched.dateOfBirth
                  ? "border-red-500"
                  : "bg-white text-black border-gray-400"
              }`}
              style={{ color: "black" }}
            />
            {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
              <p className="text-red-500 text-sm h-4">
                {formik.errors.dateOfBirth}
              </p>
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
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded py-2 px-3 ${
                formik.errors.address && formik.touched.address
                  ? "border-red-500"
                  : "bg-white text-black border-gray-400"
              }`}
              style={{ color: "black" }}
            />
            {formik.errors.address && formik.touched.address && (
              <p className="text-red-500 text-sm h-4">
                {formik.errors.address}
              </p>
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
            Update <HiArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateApply;
