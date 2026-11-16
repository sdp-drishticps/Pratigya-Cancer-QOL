import { FormFieldConfig } from "@/components/forms/shared/FormField";

import {
  assessmentDoneOptions,
  ecogPerformanceStatusOptions,
  comorbidityOptions,
  treatmentComplianceOptions,
} from "./clinicalStatusOptions";

export const clinicalStatusFields: FormFieldConfig[] = [
  {
    name: "assessmentDone",
    label: "Assessment Done",
    type: "select",
    required: true,
    placeholder: "Select Assessment",
    options: assessmentDoneOptions,
  },

  {
    name: "ecogPerformanceStatus",
    label: "ECOG Performance Status",
    type: "select",
    required: true,
    placeholder: "Select ECOG",
    options: ecogPerformanceStatusOptions,
  },

  {
    name: "weight",
    label: "Weight (kg)",
    type: "number",
    min: 10,
    max: 200,
    step: "0.1",
    placeholder: "Enter Weight",
  },

  {
    name: "height",
    label: "Height (cm)",
    type: "number",
    min: 80,
    max: 220,
    step: "0.1",
    placeholder: "Enter Height",
  },

  {
    name: "bmi",
    label: "BMI",
    type: "calculated",
    placeholder: "Auto Calculated",
  },

  {
    name: "haemoglobin",
    label: "Haemoglobin (g/dL)",
    type: "number",
    min: 2,
    max: 20,
    step: "0.1",
    placeholder: "Enter Haemoglobin",
  },

  {
    name: "haemoglobinReport",
    label: "Upload Haemoglobin Report",
    type: "file",
    accept: ".pdf,.jpg,.jpeg,.png",
  },

  {
    name: "creatinine",
    label: "Creatinine (mg/dL)",
    type: "number",
    min: 0,
    max: 20,
    step: "0.1",
    placeholder: "Enter Creatinine",
  },

  {
    name: "creatinineReport",
    label: "Upload Creatinine Report",
    type: "file",
    accept: ".pdf,.jpg,.jpeg,.png",
  },

  {
    name: "comorbidities",
    label: "Comorbidities",
    type: "multiselect",
    placeholder: "Select Comorbidities",
    options: comorbidityOptions,
  },

  {
    name: "treatmentCompliance",
    label: "Treatment Compliance",
    type: "select",
    placeholder: "Select Treatment Compliance",
    options: treatmentComplianceOptions,
  },
];
