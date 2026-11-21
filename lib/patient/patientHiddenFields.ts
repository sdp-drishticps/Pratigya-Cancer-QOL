export const hiddenIfEmptyFields = [
  // Demographic - conditional/optional fields
  "otherOccupation",
  "otherCancerType",

  // Visit Details - conditional fields
  "treatmentCompletionDate",
  "recurrenceDate",
  "tobaccoType",
  "oralCavityPhoto",

  // Disease-specific conditional fields
  "miscarriage_details",
  "stillbirth_details",

  // ── Women's Health – menstrual-cycle fields (hidden when menopause attained) ──
  "period_regularity",
  "menses_frequency",
  "menarche_age",
  "heavy_bleeding",
  "period_pain",

  // ── Women's Health – menopause-specific fields (hidden when menopause NOT attained) ──
  "menopause_age",
  "postmenopausal_bleeding_menstrual",

  // ── Women's Health – sub-conditional fields (gated by other answers) ──
  "sexually_inactive_reason",
  "gynecologist_reason",
  "gynecologist_other_reason",
  "gynecological_surgery_details",
  "miscarriage_count",
  "miscarriage_reason",
  "stillbirth_count",
  "stillbirth_reason",
  "contraceptive_methods",
  "contraceptive_other",
  "hpv_vaccine_doses",
  "cervical_screening_when",
  "cervical_screening_not_done_reason",
  "sbe_awareness",
  "breast_imaging_date",
  "breast_imaging_result",
  "bone_test_name",
  "bone_test_other",

  // ── Postmenopausal Checklist fields (hidden when menopause NOT attained) ──
  "pm_cbc_done",
  "pm_hemoglobin_level",
  "pm_blood_sugar_done",
  "pm_lipid_profile_done",
  "pm_dexa_done",
  "pm_calcium_level",
  "pm_cervical_screening",
  "pm_cervical_results_normal",
  "pm_tvs_done",
  "pm_endometrial_thickness_normal",
  "pm_mammogram_done",

  // Patient Narrative conditional fields
  "dialect_other",
];