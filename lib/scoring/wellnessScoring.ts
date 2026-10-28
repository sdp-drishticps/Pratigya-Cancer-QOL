// =====================================
// Wellness Scoring Utility
// =====================================
//
// All wellness sections use a 0–4 Likert scale per question.
// Raw score  = sum of answered values
// Max raw    = questionCount × 4
// Normalized = (rawScore / maxRaw) × 100   → score per 100 points
// maxScore   = questionCount × 100          → displayed as /N00 in the UI
//
// Status thresholds (normalized score, lower = worse):
//   doing-well  :  0   ≤ score ≤ greenThreshold
//   attention   :  greenThreshold < score ≤ actionThreshold
//   action      :  score > actionThreshold
//   not-measured:  section data is empty {}
// =====================================

export type { WellnessStatus, SectionScore, WellnessInsightsPayload } from "./wellnessScoringTypes";
import type { SectionConfig, WellnessInsightsPayload } from "./wellnessScoringTypes";
import { SECTION_CONFIGS } from "./wellnessScoringConfigs";

// =====================================
// Helpers
// =====================================

/**
 * Returns true if the section data object has at least one answered question.
 */
function isSectionFilled(
  data: Record<string, unknown>,
  questionKeys: readonly string[],
): boolean {
  return questionKeys.some(
    (key) =>
      key in data &&
      data[key] !== undefined &&
      data[key] !== null &&
      data[key] !== "",
  );
}

/**
 * Derives a WellnessStatus from a normalized score and config thresholds.
 * For lowerIsBetter sections (most sections) a high score means more distress.
 */
function deriveStatus(
  normalizedScore: number,
  config: SectionConfig,
): import("./wellnessScoringTypes").WellnessStatus {
  if (normalizedScore <= config.greenThreshold) {
    return "doing-well";
  }
  if (normalizedScore <= config.actionThreshold) {
    return "attention";
  }
  return "action";
}

/**
 * Rounds a number to 1 decimal place.
 */
function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

// =====================================
// Core Scoring Function
// =====================================

/**
 * Scores a single wellness section.
 *
 * @param sectionData   - The `Record<string, unknown>` stored in Visit for this section
 * @param config        - The section's configuration (question keys + thresholds)
 * @param prevRawScore  - The raw score from the previous visit's same section (for change calc)
 * @returns             - A fully populated SectionScore
 */
function scoreSection(
  sectionData: Record<string, unknown>,
  config: SectionConfig,
  prevRawScore: number | null,
): import("./wellnessScoringTypes").SectionScore {
  const { questionKeys, greenThreshold, actionThreshold, lowerIsBetter } =
    config;

  const maxRaw = questionKeys.length * 4;
  const maxScore = questionKeys.length * 100;

  // Not-measured: section was never filled
  if (!isSectionFilled(sectionData, questionKeys)) {
    return {
      rawScore: null,
      score: null,
      maxScore,
      average: null,
      percentageScore: null,
      change: null,
      status: "not-measured",
      lowerIsBetter,
      greenThreshold,
    };
  }

  // Compute raw score
  let rawScore = 0;
  for (const key of questionKeys) {
    const val = sectionData[key];
    const numVal = typeof val === "number" ? val : Number(val ?? 0);
    rawScore += isNaN(numVal) ? 0 : numVal;
  }

  // Normalize to per-100 scale (average per question)
  const normalized = round1(rawScore / questionKeys.length);

  // Change vs previous visit
  let change: number | null = null;
  if (prevRawScore !== null) {
    const prevNormalized = round1(prevRawScore / questionKeys.length);
    change = round1(normalized - prevNormalized);
  }

  const status = deriveStatus(normalized, { ...config, actionThreshold });

  return {
    rawScore,
    score: normalized,
    maxScore,
    average: normalized,
    percentageScore: normalized,
    change,
    status,
    lowerIsBetter,
    greenThreshold,
  };
}

// =====================================
// Public API
// =====================================

