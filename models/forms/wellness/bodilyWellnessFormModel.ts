import { Schema } from "mongoose";

export interface BodilyWellnessFormData {
  physicalExhaustion: number;
  breathingDifficulty: number;
  fever: number;
  painActivityDifficulty: number;
  nauseaAppetiteDigestiveIssues: number;
  vomiting: number;
  sleepDifficulty: number;
  wellRested: number;
  dailyActivityHelp: number;
  swellingUlcerBleedingDischarge: number;
  physicalDeformityBodyShape: number;
}

export const BodilyWellnessSchema = new Schema<BodilyWellnessFormData>(
  {
    physicalExhaustion: { type: Number, default: 0 },
    breathingDifficulty: { type: Number, default: 0 },
    fever: { type: Number, default: 0 },
    painActivityDifficulty: { type: Number, default: 0 },
    nauseaAppetiteDigestiveIssues: { type: Number, default: 0 },
    vomiting: { type: Number, default: 0 },
    sleepDifficulty: { type: Number, default: 0 },
    wellRested: { type: Number, default: 0 },
    dailyActivityHelp: { type: Number, default: 0 },
    swellingUlcerBleedingDischarge: { type: Number, default: 0 },
    physicalDeformityBodyShape: { type: Number, default: 0 },
  },
  { _id: false },
);
