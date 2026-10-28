// =====================================
// Wellness Scoring — Section Configurations
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

import type { SectionConfig, WellnessInsightsPayload } from "./wellnessScoringTypes";

export const SECTION_CONFIGS: Record<
  keyof Omit<WellnessInsightsPayload, "overall">,
  SectionConfig
> = {
  // ===================================
  // Bodily Wellness — 11 questions
  // maxRaw = 44 | maxScore = 1100
  // ===================================
  bodilyWellness: {
    questionKeys: [
      "physicalExhaustion",
      "breathingDifficulty",
      "fever",
      "painActivityDifficulty",
      "nauseaAppetiteDigestiveIssues",
      "vomiting",
      "sleepDifficulty",
      "wellRested",
      "dailyActivityHelp",
      "swellingUlcerBleedingDischarge",
      "physicalDeformityBodyShape",
    ],
    greenThreshold: 20,
    actionThreshold: 50,
    lowerIsBetter: true,
  },

  // ===================================
  // Performance Wellness — 6 questions
  // maxRaw = 24 | maxScore = 600
  // ===================================
  performanceWellness: {
    questionKeys: [
      "usualActivitiesHome",
      "usualWorkStudiesSocialActivities",
      "employmentImpact",
      "guiltDependenceOnOthers",
      "religiousCulturalActivities",
      "relationshipCloseness",
    ],
    greenThreshold: 20,
    actionThreshold: 50,
    lowerIsBetter: true,
  },

  // ===================================
  // Mental Wellness — 9 questions
  // maxRaw = 36 | maxScore = 900
  // ===================================
  mentalWellness: {
    questionKeys: [
      "feelingLowSad",
      "wantingToCry",
      "anxietyFear",
      "guiltBlameShame",
      "excessiveIllnessThinking",
      "lonelinessUncertaintyHope",
      "avoidingPeople",
      "angerSympathyPity",
      "lifeNotWorthLiving",
    ],
    greenThreshold: 20,
    actionThreshold: 50,
    lowerIsBetter: true,
  },

  // ===================================
  // Socio-Cultural Wellness — 8 questions
  // maxRaw = 32 | maxScore = 800
  // ===================================
  socioCulturalWellness: {
    questionKeys: [
      "familySupport",
      "familyAcceptanceAdjustment",
      "familyUnderstanding",
      "burdenToFamily",
      "trustedPersonToTalk",
      "avoidingSocialGatherings",
      "treatedDifferentlyByFamily",
      "treatedDifferentlyByOthers",
    ],
    greenThreshold: 20,
    actionThreshold: 50,
    lowerIsBetter: true,
  },

  // ===================================
  // Spiritual Wellness — 4 questions
  // maxRaw = 16 | maxScore = 400
  // ===================================
  spiritualWellness: {
    questionKeys: [
      "prayerFaithSpiritualPractices",
      "complementaryTraditionalHealing",
      "spiritualBeliefsHopeStrength",
      "spiritualMindfulnessComfort",
    ],
    greenThreshold: 20,
    actionThreshold: 50,
    lowerIsBetter: true,
  },

  // ===================================
  // Financial Wellness — 10 questions
  // maxRaw = 40 | maxScore = 1000
  // ===================================
  financialWellness: {
    questionKeys: [
      "treatmentCareExpensesAffordable",
      "savingsUsedForTreatment",
      "propertyAssetsMortgagedOrSold",
      "soughtFinancialSupport",
      "governmentSupportScheme",
      "ongoingLoanOrDebt",
      "familyMemberIncomeLoss",
      "childEducationAffected",
      "futureFinancialWorry",
      "treatmentTooDifficultFinancially",
    ],
    greenThreshold: 20,
    actionThreshold: 50,
    lowerIsBetter: true,
  },
};
