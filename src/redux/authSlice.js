import { createSlice } from "@reduxjs/toolkit";
import {
  cancelForgotPasswordCode,
  changeUserPassword,
  deleteUserAccount,
  forgotPassword,
  getUserAccount,
  googleSignIn,
  googleSignUp,
  resendForgotPasswordCode,
  resendVerificationCode,
  resetPassword,
  signInUser,
  signUpUser,
  updateUserAccount,
  verifyCode,
  verifyEmail,
} from "../service/authService";
import Cookie from "js-cookie";

const userCookie = Cookie.get("user");

const tokenCookie = Cookie.get("token");

const initialState = {
  user: userCookie ? JSON.parse(userCookie) : null,
  token: tokenCookie || null,
  signUpLoading: false,
  signUpError: null,
  googleSignupLoading: false,
  googleSignupError: null,
  verifyEmailLoading: false,
  verifyEmailError: null,
  resendVerificationCodeLoading: false,
  resendVerificationCodeError: null,
  signInLoading: false,
  signInError: null,
  googleSignInLoading: false,
  googleSignInError: null,
  forgotPasswordLoading: false,
  forgotPasswordError: null,
  resendForgotPasswordCodeLoading: false,
  resendForgotPasswordCodeError: null,
  verifyCodeLoading: false,
  verifyCodeError: null,
  resetPasswordLoading: false,
  resetPasswordError: null,
  cancelForgotPasswordLoading: false,
  cancelForgotPasswordError: null,
  getUserAccountLoading: false,
  getUserAccountError: null,
  updateUserAccountLoading: false,
  updateUserAccountError: null,
  changeUserPasswordLoading: false,
  changeUserPasswordError: null,
  deleteUserAccountLoading: false,
  deleteUserAccountError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      Cookie.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.signUpLoading = true;
        state.signUpError = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.signUpLoading = false;
        state.signUpError = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        Cookie.set("token", action.payload.token, {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
        Cookie.set("user", JSON.stringify(action.payload.user), {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.signUpLoading = false;
        state.signUpError = action.error.message;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.verifyEmailLoading = true;
        state.verifyEmailError = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.verifyEmailLoading = false;
        state.verifyEmailError = null;
        state.user = action.payload.user;
        Cookie.set("token", action.payload.token, {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
        Cookie.set("user", JSON.stringify(action.payload.user), {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verifyEmailLoading = false;
        state.verifyEmailError = action.error.message;
      })
      .addCase(resendVerificationCode.pending, (state) => {
        state.resendVerificationCodeLoading = true;
        state.resendVerificationCodeError = null;
      })
      .addCase(resendVerificationCode.fulfilled, (state, action) => {
        state.resendVerificationCodeLoading = false;
        state.resendVerificationCodeError = null;
        state.user = action.payload.user;
        Cookie.set("token", action.payload.token, {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
        Cookie.set("user", JSON.stringify(action.payload.user), {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
      })
      .addCase(resendVerificationCode.rejected, (state, action) => {
        state.resendVerificationCodeLoading = false;
        state.resendVerificationCodeError = action.error.message;
      })
      .addCase(googleSignUp.pending, (state) => {
        state.googleSignupLoading = true;
        state.googleSignupError = null;
      })
      .addCase(googleSignUp.fulfilled, (state, action) => {
        state.googleSignupLoading = false;
        state.googleSignupError = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        const tokenExpiration = action.meta.arg.rememberMe ? 30 : 7;
        Cookie.set("token", action.payload.token, {
          expires: tokenExpiration,
          sameSite: "Strict",
          secure: true,
        });
        Cookie.set("user", JSON.stringify(action.payload.user), {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
      })
      .addCase(googleSignUp.rejected, (state, action) => {
        state.googleSignupLoading = false;
        state.googleSignupError = action.error.message;
      })
      .addCase(signInUser.pending, (state) => {
        state.signInLoading = true;
        state.signInError = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.signInLoading = false;
        state.signInError = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        const tokenExpiration = action.meta.arg.rememberMe ? 30 : 7;
        Cookie.set("token", action.payload.token, {
          expires: tokenExpiration,
          sameSite: "Strict",
          secure: true,
        });
        Cookie.set("user", JSON.stringify(action.payload.user), {
          expires: tokenExpiration,
          sameSite: "Strict",
          secure: true,
        });
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.signInLoading = false;
        state.signInError = action.error.message;
      })
      .addCase(googleSignIn.pending, (state) => {
        state.googleSignInLoading = true;
        state.googleSignInError = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.googleSignInLoading = false;
        state.googleSignInError = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        const tokenExpiration = action.meta.arg.rememberMe ? 30 : 7;
        Cookie.set("token", action.payload.token, {
          expires: tokenExpiration,
          sameSite: "Strict",
          secure: true,
        });
        Cookie.set("user", JSON.stringify(action.payload.user), {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.googleSignInLoading = false;
        state.googleSignInError = action.error.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordLoading = true;
        state.forgotPasswordError = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordError = null;
        state.user = action.payload.user;
        Cookie.set("token", action.payload.token, {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
        Cookie.set("user", JSON.stringify(action.payload.user), {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordError = action.error.message;
      })
      .addCase(resendForgotPasswordCode.pending, (state) => {
        state.resendForgotPasswordCodeLoading = true;
        state.resendForgotPasswordCodeError = null;
      })
      .addCase(resendForgotPasswordCode.fulfilled, (state, action) => {
        state.resendForgotPasswordCodeLoading = false;
        state.resendForgotPasswordCodeError = null;
        state.user = action.payload.user;
        Cookie.set("token", action.payload.token, {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
        Cookie.set("user", JSON.stringify(action.payload.user), {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
      })
      .addCase(resendForgotPasswordCode.rejected, (state, action) => {
        state.resendForgotPasswordCodeLoading = false;
        state.resendForgotPasswordCodeError = action.error.message;
      })
      .addCase(verifyCode.pending, (state) => {
        state.verifyCodeLoading = true;
        state.verifyCodeError = null;
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        state.verifyCodeLoading = false;
        state.verifyCodeError = null;
        state.user = action.payload.user;
        Cookie.set("token", action.payload.token, {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
        Cookie.set("user", JSON.stringify(action.payload.user), {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.verifyCodeLoading = false;
        state.verifyCodeError = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordLoading = true;
        state.resetPasswordError = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordError = null;
        state.user = action.payload.user;
        Cookie.set("token", action.payload.token, {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
        Cookie.set("user", JSON.stringify(action.payload.user), {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordError = action.error.message;
      })

      .addCase(cancelForgotPasswordCode.pending, (state) => {
        state.cancelForgotPasswordLoading = true;
        state.cancelForgotPasswordError = null;
      })
      .addCase(cancelForgotPasswordCode.fulfilled, (state, action) => {
        state.cancelForgotPasswordLoading = false;
        state.cancelForgotPasswordError = null;
        state.user = action.payload.user;
        Cookie.set("token", action.payload.token, {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
        Cookie.set("user", JSON.stringify(action.payload.user), {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
      })
      .addCase(cancelForgotPasswordCode.rejected, (state, action) => {
        state.cancelForgotPasswordLoading = false;
        state.cancelForgotPasswordError = action.error.message;
      })
      .addCase(getUserAccount.pending, (state) => {
        state.getUserAccountLoading = true;
        state.getUserAccountError = null;
      })
      .addCase(getUserAccount.fulfilled, (state, action) => {
        state.getUserAccountLoading = false;
        state.getUserAccountError = null;
        state.user = action.payload.user;
      })
      .addCase(getUserAccount.rejected, (state, action) => {
        state.getUserAccountLoading = false;
        state.getUserAccountError = action.error.message;
      })
      .addCase(updateUserAccount.pending, (state) => {
        state.updateUserAccountLoading = true;
        state.updateUserAccountError = null;
      })
      .addCase(updateUserAccount.fulfilled, (state, action) => {
        state.updateUserAccountLoading = false;
        state.updateUserAccountError = null;
        state.user = action.payload.user;
        Cookie.set("user", JSON.stringify(action.payload.user), {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
      })
      .addCase(updateUserAccount.rejected, (state, action) => {
        state.updateUserAccountLoading = false;
        state.updateUserAccountError = action.error.message;
      })
      .addCase(changeUserPassword.pending, (state) => {
        state.changeUserPasswordLoading = true;
        state.changeUserPasswordError = null;
      })
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.changeUserPasswordLoading = false;
        state.changeUserPasswordError = null;
        state.user = action.payload.user;
        Cookie.set("user", JSON.stringify(action.payload.user), {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.changeUserPasswordLoading = false;
        state.changeUserPasswordError = action.error.message;
      })
      .addCase(deleteUserAccount.pending, (state) => {
        state.deleteUserAccountLoading = true;
        state.deleteUserAccountError = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state, action) => {
        state.deleteUserAccountLoading = false;
        state.deleteUserAccountError = null;
        state.user = action.payload.user;
        Cookie.remove("user");
        Cookie.remove("token");
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.deleteUserAccountLoading = false;
        state.deleteUserAccountError = action.error.message;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
