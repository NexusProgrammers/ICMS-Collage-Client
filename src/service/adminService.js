import { createAsyncThunk } from "@reduxjs/toolkit";
import adminAPI from "../api/adminApi";
import { toast } from "react-toastify";

export const viewApply = createAsyncThunk(
  "apply/viewApply",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.get(`/view/${id}`);
      toast.success(response.data.message, {
        autoClose: 2000,
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

export const acceptApply = createAsyncThunk(
  "apply/acceptApply",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.get(`/accepted/${id}`);
      toast.success(response.data.message, {
        autoClose: 2000,
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

export const rejectApply = createAsyncThunk(
  "apply/rejectApply",
  async ({ id, rejectionReason }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.post(`/rejected/${id}`, {
        rejectionReason,
      });
      toast.success(response.data.message, {
        autoClose: 2000,
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

export const downloadPDF = createAsyncThunk(
  "apply/downloadPDF",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.get(`/download/pdf/${id}`);
      toast.success(response.data.message, {
        autoClose: 2000,
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


