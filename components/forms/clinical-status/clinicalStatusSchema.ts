import * as Yup from "yup";

export const clinicalStatusSchema = Yup.object().shape({
  patientId: Yup.string()
    .required("Patient ID is required"),

  assessmentDone: Yup.string()
    .required("Assessment is required"),

  ecogPerformanceStatus: Yup.string()
    .required("ECOG Performance Status is required"),

  // weight: Yup.number()
  //   .min(10, "Minimum weight is 10 kg")
  //   .max(200, "Maximum weight is 200 kg")
  //   .required("Weight is required"),

  // height: Yup.number()
  //   .min(80, "Minimum height is 80 cm")
  //   .max(220, "Maximum height is 220 cm")
  //   .required("Height is required"),

  // bmi: Yup.string(),

  // haemoglobin: Yup.number()
  //   .min(2, "Minimum value is 2")
  //   .max(20, "Maximum value is 20")
  //   .required("Haemoglobin is required"),

  // haemoglobinReport: Yup.object({
  //   fileName: Yup.string()
  //     .required("Haemoglobin Report is required"),
  //   filePath: Yup.string(),
  // }),

  // creatinine: Yup.number()
  //   .min(0, "Minimum value is 0")
  //   .max(20, "Maximum value is 20")
  //   .required("Creatinine is required"),

  // creatinineReport: Yup.object({
  //   fileName: Yup.string()
  //     .required("Creatinine Report is required"),
  //   filePath: Yup.string(),
  // }),

  // comorbidities: Yup.array()
  //   .min(1, "Select at least one comorbidity"),

  // treatmentCompliance: Yup.string()
  //   .required("Treatment Compliance is required"),
});