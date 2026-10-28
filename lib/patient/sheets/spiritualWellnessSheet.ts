import { visitHeader, ExportPatient } from "./exportTypes";

// ============================================================
// SHEET 8 — SPIRITUAL WELLNESS
// 1 row per visit (scores: 0–4)
// ============================================================

export const buildSpiritualWellnessRows = (patients: ExportPatient[]) =>
  patients.flatMap((p) =>
    (p.visits || []).map((v) => ({
      ...visitHeader(p, v),

      "Prayer / Faith / Spiritual Practices":
        v.spiritualWellness?.prayerFaithSpiritualPractices ?? "",
      "Complementary / Traditional Healing":
        v.spiritualWellness?.complementaryTraditionalHealing ?? "",
      "Spiritual Beliefs / Hope / Strength":
        v.spiritualWellness?.spiritualBeliefsHopeStrength ?? "",
      "Spiritual Mindfulness / Comfort":
        v.spiritualWellness?.spiritualMindfulnessComfort ?? "",
    })),
  );
