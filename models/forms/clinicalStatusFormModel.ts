import { Schema } from "mongoose";
import { FileAttachment, FileSchema } from "./fileSchema";

export type { FileAttachment };

export interface ClinicalStatusFormData {
  assessmentDone: string;
  ecogPerformanceStatus: string;
  weight: string;
  height: string;
  bmi: string;
  haemoglobin: string;
  haemoglobinReport: FileAttachment;
  creatinine: string;
  creatinineReport: FileAttachment;
  comorbidities: string[];
  treatmentCompliance: string;
}

export const ClinicalStatusSchema = new Schema<ClinicalStatusFormData>(
  {
    assessmentDone: { type: String, default: "" },
    ecogPerformanceStatus: { type: String, default: "" },
    weight: { type: String, default: "" },
    height: { type: String, default: "" },
    bmi: { type: String, default: "" },
    haemoglobin: { type: String, default: "" },
    haemoglobinReport: { type: FileSchema, default: () => ({}) },
    creatinine: { type: String, default: "" },
    creatinineReport: { type: FileSchema, default: () => ({}) },
    comorbidities: { type: [String], default: [] },
    treatmentCompliance: { type: String, default: "" },
  },
  { _id: false },
);
