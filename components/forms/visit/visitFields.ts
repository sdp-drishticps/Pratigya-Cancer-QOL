/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormFieldConfig } from "@/components/forms/shared/FormField";
import {
  phaseOfCareOptions,
  respondentOptions,
  stageOptions,
  extentOptions,
  treatmentReceivedOptions,
  treatmentStatusOptions,
  diseaseStatusOptions,
  tobaccoUseOptions,
  partnerTobaccoOptions,
  alcoholUseOptions,
} from "./visitOptions";

export const visitFields: FormFieldConfig[] = [
  // =====================================
  // VISIT INFO
  // =====================================

  {
    name: "visitDate",
    label: "Date of Visit",
    type: "date",
    required: true,
    disabled: true,
  },

  {
    name: "phaseOfCare",
    label: "Phase of Care",
    type: "select",
    placeholder: "Select Phase",
    options: phaseOfCareOptions,
  },

  {
    name: "treatmentCompletionDate",
    label: "Date of Treatment Completion",
    type: "date",
    showWhen: (values: Record<string, any>) =>
      values.phaseOfCare === "Treatment completed",
  },

  {
    name: "diagnosisDate",
    label: "Date of Diagnosis",
    type: "date",
  },

  {
    name: "monthsSinceDiagnosis",
    label: "Months Since Diagnosis",
    type: "calculated",
    placeholder: "Auto-calculated",
  },

  {
    name: "biopsyReport",
    label: "Upload Biopsy Report",
    type: "file",
    accept: ".pdf,.jpg,.jpeg,.png",
  },

  {
    name: "stageAtDiagnosis",
    label: "Stage at Diagnosis",
    type: "select",
    placeholder: "Select Stage",
    options: stageOptions,
  },

  {
    name: "extent",
    label: "Extent",
    type: "select",
    placeholder: "Select Extent",
    options: extentOptions,
  },

  {
    name: "treatmentReceived",
    label: "Treatment Received",
    type: "multiselect",
    placeholder: "Select Treatment",
    options: treatmentReceivedOptions,
  },

  {
    name: "treatmentStatus",
    label: "Treatment Status",
    type: "select",
    placeholder: "Select Treatment Status",
    options: treatmentStatusOptions,
  },

  // =====================================
  // DISEASE STATUS
  // =====================================

  {
    name: "diseaseStatus",
    label: "Disease Status",
    type: "select",
    placeholder: "Select Disease Status",
    required: true,
    options: diseaseStatusOptions,
  },

  {
    name: "recurrenceDate",
    label: "Date of Recurrence",
    type: "date",
    showWhen: (values) => values.diseaseStatus === "Recurrence or Progression",
  },

  {
    name: "clinicalReport",
    label: "Upload Clinical Report",
    type: "file",
    accept: ".pdf,.jpg,.jpeg,.png",
    showWhen: (values) =>
      values.diseaseStatus === "Stable Disease" ||
      values.diseaseStatus === "Disease-free",
  },

  {
    name: "ptnmStaging",
    label: "pTNM Staging",
    type: "text",
    placeholder: "Enter pTNM Staging",
    showWhen: (values) =>
      values.diseaseStatus === "Stable Disease" ||
      values.diseaseStatus === "Disease-free",
  },

  {
    name: "durationOfSurvival",
    label: "Duration of Survival",
    type: "text",
    placeholder: "Enter Duration",
    showWhen: (values) => values.diseaseStatus === "Disease-free",
  },

  // =====================================
  // TOBACCO & ALCOHOL
  // =====================================

  {
    name: "tobaccoUse",
    label: "Tobacco Use",
    type: "select",
    placeholder: "Select Tobacco Use",
    required: true,
    options: tobaccoUseOptions,
  },

  {
    name: "tobaccoType",
    label: "Type of Tobacco Used",
    type: "text",
    placeholder: "Enter Tobacco Type",
    showWhen: (values) =>
      values.tobaccoUse === "Previously Used" ||
      values.tobaccoUse === "Currently Using",
  },

  {
    name: "oralCavityPhoto",
    label: "Upload Oral Cavity Photo",
    type: "file",
    accept: ".jpg,.jpeg,.png",
    required: true,
    showWhen: (values) =>
      values.tobaccoUse === "Previously Used" ||
      values.tobaccoUse === "Currently Using",
  },

  {
    name: "partnerTobaccoUse",
    label: "Partner Tobacco Use",
    type: "select",
    placeholder: "Select Option",
    options: partnerTobaccoOptions,
  },

  {
    name: "alcoholUse",
    label: "Alcohol Use",
    type: "select",
    placeholder: "Select Alcohol Use",
    options: alcoholUseOptions,
  },

  // =====================================
  // RESPONDENT & CONSENT
  // =====================================

  {
    name: "respondent",
    label: "Respondent",
    type: "select",
    placeholder: "Select Respondent",
    required: true,
    options: respondentOptions,
  },

  {
    name: "consent",
    label: "Consent obtained from the patient",
    type: "checkbox",
    required: true,
  },
];
