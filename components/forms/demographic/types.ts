import { FormikProps } from "formik";

export interface DemographicFormValues {
  // ===========================
  // Identification
  // ===========================

  fullName: string;
  crNo: string;
  dateOfBirth: string;
  age: number | "";
  sex: string;
  maritalStatus: string;

  // ===========================
  // Residence
  // ===========================

  villageTownCity: string;
  blockTehsil: string;
  district: string;
  state: string;
  pinCode: string;
  settlement: string;
  distanceToHospital: string;

  // ===========================
  // Social
  // ===========================

  education: string;
  occupation: string;
  otherOccupation: string;
  monthlyFamilyIncome: string;
  mainCaregiver: string;

  // ===========================
  // Cancer Details
  // ===========================

  cancerType: string[];
  otherCancerType: string;


}

export interface SectionProps {
  formik: FormikProps<DemographicFormValues>;
}