import * as Yup from "yup";

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email address is required"),
});