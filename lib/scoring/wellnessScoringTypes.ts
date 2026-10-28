// =====================================
// Wellness Scoring — Types
// =====================================

export type WellnessStatus =
  | "doing-well"
  | "attention"
  | "action"
  | "not-measured";

export interface SectionScore {
  /** Raw summed score from answered Likert values */
  rawScore: number | null;
  /** Normalized score (rawScore / maxRaw) × 100 */
  score: number | null;
  /** Maximum possible score shown in the UI (questionCount × 100) */
  maxScore: number;
  /** Normalized score rounded to 1 decimal place */
  average: number | null;
  /** Score per 100 points, matches DB schema */
  percentageScore: number | null;
  /** Difference in normalized score vs previous visit (null if no prior visit) */
  change: number | null;
  /** Computed status based on thresholds */
  status: WellnessStatus;
  /** Lower score is better (higher distress = higher score for symptom sections) */
  lowerIsBetter: boolean;
  /** Normalized score at or below which status is "doing-well" */
  greenThreshold: number;
}

export interface WellnessInsightsPayload {
  overall: SectionScore;
  bodilyWellness: SectionScore;
  performanceWellness: SectionScore;
  mentalWellness: SectionScore;
  socioCulturalWellness: SectionScore;
  spiritualWellness: SectionScore;
  financialWellness: SectionScore;
}

export interface SectionConfig {
  /** All question field names stored in the Visit section */
  questionKeys: readonly string[];
  /** Normalized score at or below which status is "doing-well" */
  greenThreshold: number;
  /** Normalized score above which status becomes "action" */
  actionThreshold: number;
  /** Whether a lower score means the patient is doing better */
  lowerIsBetter: boolean;
}
