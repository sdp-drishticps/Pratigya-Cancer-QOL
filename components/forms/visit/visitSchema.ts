import * as Yup from "yup";

export const visitSchema = Yup.object().shape({
  patientId: Yup.string().trim().required("Patient ID is required"),


  treatmentCompletionDate: Yup.string().when("phaseOfCare", {
    is: "Treatment completed",
    then: (schema) => schema.required("Treatment Completion Date is required"),
    otherwise: (schema) => schema.notRequired(),
  }),


  recurrenceDate: Yup.string().when("diseaseStatus", {
    is: "Recurrence or Progression",
    then: (schema) =>
      schema.required("Date of Recurrence / Progression is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  clinicalReport: Yup.object().when("diseaseStatus", {
    is: (value: string) =>
      value === "Stable Disease" || value === "Disease-free",

    then: () =>
      Yup.object({
        fileName: Yup.string().required(
          "Clinical / Radiological Report is required",
        ),
      }),

    otherwise: () =>
      Yup.object({
        fileName: Yup.string(),
      }),
  }),

  ptnmStaging: Yup.string().when("diseaseStatus", {
    is: (value: string) =>
      value === "Stable Disease" || value === "Disease-free",

    then: (schema) => schema.required("pTNM Staging is required"),

    otherwise: (schema) => schema.notRequired(),
  }),

  durationOfSurvival: Yup.string().when("diseaseStatus", {
    is: "Disease-free",

    then: (schema) => schema.required("Duration of Survival is required"),

    otherwise: (schema) => schema.notRequired(),
  }),

  tobaccoUse: Yup.string().required("Tobacco Use is required"),

  tobaccoType: Yup.string().when("tobaccoUse", {
    is: (value: string) =>
      value === "Previously Used" || value === "Currently Using",

    then: (schema) => schema.required("Please specify the Tobacco Type"),

    otherwise: (schema) => schema.notRequired(),
  }),

  oralCavityPhoto: Yup.object().when("tobaccoUse", {
    is: (value: string) =>
      value === "Previously Used" || value === "Currently Using",

    then: () =>
      Yup.object({
        fileName: Yup.string().required("Oral Cavity Photograph is required"),
      }),

    otherwise: () =>
      Yup.object({
        fileName: Yup.string(),
      }),
  }),

  respondent: Yup.string().required("Respondent is required"),

  consent: Yup.boolean().oneOf([true], "Consent is required"),
});
