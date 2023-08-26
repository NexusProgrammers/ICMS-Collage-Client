import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import applyAPI from "../api/applyApi";

export const apply = createAsyncThunk(
  "apply/apply",
  async ({ values, navigate }, { rejectWithValue }) => {
    try {
      const response = await applyAPI.post("/apply", values);
      toast.success(response.data.message, {
        autoClose: 2000,
      });
      navigate("/");
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

export const updateApply = createAsyncThunk(
  "apply/updateApply",
  async ({ values, navigate }, { rejectWithValue }) => {
    try {
      const response = await applyAPI.put("/update", values);
      toast.success(response.data.message, {
        autoClose: 2000,
      });
      navigate("/");
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

export const getApplies = createAsyncThunk(
  "apply/getApplies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await applyAPI.get("/all");
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

export const getApply = createAsyncThunk(
  "apply/getApply",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await applyAPI.get(`/details/${id}`);
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

export const deleteApply = createAsyncThunk(
  "apply/deleteApply",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await applyAPI.delete(`/delete/${id}`);
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

export const getAcceptedApplies = createAsyncThunk(
  "apply/getAcceptedApplies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await applyAPI.get("/accepted");
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

export const getRejectedApplies = createAsyncThunk(
  "apply/getRejectedApplies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await applyAPI.get("/rejected");
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

export const getTotalApplies = createAsyncThunk(
  "apply/getTotalApplies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await applyAPI.get("/total");
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

export const getViewedApplies = createAsyncThunk(
  "apply/getViewedApplies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await applyAPI.get("/view");
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

export const getNewApplies = createAsyncThunk(
  "apply/getNewApplies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await applyAPI.get("/new");
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
