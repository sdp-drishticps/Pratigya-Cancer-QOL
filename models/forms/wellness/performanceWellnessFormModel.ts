import { Schema } from "mongoose";

export interface PerformanceWellnessFormData {
  usualActivitiesHome: number;
  usualWorkStudiesSocialActivities: number;
  employmentImpact: number;
  guiltDependenceOnOthers: number;
  religiousCulturalActivities: number;
  relationshipCloseness: number;
}

export const PerformanceWellnessSchema = new Schema<PerformanceWellnessFormData>(
  {
    usualActivitiesHome: { type: Number, default: 0 },
    usualWorkStudiesSocialActivities: { type: Number, default: 0 },
    employmentImpact: { type: Number, default: 0 },
    guiltDependenceOnOthers: { type: Number, default: 0 },
    religiousCulturalActivities: { type: Number, default: 0 },
    relationshipCloseness: { type: Number, default: 0 },
  },
  { _id: false },
);
