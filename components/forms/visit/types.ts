import { FormikProps } from "formik";
import { visitInitialValues } from "./visitInitialValues";

export interface VisitFormProps {
  initialValues?: typeof visitInitialValues;
  patientId?: string;
  isEdit?: boolean;
}

export interface PatientInfo {
  fullName: string;
  diagnosisDate: string;
}

export interface VisitSectionProps {
  formik: FormikProps<typeof visitInitialValues>;
}