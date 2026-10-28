import { Schema } from "mongoose";

export interface SocioCulturalWellnessFormData {
  familySupport: number;
  familyAcceptanceAdjustment: number;
  familyUnderstanding: number;
  burdenToFamily: number;
  trustedPersonToTalk: number;
  avoidingSocialGatherings: number;
  treatedDifferentlyByFamily: number;
  treatedDifferentlyByOthers: number;
}

export const SocioCulturalWellnessSchema = new Schema<SocioCulturalWellnessFormData>(
  {
    familySupport: { type: Number, default: 0 },
    familyAcceptanceAdjustment: { type: Number, default: 0 },
    familyUnderstanding: { type: Number, default: 0 },
    burdenToFamily: { type: Number, default: 0 },
    trustedPersonToTalk: { type: Number, default: 0 },
    avoidingSocialGatherings: { type: Number, default: 0 },
    treatedDifferentlyByFamily: { type: Number, default: 0 },
    treatedDifferentlyByOthers: { type: Number, default: 0 },
  },
  { _id: false },
);
