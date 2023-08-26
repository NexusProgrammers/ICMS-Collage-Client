import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(20).required("please provide name"),

  email: Yup.string()
    .email("please provide valid email")
    .required("please provide email"),

  password: Yup.string().min(6).required("please provide password"),

  confirm_password: Yup.string()
    .required("please provide confirm password")
    .oneOf([Yup.ref("password"), null], "passwords must be match"),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Please provide valid email")
    .required("Please provide email"),

  password: Yup.string().required("Please provide password"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Please provide valid email")
    .required("Please provide email"),
});

export const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("please enter old password"),

  newPassword: Yup.string().min(6).required("please enter new password"),

  confirmNewPassword: Yup.string()
    .required("please enter confirm new password")
    .oneOf([Yup.ref("newPassword"), null], "passwords must be match"),
});

export const resetPasswordSchema = Yup.object({
  newPassword: Yup.string().min(6).required("please provide new password"),

  confirm_new_password: Yup.string()
    .required("please provide confirm new password")
    .oneOf([Yup.ref("newPassword"), null], "passwords must be match"),
});
