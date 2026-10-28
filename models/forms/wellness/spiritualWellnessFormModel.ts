import { Schema } from "mongoose";

export interface SpiritualWellnessFormData {
  prayerFaithSpiritualPractices: number;
  complementaryTraditionalHealing: number;
  spiritualBeliefsHopeStrength: number;
  spiritualMindfulnessComfort: number;
}

export const SpiritualWellnessSchema = new Schema<SpiritualWellnessFormData>(
  {
    prayerFaithSpiritualPractices: { type: Number, default: 0 },
    complementaryTraditionalHealing: { type: Number, default: 0 },
    spiritualBeliefsHopeStrength: { type: Number, default: 0 },
    spiritualMindfulnessComfort: { type: Number, default: 0 },
  },
  { _id: false },
);
