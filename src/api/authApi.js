import axios from "axios";
import Cookie from "js-cookie";

const authAPI = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
});

authAPI.interceptors.request.use(
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

export default authAPI;
