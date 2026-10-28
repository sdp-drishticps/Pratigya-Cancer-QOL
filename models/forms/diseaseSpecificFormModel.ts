import { Schema } from "mongoose";

// ─── Cervical Cancer ──────────────────────────────────

export interface CervicalCancerFormData {
  menarche_age: string;
  marriage_age: string;
  first_intimate_relationship_age: string;
  family_planning_methods: string[];
  family_planning_duration: string;
  pregnancy_count: string;
  miscarriage: string;
  miscarriage_details: string;
  stillbirth: string;
  stillbirth_details: string;
  visited_gynecologist: string;
  screening_test: string;
  abdominal_cramp: string;
  vaginal_discharge: string;
  burning_urine: string;
  bowel_control: string;
  leg_swelling: string;
  back_pain: string;
  squatting: string;
  role_wife: string;
  relationship_closeness: string;
  uneasy_discussing: string;
  people_avoided: string;
}

export const CervicalCancerSchema = new Schema<CervicalCancerFormData>(
  {
    menarche_age: { type: String, default: "" },
    marriage_age: { type: String, default: "" },
    first_intimate_relationship_age: { type: String, default: "" },
    family_planning_methods: { type: [String], default: [] },
    family_planning_duration: { type: String, default: "" },
    pregnancy_count: { type: String, default: "" },
    miscarriage: { type: String, default: "" },
    miscarriage_details: { type: String, default: "" },
    stillbirth: { type: String, default: "" },
    stillbirth_details: { type: String, default: "" },
    visited_gynecologist: { type: String, default: "" },
    screening_test: { type: String, default: "" },
    abdominal_cramp: { type: String, default: "" },
    vaginal_discharge: { type: String, default: "" },
    burning_urine: { type: String, default: "" },
    bowel_control: { type: String, default: "" },
    leg_swelling: { type: String, default: "" },
    back_pain: { type: String, default: "" },
    squatting: { type: String, default: "" },
    role_wife: { type: String, default: "" },
    relationship_closeness: { type: String, default: "" },
    uneasy_discussing: { type: String, default: "" },
    people_avoided: { type: String, default: "" },
  },
  { _id: false },
);

// ─── Breast Cancer ────────────────────────────────────

export interface BreastCancerFormData {
  arm_shoulder_pain: string;
  swelling: string;
  difficulty_raising_arm: string;
  skin_changes: string;
  difficulty_sleeping: string;
  difficulty_carrying: string;
  hesitation_clothes: string;
  relationship_closeness: string;
  uneasy_social: string;
}

export const BreastCancerSchema = new Schema<BreastCancerFormData>(
  {
    arm_shoulder_pain: { type: String, default: "" },
    swelling: { type: String, default: "" },
    difficulty_raising_arm: { type: String, default: "" },
    skin_changes: { type: String, default: "" },
    difficulty_sleeping: { type: String, default: "" },
    difficulty_carrying: { type: String, default: "" },
    hesitation_clothes: { type: String, default: "" },
    relationship_closeness: { type: String, default: "" },
    uneasy_social: { type: String, default: "" },
  },
  { _id: false },
);

// ─── Head and Neck Cancer ─────────────────────────────

export interface HeadAndNeckCancerFormData {
  pain: string;
  difficulty_chewing_swallowing: string;
  choking_coughing: string;
  voice_changes: string;
  wounds_ulcers: string;
  taste_changes: string;
  appearance_distress: string;
  embarrassed_tube: string;
  uncomfortable_eating_out: string;
  smell_avoidance: string;
  self_blame: string;
}

export const HeadAndNeckCancerSchema = new Schema<HeadAndNeckCancerFormData>(
  {
    pain: { type: String, default: "" },
    difficulty_chewing_swallowing: { type: String, default: "" },
    choking_coughing: { type: String, default: "" },
    voice_changes: { type: String, default: "" },
    wounds_ulcers: { type: String, default: "" },
    taste_changes: { type: String, default: "" },
    appearance_distress: { type: String, default: "" },
    embarrassed_tube: { type: String, default: "" },
    uncomfortable_eating_out: { type: String, default: "" },
    smell_avoidance: { type: String, default: "" },
    self_blame: { type: String, default: "" },
  },
  { _id: false },
);
