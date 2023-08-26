import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contactAPI from "../api/contactApi";

export const createContact = createAsyncThunk(
  "contact/createContact",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await contactAPI.post("/create", formData);
      toast.success(response.data.message, {
        autoClose: 3000,
        position: "top-center",
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        autoClose: 2000,
      });
      return rejectWithValue(message);
    }
  }
);
