import { visitHeader, ExportPatient } from "./exportTypes";

// ============================================================
// SHEET 7 — SOCIO-CULTURAL WELLNESS
// 1 row per visit (scores: 0–4)
// ============================================================

export const buildSocioCulturalWellnessRows = (patients: ExportPatient[]) =>
  patients.flatMap((p) =>
    (p.visits || []).map((v) => ({
      ...visitHeader(p, v),

      "Family Support": v.socioCulturalWellness?.familySupport ?? "",
      "Family Acceptance / Adjustment":
        v.socioCulturalWellness?.familyAcceptanceAdjustment ?? "",
      "Family Understanding":
        v.socioCulturalWellness?.familyUnderstanding ?? "",
      "Burden To Family": v.socioCulturalWellness?.burdenToFamily ?? "",
      "Trusted Person To Talk":
        v.socioCulturalWellness?.trustedPersonToTalk ?? "",
      "Avoiding Social Gatherings":
        v.socioCulturalWellness?.avoidingSocialGatherings ?? "",
      "Treated Differently By Family":
        v.socioCulturalWellness?.treatedDifferentlyByFamily ?? "",
      "Treated Differently By Others":
        v.socioCulturalWellness?.treatedDifferentlyByOthers ?? "",
    })),
  );
