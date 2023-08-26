import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const ThemedApp = () => {
  const { isDarkMode } = useTheme();

  return (
    <React.StrictMode>
      <div className={isDarkMode ? "dark" : "light"}>
        <Provider store={store}>
          <App />
          <Toaster
            toastOptions={{
              className: isDarkMode
                ? "bg-white text-black"
                : "bg-gray-800 text-white",
            }}
          />
          <ToastContainer
            position="top-center"
            theme={isDarkMode ? "light" : "dark"}
          />
        </Provider>
      </div>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID

root.render(
  <ThemeProvider>
    <GoogleOAuthProvider clientId={clientId}>
      <ThemedApp />
    </GoogleOAuthProvider>
  </ThemeProvider>
);
