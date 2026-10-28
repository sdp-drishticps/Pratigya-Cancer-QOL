import { visitHeader, ExportPatient } from "./exportTypes";

// ============================================================
// SHEET 4 — BODILY WELLNESS
// 1 row per visit (scores: 0–4)
// ============================================================

export const buildBodilyWellnessRows = (patients: ExportPatient[]) =>
  patients.flatMap((p) =>
    (p.visits || []).map((v) => ({
      ...visitHeader(p, v),

      "Physical Exhaustion": v.bodilyWellness?.physicalExhaustion ?? "",
      "Breathing Difficulty": v.bodilyWellness?.breathingDifficulty ?? "",
      Fever: v.bodilyWellness?.fever ?? "",
      "Pain / Activity Difficulty":
        v.bodilyWellness?.painActivityDifficulty ?? "",
      "Nausea / Appetite / Digestive Issues":
        v.bodilyWellness?.nauseaAppetiteDigestiveIssues ?? "",
      Vomiting: v.bodilyWellness?.vomiting ?? "",
      "Sleep Difficulty": v.bodilyWellness?.sleepDifficulty ?? "",
      "Well Rested": v.bodilyWellness?.wellRested ?? "",
      "Daily Activity Help": v.bodilyWellness?.dailyActivityHelp ?? "",
      "Swelling / Ulcer / Bleeding / Discharge":
        v.bodilyWellness?.swellingUlcerBleedingDischarge ?? "",
      "Physical Deformity / Body Shape":
        v.bodilyWellness?.physicalDeformityBodyShape ?? "",
    })),
  );
