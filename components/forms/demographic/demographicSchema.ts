import * as Yup from "yup";

export const demographicSchema = Yup.object().shape({
  // ==================================================
  // IDENTIFICATION
  // ==================================================

  // fullName: Yup.string()
  //   .required("Full Name is required"),

  crNo: Yup.string()
    .required("CR Number is required"),

   dateOfBirth: Yup.string().required(
    "Date of Birth is required"
  ),

  sex: Yup.string()
    .required("Sex is required"),

  maritalStatus: Yup.string()
    .required("Marital Status is required"),

  contactNumber: Yup.string()
    .matches(/^\d{10}$/, "Contact number must be exactly 10 digits")
    .nullable()
    .notRequired(),

  // ==================================================
  // RESIDENCE
  // ==================================================

  // district: Yup.string()
  //   .required("District is required"),

  // state: Yup.string()
  //   .required("State is required"),

  // settlement: Yup.string()
  //   .required("Settlement is required"),

  // distanceToHospital: Yup.string()
  //   .required("Distance to Hospital is required"),

  // ==================================================
  // SOCIAL
  // ==================================================

  // education: Yup.string()
  //   .required("Education is required"),

  // occupation: Yup.string()
  //   .required("Occupation is required"),

  otherOccupation: Yup.string().when("occupation", {
    is: "Others",
    then: (schema) => schema.required("Please specify the occupation"),
    otherwise: (schema) => schema.notRequired(),
  }),

  // monthlyFamilyIncome: Yup.string()
  //   .required("Monthly Family Income is required"),

  // mainCaregiver: Yup.string()
  //   .required("Main Caregiver is required"),

  // ==================================================
  // CANCER DETAILS
  // ==================================================

  cancerType: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one Cancer Type")
    .required(),

  otherCancerType: Yup.string().when("cancerType", {
    is: (value: string[]) => value?.includes("Other"),
    then: (schema) => schema.required("Please specify the Cancer Type"),
    otherwise: (schema) => schema.notRequired(),
  }),

});
