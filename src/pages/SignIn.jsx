import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  HiArrowRight,
  MdOutlineMailOutline,
} from "../icons/index";
import { signInSchema } from "../schemas/userSchema";
import { useDispatch, useSelector } from "react-redux";
import { googleSignIn, signInUser } from "../service/authService";
import { useTheme } from "../context/ThemeContext";
import { Spinner } from "../components";
import { GoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const { signInLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleToggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signInSchema,
      onSubmit: async (values) => {
        await dispatch(signInUser({ values, navigate, rememberMe }));
      },
    });

  const { email, password } = values;

  useEffect(() => {
    document.title = "ICMS Collage | Sign In";
  }, []);

  const handleGoogleSignInSuccess = async (response) => {
    const { credential } = response;

    const idToken = credential;

    await dispatch(googleSignIn({ idToken, navigate }));
  };

  const handleGoogleSignInFailure = (error) => {
    console.error("Google Sign-In Failed:", error);
  };

  return (
    <div
      className={`flex justify-center items-center h-screen px-6 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {signInLoading && <Spinner />}
      <div
        className={`w-[33rem] p-8 bg-white shadow-xl hover:shadow-2xl rounded-md h-[31rem] ${
          isDarkMode ? "dark:bg-gray-800" : ""
        }`}
      >
        <h4
          className={`text-xl font-medium mb-8 flex items-center justify-center ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          WELCOME BACK
        </h4>
        <div className="flex justify-center">
        <GoogleLogin
            onSuccess={handleGoogleSignInSuccess}
            onFailure={handleGoogleSignInFailure}
          >
            Sign in with Google
          </GoogleLogin>
        </div>
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
          <Link
            to={"/forgot/password"}
            className={`flex mt-2 justify-end hover:underline hover:duration-200 ${
              isDarkMode ? "hover:text-blue-400" : "hover:text-indigo-600"
            }`}
          >
            <span>Forgot Password ?</span>
          </Link>
          <div className={`mb-4 h-[4rem] relative`}>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded py-2 px-3  ${
                  errors.password && touched.password
                    ? "border-red-500"
                    : "bg-white text-black border-gray-400"
                }`}
                style={{ color: "black" }}
              />
              <button
                type="button"
                onClick={handleTogglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 "
              >
                {showPassword ? (
                  <AiOutlineEye className="w-6 h-6 text-black" />
                ) : (
                  <AiOutlineEyeInvisible className="w-6 h-6 text-black" />
                )}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm h-4">{errors.password}</p>
            )}
          </div>
          <div className="mb-4 flex items-center mt-5">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={rememberMe}
              onChange={handleToggleRememberMe}
              className="cursor-pointer  h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="rememberMe"
              className={`ml-2 block text-sm ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className={`mb-6 ${
              isDarkMode
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-blue-600 hover:bg-blue-800"
            } text-white py-2 px-4 rounded w-full mt-2 flex justify-center items-center gap-2`}
          >
            Sign In <HiArrowRight />
          </button>
          

          <p
            className={`flex justify-end hover:underline hover:duration-200 ${
              isDarkMode ? "hover:text-blue-400" : "hover:text-indigo-600"
            }`}
          >
            <Link to={"/signup"}>Don't Have An Account ?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
