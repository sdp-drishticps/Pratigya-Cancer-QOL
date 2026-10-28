import { visitHeader, ExportPatient } from "./exportTypes";

// ============================================================
// SHEET 6 — MENTAL WELLNESS
// 1 row per visit (scores: 0–4)
// ============================================================

export const buildMentalWellnessRows = (patients: ExportPatient[]) =>
  patients.flatMap((p) =>
    (p.visits || []).map((v) => ({
      ...visitHeader(p, v),

      "Feeling Low / Sad": v.mentalWellness?.feelingLowSad ?? "",
      "Wanting To Cry": v.mentalWellness?.wantingToCry ?? "",
      "Anxiety / Fear": v.mentalWellness?.anxietyFear ?? "",
      "Guilt / Blame / Shame": v.mentalWellness?.guiltBlameShame ?? "",
      "Excessive Illness Thinking":
        v.mentalWellness?.excessiveIllnessThinking ?? "",
      "Loneliness / Uncertainty / Hope":
        v.mentalWellness?.lonelinessUncertaintyHope ?? "",
      "Avoiding People": v.mentalWellness?.avoidingPeople ?? "",
      "Anger / Sympathy / Pity": v.mentalWellness?.angerSympathyPity ?? "",
      "Life Not Worth Living": v.mentalWellness?.lifeNotWorthLiving ?? "",
    })),
  );
