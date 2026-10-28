import { Schema } from "mongoose";

export interface ISectionStatus {
  clinicalStatus: boolean;
  bodilyWellness: boolean;
  performanceWellness: boolean;
  mentalWellness: boolean;
  socioCulturalWellness: boolean;
  spiritualWellness: boolean;
  financialWellness: boolean;
  womensHealth: boolean;
  patientNarrative: boolean;
  diseaseSpecific: {
    cervicalCancer: boolean;
    breastCancer: boolean;
    headAndNeckCancer: boolean;
  };
}

export const SectionStatusSchema = new Schema<ISectionStatus>(
  {
    clinicalStatus: { type: Boolean, default: false },
    bodilyWellness: { type: Boolean, default: false },
    performanceWellness: { type: Boolean, default: false },
    mentalWellness: { type: Boolean, default: false },
    socioCulturalWellness: { type: Boolean, default: false },
    spiritualWellness: { type: Boolean, default: false },
    financialWellness: { type: Boolean, default: false },
    womensHealth: { type: Boolean, default: false },
    patientNarrative: { type: Boolean, default: false },
    diseaseSpecific: {
      cervicalCancer: { type: Boolean, default: false },
      breastCancer: { type: Boolean, default: false },
      headAndNeckCancer: { type: Boolean, default: false },
    },
  },
  { _id: false },
);
