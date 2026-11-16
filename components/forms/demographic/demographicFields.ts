/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  sexOptions,
  maritalStatusOptions,
  stateOptions,
  settlementOptions,
  occupationOptions,
  educationOptions,
  cancerTypeOptions,
  monthlyIncomeOptions,
  caregiverOptions,
  distanceToHospitalOptions,
} from "./demographicOptions";

export type DemographicFieldType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "multiselect"
  | "file";

export interface DemographicField {
  name: string;

  label: string;

  type: DemographicFieldType;

  placeholder?: string;

  required?: boolean;

  options?: string[];

  accept?: string;

  disabled?: boolean;

  min?: number;

  max?: number;

  maxLength?: number;

  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];

  showWhen?: (values: Record<string, any>) => boolean;
}

export const demographicFields: DemographicField[] = [
  // =====================================
  // IDENTIFICATION
  // =====================================

  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter Full Name",
    required: true,
  },

  {
    name: "crNo",
    label: "CR Number",
    type: "text",
    placeholder: "Enter CR Number",
    required: true,
  },

  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: true,
  },

  {
    name: "age",
    label: "Age (Years)",
    type: "number",
    placeholder: "Auto calculated",
    disabled: true,
    min: 0,
    max: 120,
  },

  {
    name: "sex",
    label: "Sex",
    type: "select",
    placeholder: "Select Sex",
    required: true,
    options: sexOptions,
  },

  {
    name: "maritalStatus",
    label: "Marital Status",
    type: "select",
    placeholder: "Select Marital Status",
    required: true,
    options: maritalStatusOptions,
  },

  {
    name: "contactNumber",
    label: "Contact Number",
    type: "text",
    placeholder: "Enter 10-digit mobile number",
    maxLength: 10,
    inputMode: "numeric",
  },

  // =====================================
  // RESIDENCE
  // =====================================

  {
    name: "villageTownCity",
    label: "Village / Town / City",
    type: "text",
    placeholder: "Enter Village / Town / City",
  },

  {
    name: "blockTehsil",
    label: "Block / Tehsil",
    type: "text",
    placeholder: "Enter Block / Tehsil",
  },

  {
    name: "district",
    label: "District",
    type: "text",
    placeholder: "Enter District",
  },

  {
    name: "state",
    label: "State",
    type: "select",
    placeholder: "Select State",
    options: stateOptions,
  },

  {
    name: "pinCode",
    label: "PIN Code",
    type: "text",
    placeholder: "Enter PIN Code",
  },

  {
    name: "settlement",
    label: "Settlement",
    type: "select",
    placeholder: "Select Settlement",
    options: settlementOptions,
  },

  {
    name: "distanceToHospital",
    label: "Distance to Hospital",
    type: "select",
    placeholder: "Select Distance",
    options: distanceToHospitalOptions,
  },

  // =====================================
  // SOCIAL
  // =====================================

  {
    name: "education",
    label: "Education",
    type: "select",
    placeholder: "Select Education",
    options: educationOptions,
  },

  {
    name: "occupation",
    label: "Occupation",
    type: "select",
    placeholder: "Select Occupation",
    options: occupationOptions,
  },

  {
    name: "otherOccupation",
    label: "Please Specify Occupation",
    type: "text",
    placeholder: "Enter Occupation",
    showWhen: (values) => values.occupation === "Others",
  },

  {
    name: "monthlyFamilyIncome",
    label: "Monthly Family Income",
    type: "select",
    placeholder: "Enter Monthly Family Income",
    options: monthlyIncomeOptions,
  },

  {
    name: "mainCaregiver",
    label: "Main Caregiver",
    type: "select",
    placeholder: "Enter Main Caregiver",
    options: caregiverOptions,
  },

  // =====================================
  // CANCER DETAILS
  // =====================================

  {
    name: "cancerType",
    label: "Cancer Type",
    type: "multiselect",
    placeholder: "Select Cancer Type",
    required: true,
    options: cancerTypeOptions,
  },

  {
    name: "otherCancerType",
    label: "Please Specify Cancer Type",
    type: "text",
    placeholder: "Enter Cancer Type",
    showWhen: (values) =>
      Array.isArray(values.cancerType) && values.cancerType.includes("Other"),
  },

];
