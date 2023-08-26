import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import authAPI from "../api/authApi";

export const signUpUser = createAsyncThunk(
  "auth/signUp",
  async ({ values }, { rejectWithValue }) => {
    try {
      const response = await authAPI.post("/signup", values);
      toast.success(response.data.message, {
        duration: 4000,
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
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

export const googleSignUp = createAsyncThunk(
  "auth/googleSignUp",
  async ({ idToken, navigate }, { rejectWithValue }) => {
    try {
      const response = await authAPI.post("/google/signup", { idToken });
      console.log(response.data)
      toast.success(response.data.message, {
        duration: 3000,
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
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ verificationCode, navigate }, { rejectWithValue }) => {
    try {
      const response = await authAPI.post("/verify/email", {
        verificationCode,
      });
      toast.success(response.data.message, {
        duration: 2000,
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
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

export const resendVerificationCode = createAsyncThunk(
  "auth/resendVerificationCode",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.post("/resend/verification/code");
      toast.success(response.data.message, {
        duration: 4000,
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
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ values, navigate }, { rejectWithValue }) => {
    try {
      const response = await authAPI.post("/signin", values);
      toast.success(response.data.message, {
        duration: 3000,
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
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async ({ navigate, idToken }, { rejectWithValue }) => {
    try {
      const response = await authAPI.post("/google/signin", { idToken });
      toast.success(response.data.message, {
        duration: 2000,
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
      return rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ values }, { rejectWithValue }) => {
    try {
      const response = await authAPI.post("/forgot/password", values);
      toast.success(response.data.message, {
        duration: 4000,
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
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

export const resendForgotPasswordCode = createAsyncThunk(
  "auth/resendForgotPasswordCode",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.post("/resend/forgot/password/code");
      toast.success(response.data.message, {
        duration: 4000,
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
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

export const verifyCode = createAsyncThunk(
  "auth/verifyCode",
  async ({ code, navigate, _id }, { rejectWithValue }) => {
    try {
      const response = await authAPI.post("/verify/code", {
        code,
      });
      toast.success(response.data.message, {
        duration: 2000,
      });
      navigate(`/reset/password/${_id}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ values, navigate, _id }, { rejectWithValue }) => {
    try {
      const response = await authAPI.post(`/reset/password/${_id}`, values);
      toast.success(response.data.message, {
        duration: 2000,
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
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

export const cancelForgotPasswordCode = createAsyncThunk(
  "auth/cancelForgotPasswordCode",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const response = await authAPI.get("/cancel/forgot/password");
      toast.success(response.data.message, {
        duration: 3000,
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
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

export const getUserAccount = createAsyncThunk(
  "auth/getUserAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.get("/account");
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

export const updateUserAccount = createAsyncThunk(
  "auth/updateUserAccount",
  async ({ updatedUser, navigate }, { rejectWithValue }) => {
    try {
      const response = await authAPI.put("/update/account", updatedUser);
      toast.success(response.data.message, {
        duration: 2000,
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
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  "auth/changeUserPassword",
  async ({ values, navigate }, { rejectWithValue }) => {
    try {
      const response = await authAPI.put("/change/password", values);
      toast.success(response.data.message, {
        duration: 2000,
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
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  "auth/deleteUserAccount",
  async ({ values, navigate }, { rejectWithValue }) => {
    try {
      const response = await authAPI.delete("/delete/account", {
        data: values,
      });
      toast.success(response.data.message, {
        duration: 2000,
      });
      navigate("/signup");
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);
