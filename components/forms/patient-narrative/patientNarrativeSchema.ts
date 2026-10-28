import * as Yup from "yup";

export const patientNarrativeSchema = Yup.object().shape({
  patientId: Yup.string().required("Patient ID is required"),

  // ── Q242 – Dialect spoken (required) ──────────────
  dialect: Yup.string().required("Dialect is required"),

  // ── Q243 – Specify other dialect ──────────────────
  dialect_other: Yup.string().when("dialect", {
    is: "Other",
    then: (s) => s.optional(),
    otherwise: (s) => s.optional(),
  }),

  // ── Q244 – Who is speaking ────────────────────────
  speaker: Yup.string(),

  // ── Q245–Q252 – Open narrative answers ────────────
  health_since_last_visit: Yup.string(),

  most_trouble: Yup.string(),

  difficult_tasks: Yup.string(),

  family_impact: Yup.string(),

  treatment_cost: Yup.string(),

  support: Yup.string(),

  future_hopes_worries: Yup.string(),

  anything_else: Yup.string(),

  // ── Q253–Q256 – Clinician summary ─────────────────
  keywords: Yup.string(),

  themes: Yup.array().of(Yup.string()),

  support_terms: Yup.string(),

  most_important_sentence: Yup.string(),

  // ── Q257 – Narrative vs scores ─────────────────────
  narrative_vs_scores: Yup.string(),
});
