import { Schema } from "mongoose";

export interface MentalWellnessFormData {
  feelingLowSad: number;
  wantingToCry: number;
  anxietyFear: number;
  guiltBlameShame: number;
  excessiveIllnessThinking: number;
  lonelinessUncertaintyHope: number;
  avoidingPeople: number;
  angerSympathyPity: number;
  lifeNotWorthLiving: number;
}

export const MentalWellnessSchema = new Schema<MentalWellnessFormData>(
  {
    feelingLowSad: { type: Number, default: 0 },
    wantingToCry: { type: Number, default: 0 },
    anxietyFear: { type: Number, default: 0 },
    guiltBlameShame: { type: Number, default: 0 },
    excessiveIllnessThinking: { type: Number, default: 0 },
    lonelinessUncertaintyHope: { type: Number, default: 0 },
    avoidingPeople: { type: Number, default: 0 },
    angerSympathyPity: { type: Number, default: 0 },
    lifeNotWorthLiving: { type: Number, default: 0 },
  },
  { _id: false },
);
