import { joinArray, visitHeader, ExportPatient } from "./exportTypes";

// ============================================================
// SHEET 11 — PATIENT NARRATIVE
// 1 row per visit
// ============================================================

export const buildPatientNarrativeRows = (patients: ExportPatient[]) =>
  patients.flatMap((p) =>
    (p.visits || []).map((v) => ({
      ...visitHeader(p, v),

      Dialect: v.patientNarrative?.dialect ?? "",
      "Dialect (Other)": v.patientNarrative?.dialect_other ?? "",
      Speaker: v.patientNarrative?.speaker ?? "",
      "Health Since Last Visit": v.patientNarrative?.health_since_last_visit ?? "",
      "Most Trouble": v.patientNarrative?.most_trouble ?? "",
      "Difficult Tasks": v.patientNarrative?.difficult_tasks ?? "",
      "Family Impact": v.patientNarrative?.family_impact ?? "",
      "Treatment Cost": v.patientNarrative?.treatment_cost ?? "",
      Support: v.patientNarrative?.support ?? "",
      "Future Hopes / Worries": v.patientNarrative?.future_hopes_worries ?? "",
      "Anything Else": v.patientNarrative?.anything_else ?? "",
      Keywords: v.patientNarrative?.keywords ?? "",
      Themes: joinArray(v.patientNarrative?.themes),
      "Support Terms": v.patientNarrative?.support_terms ?? "",
      "Most Important Sentence":
        v.patientNarrative?.most_important_sentence ?? "",
      "Narrative vs Scores": v.patientNarrative?.narrative_vs_scores ?? "",
    })),
  );
