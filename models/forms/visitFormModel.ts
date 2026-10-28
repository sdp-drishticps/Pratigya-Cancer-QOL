import { Schema } from "mongoose";
import { FileAttachment, FileSchema } from "./fileSchema";

export type { FileAttachment };

export interface VisitFormData {
  phaseOfCare: string;
  diagnosisDate: string;
  monthsSinceDiagnosis: string;
  biopsyReport: FileAttachment;
  stageAtDiagnosis: string;
  extent: string;
  treatmentReceived: string[];
  treatmentStatus: string;
  treatmentCompletionDate: string;
  diseaseStatus: string;
  recurrenceDate: string;
  clinicalReport: FileAttachment;
  ptnmStaging: string;
  durationOfSurvival: string;
  tobaccoUse: string;
  tobaccoType: string;
  oralCavityPhoto: FileAttachment;
  partnerTobaccoUse: string;
  alcoholUse: string;
  respondent: string;
  consent: boolean;
}

export const VisitDetailsSchema = new Schema<VisitFormData>(
  {
    phaseOfCare: { type: String, default: "" },
    diagnosisDate: { type: String, default: "" },
    monthsSinceDiagnosis: { type: String, default: "" },
    biopsyReport: { type: FileSchema, default: () => ({}) },
    stageAtDiagnosis: { type: String, default: "" },
    extent: { type: String, default: "" },
    treatmentReceived: { type: [String], default: [] },
    treatmentStatus: { type: String, default: "" },
    treatmentCompletionDate: { type: String, default: "" },
    diseaseStatus: { type: String, default: "" },
    recurrenceDate: { type: String, default: "" },
    clinicalReport: { type: FileSchema, default: () => ({}) },
    ptnmStaging: { type: String, default: "" },
    durationOfSurvival: { type: String, default: "" },
    tobaccoUse: { type: String, default: "" },
    tobaccoType: { type: String, default: "" },
    oralCavityPhoto: { type: FileSchema, default: () => ({}) },
    partnerTobaccoUse: { type: String, default: "" },
    alcoholUse: { type: String, default: "" },
    respondent: { type: String, default: "" },
    consent: { type: Boolean, default: false },
  },
  { _id: false },
);
