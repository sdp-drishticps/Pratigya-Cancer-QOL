import { visitHeader, ExportPatient } from "./exportTypes";

// ============================================================
// SHEET 13 — WELLNESS SCORES
// 1 row per visit (computed section scores + overall)
// ============================================================

export const buildWellnessScoreRows = (patients: ExportPatient[]) =>
  patients.flatMap((p) =>
    (p.visits || []).map((v) => ({
      ...visitHeader(p, v),

      // ─── Bodily Wellness ──────────────────────────────────
      "Bodily - Raw Score": v.wellnessScore?.bodilyWellness?.rawScore ?? "",
      "Bodily - Max Score": v.wellnessScore?.bodilyWellness?.maxScore ?? "",
      "Bodily - % Score":
        v.wellnessScore?.bodilyWellness?.percentageScore ?? "",

      // ─── Performance Wellness ─────────────────────────────
      "Performance - Raw Score":
        v.wellnessScore?.performanceWellness?.rawScore ?? "",
      "Performance - Max Score":
        v.wellnessScore?.performanceWellness?.maxScore ?? "",
      "Performance - % Score":
        v.wellnessScore?.performanceWellness?.percentageScore ?? "",

      // ─── Mental Wellness ──────────────────────────────────
      "Mental - Raw Score": v.wellnessScore?.mentalWellness?.rawScore ?? "",
      "Mental - Max Score": v.wellnessScore?.mentalWellness?.maxScore ?? "",
      "Mental - % Score":
        v.wellnessScore?.mentalWellness?.percentageScore ?? "",

      // ─── Socio-Cultural Wellness ──────────────────────────
      "Socio-Cultural - Raw Score":
        v.wellnessScore?.socioCulturalWellness?.rawScore ?? "",
      "Socio-Cultural - Max Score":
        v.wellnessScore?.socioCulturalWellness?.maxScore ?? "",
      "Socio-Cultural - % Score":
        v.wellnessScore?.socioCulturalWellness?.percentageScore ?? "",

      // ─── Spiritual Wellness ───────────────────────────────
      "Spiritual - Raw Score":
        v.wellnessScore?.spiritualWellness?.rawScore ?? "",
      "Spiritual - Max Score":
        v.wellnessScore?.spiritualWellness?.maxScore ?? "",
      "Spiritual - % Score":
        v.wellnessScore?.spiritualWellness?.percentageScore ?? "",

      // ─── Financial Wellness ───────────────────────────────
      "Financial - Raw Score":
        v.wellnessScore?.financialWellness?.rawScore ?? "",
      "Financial - Max Score":
        v.wellnessScore?.financialWellness?.maxScore ?? "",
      "Financial - % Score":
        v.wellnessScore?.financialWellness?.percentageScore ?? "",

      // ─── Overall ──────────────────────────────────────────
      "Overall - Raw Score": v.wellnessScore?.overall?.rawScore ?? "",
      "Overall - Max Score": v.wellnessScore?.overall?.maxScore ?? "",
      "Overall - % Score": v.wellnessScore?.overall?.percentageScore ?? "",
    })),
  );
