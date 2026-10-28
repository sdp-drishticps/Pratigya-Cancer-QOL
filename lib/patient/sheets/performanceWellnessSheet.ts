import { visitHeader, ExportPatient } from "./exportTypes";

// ============================================================
// SHEET 5 — PERFORMANCE WELLNESS
// 1 row per visit (scores: 0–4)
// ============================================================

export const buildPerformanceWellnessRows = (patients: ExportPatient[]) =>
  patients.flatMap((p) =>
    (p.visits || []).map((v) => ({
      ...visitHeader(p, v),

      "Usual Activities (Home)":
        v.performanceWellness?.usualActivitiesHome ?? "",
      "Usual Work / Studies / Social Activities":
        v.performanceWellness?.usualWorkStudiesSocialActivities ?? "",
      "Employment Impact": v.performanceWellness?.employmentImpact ?? "",
      "Guilt / Dependence On Others":
        v.performanceWellness?.guiltDependenceOnOthers ?? "",
      "Religious / Cultural Activities":
        v.performanceWellness?.religiousCulturalActivities ?? "",
      "Relationship Closeness":
        v.performanceWellness?.relationshipCloseness ?? "",
    })),
  );
