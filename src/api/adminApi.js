import axios from "axios";
import Cookie from "js-cookie";

const adminAPI = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_URL,
});

adminAPI.interceptors.request.use(
  (config) => {
    const token = Cookie.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default adminAPI;