/**
 * Computes the full wellness insights payload for a given visit,
 * optionally comparing against the previous visit's section data.
 *
 * @param currentSections  - The 6 wellness sections from the current Visit document
 * @param prevSections     - The 6 wellness sections from the previous Visit (or null)
 * @returns                - WellnessInsightsPayload ready to be returned from the API
 */
export function computeWellnessInsights(
  currentSections: {
    bodilyWellness: Record<string, unknown>;
    performanceWellness: Record<string, unknown>;
    mentalWellness: Record<string, unknown>;
    socioCulturalWellness: Record<string, unknown>;
    spiritualWellness: Record<string, unknown>;
    financialWellness: Record<string, unknown>;
  },
  prevSections: {
    bodilyWellness: Record<string, unknown>;
    performanceWellness: Record<string, unknown>;
    mentalWellness: Record<string, unknown>;
    socioCulturalWellness: Record<string, unknown>;
    spiritualWellness: Record<string, unknown>;
    financialWellness: Record<string, unknown>;
  } | null,
): WellnessInsightsPayload {
  // Helper: extract raw score from prev section data
  function getPrevRaw(
    prevData: Record<string, unknown> | undefined,
    config: SectionConfig,
  ): number | null {
    if (!prevData || !isSectionFilled(prevData, config.questionKeys)) {
      return null;
    }
    let raw = 0;
    for (const key of config.questionKeys) {
      const val = prevData[key];
      const numVal = typeof val === "number" ? val : Number(val ?? 0);
      raw += isNaN(numVal) ? 0 : numVal;
    }
    return raw;
  }

  // Score each section
  const sectionKeys = [
    "bodilyWellness",
    "performanceWellness",
    "mentalWellness",
    "socioCulturalWellness",
    "spiritualWellness",
    "financialWellness",
  ] as const;

  const scored = {} as Omit<WellnessInsightsPayload, "overall">;

  for (const key of sectionKeys) {
    const config = SECTION_CONFIGS[key];
    const prevRaw = prevSections
      ? getPrevRaw(prevSections[key], config)
      : null;
    scored[key] = scoreSection(currentSections[key], config, prevRaw);
  }

  // Compute overall score
  const measuredSections = sectionKeys.filter(
    (k) => scored[k].rawScore !== null,
  );

  let overallRawScore: number | null = null;
  let overallScore: number | null = null;
  let overallMaxScore = 0;
  let overallChange: number | null = null;

  for (const key of sectionKeys) {
    overallMaxScore += scored[key].maxScore;
  }

  // Only calculate overall score if EVERY domain is measured
  if (measuredSections.length === sectionKeys.length) {
    const totalRaw = measuredSections.reduce(
      (sum, k) => sum + (scored[k].rawScore ?? 0),
      0,
    );
    
    overallRawScore = totalRaw;
    overallScore = round1((totalRaw / overallMaxScore) * 100);

    const changedSections = measuredSections.filter(
      (k) => scored[k].change !== null,
    );
    if (changedSections.length === sectionKeys.length) {
      const totalChange = changedSections.reduce(
        (sum, k) => sum + (scored[k].change ?? 0),
        0,
      );
      overallChange = round1(totalChange / changedSections.length);
    }
  }

  const overallGreenThreshold = 20;
  const overallActionThreshold = 50;

  const overallStatus =
    overallScore === null
      ? ("not-measured" as const)
      : deriveStatus(overallScore, {
          questionKeys: [],
          greenThreshold: overallGreenThreshold,
          actionThreshold: overallActionThreshold,
          lowerIsBetter: true,
        });

  const overall: import("./wellnessScoringTypes").SectionScore = {
    rawScore: overallRawScore,
    score: overallScore,
    maxScore: overallMaxScore,
    average: overallScore,
    percentageScore: overallScore,
    change: overallChange,
    status: overallStatus,
    lowerIsBetter: true,
    greenThreshold: overallGreenThreshold,
  };

  return {
    overall,
    ...scored,
  };
}
