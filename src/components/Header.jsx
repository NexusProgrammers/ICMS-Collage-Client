import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  BiLogInCircle,
  BiLogOutCircle,
  CloseRoundedIcon,
  FiMoon,
  FiSun,
  GoInfo,
  MenuOpenRoundedIcon,
  PersonOutlineRoundedIcon,
  RiMessage2Line,
  SegmentRoundedIcon,
  TiHomeOutline,
} from "../icons/index";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { logoutUser } from "../redux/authSlice";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const modalRef = useRef(null);

  const handleUserMenuClick = () => {
    setAnchorEl(!anchorEl);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCloseNav = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    dispatch(logoutUser());
    toast.success("Logout Successfully");
    handleUserMenuClose();
    navigate("/signin");
  };

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleUserMenuClose();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const token = Cookie.get("token");
  const userCookie = Cookie.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
  const Authentication = user && token;

  return (
    <nav
      className={`bg-header-bg sticky z-50 top-0  ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between h-14 ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          <Link
            onClick={handleCloseNav}
            to="/"
            className={`-ml-6 group px-5 py-2 relative rounded-md text-base font-normal flex items-center gap-2 ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            <TiHomeOutline className="w-4 h-4" /> Home
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 ${
                isDarkMode ? "bg-white" : "bg-indigo-900"
              } transform origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100`}
            ></span>
          </Link>

          <button
            className={`group px-2 py-2 relative rounded-md text-base font-normal flex items-center gap-2 ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
            onClick={() => setIsDarkMode((prevMode) => !prevMode)}
          >
            {isDarkMode ? (
              <FiSun className="w-4 h-4 mt-[1px]" />
            ) : (
              <FiMoon className="w-4 h-4 mt-[1px]" />
            )}
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5  transform origin-left transition-transform duration-200 ${
                isDarkMode
                  ? "scale-x-0 group-hover:scale-x-100 group-hover:bg-white bg-white"
                  : "scale-x-0 group-hover:scale-x-100 group-hover:bg-indigo-900 bg-indigo-900"
              }`}
            ></span>
          </button>

          <div className="flex items-center gap-4 w-full justify-end">
            <div className="hidden md:flex ">
              <Link
                onClick={handleCloseNav}
                to="/apply"
                className={`group px-5 py-2 relative rounded-md text-base font-normal flex items-center gap-2 ${
                  isDarkMode ? "bg-gray-900" : "bg-gray-50"
                }`}
              >
                <SegmentRoundedIcon className="w-4 h-4" /> Apply
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 ${
                    isDarkMode ? "bg-white" : "bg-indigo-900"
                  } transform origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100`}
                ></span>
              </Link>
              <Link
                onClick={handleCloseNav}
                to="/contact"
                className={`group px-5 py-2 relative rounded-md text-base font-normal flex items-center gap-2 ${
                  isDarkMode ? "bg-gray-900" : "bg-gray-50"
                }`}
              >
                <RiMessage2Line className="w-4 h-4" /> Contact
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 ${
                    isDarkMode ? "bg-white" : "bg-indigo-900"
                  } transform origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100`}
                ></span>
              </Link>

              <Link
                onClick={handleCloseNav}
                to="/about"
                className={`group px-5 py-2 relative rounded-md text-base font-normal flex items-center gap-1 ${
                  isDarkMode ? "bg-gray-900" : "bg-gray-50"
                }`}
              >
                <GoInfo className="w-4 h-4" /> About
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 ${
                    isDarkMode ? "bg-white" : "bg-indigo-900"
                  } transform origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100`}
                ></span>
              </Link>

              {!Authentication && (
                <Link
                  onClick={handleCloseNav}
                  to="/signin"
                  className={`group px-5 py-2 relative rounded-md text-base font-normal flex items-center gap-2 ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <BiLogInCircle className="w-5 h-5" /> Sign In
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 ${
                      isDarkMode ? "bg-white" : "bg-indigo-900"
                    } transform origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100`}
                  ></span>
                </Link>
              )}
            </div>

            {Authentication && (
              <div className="relative px-5">
                <Avatar
                  src={user.image}
                  alt="avatar"
                  className="cursor-pointer"
                  onClick={handleUserMenuClick}
                />
                {anchorEl && (
                  <div
                    ref={modalRef}
                    className={`absolute -left-2 py-2 w-24 rounded-md shadow-2xl z-10 flex flex-col ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <Link
                      to="/account"
                      className={`px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-black flex gap-1 items-center justify-start ${
                        isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white text-black"
                      }`}
                      onClick={handleUserMenuClose}
                    >
                      <PersonOutlineRoundedIcon fontSize="small" /> Account
                    </Link>
                    <button
                      onClick={logout}
                      className={`px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-black flex gap-2 items-center justify-start ${
                        isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <BiLogOutCircle className="w-5 h-5" /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex md:hidden items-center">
              <button
                className={`p-2 focus:outline-none hover:rounded-lg ${
                  isDarkMode ? "bg-gray-900" : "bg-gray-50"
                }`}
                onClick={toggleMenu}
              >
                {isMenuOpen ? <CloseRoundedIcon /> : <MenuOpenRoundedIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div
            className={`flex flex-col px-2 pb-4 ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            <Link
              onClick={handleCloseNav}
              to="/apply"
              className={`group px-5 py-2 relative rounded-md text-base font-normal flex items-center gap-2 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <SegmentRoundedIcon className="w-4 h-4" /> Apply
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  isDarkMode ? "bg-white" : "bg-indigo-900"
                } transform origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100`}
              ></span>
            </Link>
            <Link
              onClick={handleCloseNav}
              to="/contact"
              className={`group px-5 py-2 relative rounded-md text-base font-normal flex items-center gap-2 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <RiMessage2Line className="w-4 h-4" /> Contact
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  isDarkMode ? "bg-white" : "bg-indigo-900"
                } transform origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100`}
              ></span>
            </Link>

            <Link
              onClick={handleCloseNav}
              to="/about"
              className={`group px-5 py-2 relative rounded-md text-base font-normal flex items-center gap-2 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <GoInfo className="w-4 h-4" /> About
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  isDarkMode ? "bg-white" : "bg-indigo-900"
                } transform origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100`}
              ></span>
            </Link>
            {!Authentication && (
              <Link
                onClick={handleCloseNav}
                to="/signin"
                className={`group px-5 py-2 relative rounded-md text-base font-normal flex items-center gap-2 ${
                  isDarkMode ? "bg-gray-900" : "bg-gray-50"
                }`}
              >
                <BiLogInCircle className="w-5 h-5" /> Sign In
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 ${
                    isDarkMode ? "bg-white" : "bg-indigo-900"
                  } transform origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100`}
                ></span>
              </Link>
            )}
          </div>
          <hr />
        </div>
      )}
    </nav>
  );
};

export default Header;
