import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  HiArrowRight,
  MdOutlineDriveFileRenameOutline,
  MdOutlineMailOutline,
} from "../icons/index";
import { toast } from "react-hot-toast";
import { signUpSchema } from "../schemas/userSchema";
import { googleSignUp, signUpUser } from "../service/authService";
import { useTheme } from "../context/ThemeContext";
import { Spinner, VerifyEmailModal } from "../components";
import { GoogleLogin } from "@react-oauth/google";

const SignUp = () => {
  const { signUpLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isVerifyEmailModalOpen, setIsVerifyEmailModalOpen] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        const response = await dispatch(signUpUser({ values }));
        if (response && response?.payload?.success) {
          setIsVerifyEmailModalOpen(true);
        }
      },
    });

  const { name, email, password, confirm_password } = values;

  const handleGoogleSignUpSuccess = async (response) => {
    const { credential } = response;
    const idToken = credential;

    const responseData = await dispatch(googleSignUp({ idToken, navigate }));
    if (responseData.error === "rejected") {
      toast.error("Already Sign Up", {
        duration: 3000,
      });
    }
  };

  const handleGoogleSignUpFailure = (error) => {
    console.error("Google Sign-Up Failed:", error);
  };

  useEffect(() => {
    document.title = "ICMS Collage | Sign Up";
  }, []);

  return (
    <div
      className={`flex justify-center items-center px-6 h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {signUpLoading && <Spinner />}
      <div
        className={`w-[33rem] p-8 bg-white shadow-xl hover:shadow-2xl rounded-md h-[38rem] ${
          isDarkMode ? "dark:bg-gray-800" : ""
        }`}
      >
        <h4
          className={`text-xl font-medium mb-4 flex items-center justify-center ${
            isDarkMode ? "text-white " : "text-black "
          }`}
        >
          REGISTER ACCOUNT
        </h4>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSignUpSuccess}
            onFailure={handleGoogleSignUpFailure}
          >
            Sign Up with Google
          </GoogleLogin>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={`mb-4 h-[5rem] relative`}>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded py-2 px-3 ${
                errors.name && touched.name
                  ? "border-red-500"
                  : "bg-white text-black border-gray-400"
              }`}
              style={{ color: "black" }}
            />
            {errors.name && touched.name && (
              <p className="text-red-500 text-sm h-4">{errors.name}</p>
            )}
            <span
              className={`absolute top-12 right-3 transform -translate-y-1/2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <MdOutlineDriveFileRenameOutline className="w-6 h-6 text-black" />
            </span>
          </div>
          <div className={`mb-4 h-[5rem] relative`}>
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
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm h-4">{errors.email}</p>
            )}
            <span
              className={`absolute top-12 right-3 transform -translate-y-1/2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <MdOutlineMailOutline className="w-5 h-5 mt-1 text-black" />
            </span>
          </div>
          <div className={`mb-4 h-[5rem]`}>
            <label htmlFor="password" className="block mb-1">
              Password
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
                className={`w-full border rounded py-2 px-3 ${
                  errors.password && touched.password
                    ? "border-red-500"
                    : "bg-white text-black border-gray-400"
                }`}
                style={{ color: "black" }}
              />
              <button
                type="button"
                onClick={handleTogglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <AiOutlineEye className="w-6 h-6 text-black" />
                ) : (
                  <AiOutlineEyeInvisible className="w-6 h-6 text-blak text-black" />
                )}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm h-4">{errors.password}</p>
            )}
          </div>
          <div className={`mb-4 h-[5rem]`}>
            <label htmlFor="password" className="block mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                onCopy={(e) => {
                  e.preventDefault();
                  toast.error("Cannot copy from confirm password field");
                  return false;
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  toast.error("Cannot paste into confirm password field");
                  return false;
                }}
                type={showPasswordConfirm ? "text" : "password"}
                id="confirm_password"
                name="confirm_password"
                value={confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded py-2 px-3 ${
                  errors.confirm_password && touched.confirm_password
                    ? "border-red-500"
                    : "bg-white text-black border-gray-400"
                }`}
                style={{ color: "black" }}
              />
              <button
                type="button"
                onClick={handleTogglePasswordConfirmVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
              >
                {showPasswordConfirm ? (
                  <AiOutlineEye className="w-6 h-6 text-black" />
                ) : (
                  <AiOutlineEyeInvisible className="w-6 h-6 text-black" />
                )}
              </button>
            </div>
            {errors.confirm_password && touched.confirm_password && (
              <p className="text-red-500 text-sm h-4">
                {errors.confirm_password}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`${
              isDarkMode
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-blue-600 hover:bg-blue-800"
            } text-white py-2 px-4 rounded w-full mt-6 flex justify-center items-center gap-2`}
          >
            Sign Up <HiArrowRight />
          </button>
          <p
            className={`flex justify-end py-6 hover:underline hover:duration-200 ${
              isDarkMode ? "hover:text-blue-400" : "hover:text-indigo-600"
            }`}
          >
            <Link to={"/signin"}>Already Have An Account ?</Link>
          </p>
        </form>
      </div>
      {isVerifyEmailModalOpen && (
        <VerifyEmailModal
          isOpen={isVerifyEmailModalOpen}
          onClose={() => setIsVerifyEmailModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SignUp;
