import axios from "axios";
import Cookie from "js-cookie";

const applyAPI = axios.create({
  baseURL: import.meta.env.VITE_APPLY_URL,
});

applyAPI.interceptors.request.use(
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

export default applyAPI;
