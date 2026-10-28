import { FormikProps } from "formik";
import { clinicalStatusInitialValues } from "./clinicalStatusInitialValues";

export interface ClinicalStatusFormProps {
  initialValues?: typeof clinicalStatusInitialValues;
  patientId?: string;
  isEdit?: boolean;
}

export interface ClinicalStatusSectionProps {
  formik: FormikProps<typeof clinicalStatusInitialValues>;
}

export interface PatientInfo {
  fullName: string;
}