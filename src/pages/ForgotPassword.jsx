import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { HiArrowRight, MdOutlineMailOutline } from "../icons/index";
import { forgotPasswordSchema } from "../schemas/userSchema";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../service/authService";
import { useTheme } from "../context/ThemeContext";
import { Spinner, VerifyCodeModal } from "../components";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  const { forgotPasswordLoading } = useSelector((state) => state.auth);

  const [showVerifyCodeModal, setShowVerifyCodeModal] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotPasswordSchema,
      onSubmit: async (values) => {
        await dispatch(forgotPassword({ values }));
        setShowVerifyCodeModal(true);
      },
    });

  const { email } = values;

  useEffect(() => {
    document.title = 'ICMS Collage | Forgot Password';
  }, []);


  return (
    <div
      className={`flex justify-center items-center px-6 h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {forgotPasswordLoading && <Spinner />}
      <div
        className={`w-[32rem] p-8 bg-white shadow-xl hover:shadow-2xl rounded-md h-[22rem] ${
          isDarkMode ? "dark:bg-gray-800" : ""
        }`}
      >
        <h4
          className={`text-xl font-medium mb-8 flex items-center justify-center ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          FORGOT PASSWORD
        </h4>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className={`mb-4 h-[4rem] relative`}>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded py-2 px-3 ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "bg-white text-black border-gray-400"
              }`}
              style={{ color: "black" }}
            />
            <span
              className={`absolute top-12 right-3 transform -translate-y-1/2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <MdOutlineMailOutline className="w-5 h-5 mt-1 text-black" />
            </span>
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm h-4">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            className={`${
              isDarkMode
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-blue-600 hover:bg-blue-800"
            } text-white py-2 px-4 rounded w-full mt-7 flex justify-center items-center gap-2`}
          >
            Submit <HiArrowRight />
          </button>
          <p
            className={`flex justify-start py-5 hover:underline hover:duration-200 ${
              isDarkMode ? "hover:text-blue-400" : "hover:text-indigo-600"
            }`}
          >
            <Link to={"/"}>Home</Link>
          </p>
        </form>
      </div>

      {showVerifyCodeModal && (
        <VerifyCodeModal
          isOpen={showVerifyCodeModal}
          onClose={() => setShowVerifyCodeModal(false)}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
