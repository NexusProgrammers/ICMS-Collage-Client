import * as Yup from "yup";

export const applySchema = Yup.object({
  course: Yup.string()
    .oneOf(
      ["pre-medical", "pre-engineering", "computer-science", "arts"],
      "Invalid course selection"
    )
    .required("Please select a course"),

  marks: Yup.string().required("Please provide marks"),

  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Invalid gender selection")
    .required("Please select a gender"),

  phoneNumber: Yup.string().required("Please provide phone number"),

  dateOfBirth: Yup.date().required("Please provide date of birth"),

  address: Yup.string().required("Please provide address"),
});

export const updateApplySchema = Yup.object({
  course: Yup.string()
    .oneOf(
      ["pre-medical", "pre-engineering", "computer-science", "arts"],
      "Invalid course selection"
    )
    .optional(),

  marks: Yup.string().optional(),

  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Invalid gender selection")
    .optional(),

  phoneNumber: Yup.string().optional(),

  dateOfBirth: Yup.date().optional(),

  address: Yup.string().optional(),
});
