import { Schema } from "mongoose";
import type { BodilyWellnessFormData } from "./bodilyWellnessFormModel";
import type { PerformanceWellnessFormData } from "./performanceWellnessFormModel";
import type { MentalWellnessFormData } from "./mentalWellnessFormModel";
import type { SocioCulturalWellnessFormData } from "./socioCulturalWellnessFormModel";
import type { SpiritualWellnessFormData } from "./spiritualWellnessFormModel";
import type { FinancialWellnessFormData } from "./financialWellnessFormModel";

export interface SectionScore {
  rawScore: number;
  maxScore: number;
  percentageScore: number;
}

export interface WellnessScoreData {
  bodilyWellness: SectionScore;
  performanceWellness: SectionScore;
  mentalWellness: SectionScore;
  socioCulturalWellness: SectionScore;
  spiritualWellness: SectionScore;
  financialWellness: SectionScore;
  overall: SectionScore;
}

export interface AllWellnessFormData {
  bodilyWellness: BodilyWellnessFormData;
  performanceWellness: PerformanceWellnessFormData;
  mentalWellness: MentalWellnessFormData;
  socioCulturalWellness: SocioCulturalWellnessFormData;
  spiritualWellness: SpiritualWellnessFormData;
  financialWellness: FinancialWellnessFormData;
}

const SectionScoreSchema = new Schema<SectionScore>(
  {
    rawScore: { type: Number, default: 0 },
    maxScore: { type: Number, default: 0 },
    percentageScore: { type: Number, default: 0 },
  },
  { _id: false },
);

export const WellnessScoreSchema = new Schema<WellnessScoreData>(
  {
    bodilyWellness: { type: SectionScoreSchema, default: () => ({}) },
    performanceWellness: { type: SectionScoreSchema, default: () => ({}) },
    mentalWellness: { type: SectionScoreSchema, default: () => ({}) },
    socioCulturalWellness: { type: SectionScoreSchema, default: () => ({}) },
    spiritualWellness: { type: SectionScoreSchema, default: () => ({}) },
    financialWellness: { type: SectionScoreSchema, default: () => ({}) },
    overall: { type: SectionScoreSchema, default: () => ({}) },
  },
  { _id: false },
);
