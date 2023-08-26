import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";

const NotFound = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.title = 'ICMS Collage | Not Found';
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      } flex items-center justify-center px-4`}
    >
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } p-10 md:p-20 rounded-lg shadow-md w-full max-w-2xl`}
      >
        <div className="text-center">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold ${
              isDarkMode ? "text-red-500" : "text-red-600"
            } mb-4`}
          >
            404 - Page Not Found
          </h1>
          <p className={`${isDarkMode ? "text-white" : "text-gray-600"} mb-6`}>
            We apologize, but the page you are looking for does not exist.
          </p>
          <p className={`${isDarkMode ? "text-white" : "text-gray-600"} mb-6`}>
            Please check the URL or return to the homepage.
          </p>
          <div className="flex justify-center">
            <Link
              to="/"
              className={`${
                isDarkMode ? "bg-blue-600" : "bg-blue-500"
              } text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none transition duration-300`}
            >
              Go to Home
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className={`${isDarkMode ? "text-white" : "text-gray-600"}`}>
            If you believe this is a mistake or need further assistance, please
            don't hesitate to
            <Link
              to="/contact"
              className={`ml-2 ${
                isDarkMode ? "text-blue-400" : "text-blue-500"
              } underline`}
            >
              contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
