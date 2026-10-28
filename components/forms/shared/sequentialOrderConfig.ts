// =====================================
// Route → Visit Key Mapping
// =====================================

export const routeToKey: Record<string, string> = {
  "clinical-status": "clinicalStatus",
  "bodily-wellness": "bodilyWellness",
  "performance-wellness": "performanceWellness",
  "mental-wellness": "mentalWellness",
  "socio-cultural-wellness": "socioCulturalWellness",
  "spiritual-wellness": "spiritualWellness",
  "financial-wellness": "financialWellness",
  "womens-health": "womensHealth",
  "patient-narrative": "patientNarrative",
  // Disease-specific keys (nested under diseaseSpecific in visit)
  "cervical-cancer": "cervicalCancer",
  "breast-cancer": "breastCancer",
  "head-and-neck-cancer": "headAndNeckCancer",
};

// =====================================
// Section Fill Sequence (step-by-step)
// Each section requires the previous one to be filled first
// =====================================

export const sectionSequence = [
  {
    route: "bodily-wellness",
    requiredPrev: "clinicalStatus",
    requiredPrevTitle: "Clinical Status",
  },
  {
    route: "performance-wellness",
    requiredPrev: "bodilyWellness",
    requiredPrevTitle: "Bodily Wellness",
  },
  {
    route: "mental-wellness",
    requiredPrev: "performanceWellness",
    requiredPrevTitle: "Performance Wellness",
  },
  {
    route: "socio-cultural-wellness",
    requiredPrev: "mentalWellness",
    requiredPrevTitle: "Mental Wellness",
  },
  {
    route: "spiritual-wellness",
    requiredPrev: "socioCulturalWellness",
    requiredPrevTitle: "Socio-Cultural Wellness",
  },
  {
    route: "financial-wellness",
    requiredPrev: "spiritualWellness",
    requiredPrevTitle: "Spiritual Wellness",
  },
  // Disease-specific forms
  {
    route: "cervical-cancer",
    requiredPrev: "financialWellness",
    requiredPrevTitle: "Financial Wellness",
  },
  {
    route: "breast-cancer",
    requiredPrev: "financialWellness",
    requiredPrevTitle: "Financial Wellness",
  },
  {
    route: "head-and-neck-cancer",
    requiredPrev: "financialWellness",
    requiredPrevTitle: "Financial Wellness",
  },
  // Women's Health comes after disease-specific forms (handled dynamically in checkSequentialOrder)
  {
    route: "womens-health",
    requiredPrev: "financialWellness",
    requiredPrevTitle: "Financial Wellness",
  },
  // Patient Narrative — always filled after Financial Wellness for all patients.
  // For female patients who have womensHealth, checkSequentialOrder handles the
  // additional requirement via a special case (see patientVisitHelpers.ts).
  {
    route: "patient-narrative",
    requiredPrev: "financialWellness",
    requiredPrevTitle: "Financial Wellness",
  },
];

// =====================================
// Helper: Detect current section from pathname
// =====================================

export function detectCurrentSection(pathname: string): string | null {
  const pathToSection: Record<string, string> = {
    "/forms/clinical-status": "clinical-status",
    "/forms/bodily-wellness": "bodily-wellness",
    "/forms/performance-wellness": "performance-wellness",
    "/forms/mental-wellness": "mental-wellness",
    "/forms/socio-cultural-wellness": "socio-cultural-wellness",
    "/forms/spiritual-wellness": "spiritual-wellness",
    "/forms/financial-wellness": "financial-wellness",
    "/forms/womens-health": "womens-health",
    "/forms/patient-narrative": "patient-narrative",
    // Disease-specific paths
    "/forms/disease-specific/cervical-cancer": "cervical-cancer",
    "/forms/disease-specific/breast-cancer": "breast-cancer",
    "/forms/disease-specific/head-and-neck-cancer": "head-and-neck-cancer",
  };

  for (const [path, section] of Object.entries(pathToSection)) {
    if (pathname.includes(path)) return section;
  }

  return null;
}
