import { Schema } from "mongoose";

export interface PatientNarrativeFormData {
  dialect: string;
  dialect_other: string;
  speaker: string;
  health_since_last_visit: string;
  most_trouble: string;
  difficult_tasks: string;
  family_impact: string;
  treatment_cost: string;
  support: string;
  future_hopes_worries: string;
  anything_else: string;
  keywords: string;
  themes: string[];
  support_terms: string;
  most_important_sentence: string;
  narrative_vs_scores: string;
}

export const PatientNarrativeSchema = new Schema<PatientNarrativeFormData>(
  {
    dialect: { type: String, default: "" },
    dialect_other: { type: String, default: "" },
    speaker: { type: String, default: "" },
    health_since_last_visit: { type: String, default: "" },
    most_trouble: { type: String, default: "" },
    difficult_tasks: { type: String, default: "" },
    family_impact: { type: String, default: "" },
    treatment_cost: { type: String, default: "" },
    support: { type: String, default: "" },
    future_hopes_worries: { type: String, default: "" },
    anything_else: { type: String, default: "" },
    keywords: { type: String, default: "" },
    themes: { type: [String], default: [] },
    support_terms: { type: String, default: "" },
    most_important_sentence: { type: String, default: "" },
    narrative_vs_scores: { type: String, default: "" },
  },
  { _id: false },
);
