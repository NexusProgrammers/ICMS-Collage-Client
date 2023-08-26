import axios from "axios";

const contactAPI = axios.create({
  baseURL: import.meta.env.VITE_CONTACT_URL,
});

export default contactAPI;
