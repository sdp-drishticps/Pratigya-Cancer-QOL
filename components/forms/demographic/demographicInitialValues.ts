import { DemographicFormValues } from "./types";

export const demographicInitialValues: DemographicFormValues = {
  // ===========================
  // Identification
  // ===========================

  fullName: "",
  crNo: "",
  dateOfBirth: "",
  age: "",
  sex: "",
  maritalStatus: "",
  contactNumber: "",

  // ===========================
  // Residence
  // ===========================

  villageTownCity: "",
  blockTehsil: "",
  district: "",
  state: "",
  pinCode: "",
  settlement: "",
  distanceToHospital: "",

  // ===========================
  // Social
  // ===========================

  education: "",
  occupation: "",
  otherOccupation: "",
  monthlyFamilyIncome: "",
  mainCaregiver: "",

  // ===========================
  // Cancer Details
  // ===========================

  cancerType: [],
  otherCancerType: "",

};