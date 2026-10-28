import * as Yup from "yup";

export const womensHealthSchema = Yup.object().shape({
  patientId: Yup.string().required("Patient ID is required"),

  // ── Menstrual History ──────────────────────────────
  menarche_age: Yup.number()
    .min(8, "Age must be at least 8")
    .max(20, "Age must be at most 20")
    .nullable()
    .transform((v) => (isNaN(v) ? null : v)),

  period_regularity: Yup.string(),

  menses_frequency: Yup.string(),

  heavy_bleeding: Yup.string(),

  unusual_discharge: Yup.string(),

  period_pain: Yup.string(),

  sexually_active: Yup.string(),

  sexually_inactive_reason: Yup.string().when("sexually_active", {
    is: "No",
    then: (s) => s.optional(),
    otherwise: (s) => s.optional(),
  }),

  menopause_age: Yup.number()
    .min(30, "Age must be at least 30")
    .max(65, "Age must be at most 65")
    .nullable()
    .transform((v) => (isNaN(v) ? null : v)),

  // ── Gynecologic History ────────────────────────────
  visited_gynecologist: Yup.string(),

  gynecologist_reason: Yup.array().of(Yup.string()),

  gynecologist_other_reason: Yup.string(),

  current_pelvic_symptoms: Yup.string(),

  itching_irritation: Yup.string(),

  gynecological_surgery: Yup.string(),

  gynecological_surgery_details: Yup.string().when("gynecological_surgery", {
    is: "Yes",
    then: (s) => s.optional(),
    otherwise: (s) => s.optional(),
  }),

  // ── Obstetric and Fertility History ───────────────
  infertility_treatment: Yup.string(),

  total_pregnancies: Yup.number()
    .min(0)
    .max(20)
    .nullable()
    .transform((v) => (isNaN(v) ? null : v)),

  number_of_children: Yup.number()
    .min(0)
    .max(20)
    .nullable()
    .transform((v) => (isNaN(v) ? null : v)),

  miscarriage_termination: Yup.string(),

  miscarriage_count: Yup.number()
    .min(0)
    .nullable()
    .transform((v) => (isNaN(v) ? null : v)),

  miscarriage_reason: Yup.string(),

  stillbirth: Yup.string(),

  stillbirth_count: Yup.number()
    .min(0)
    .nullable()
    .transform((v) => (isNaN(v) ? null : v)),

  stillbirth_reason: Yup.string(),

  currently_breastfeeding: Yup.string(),

  ever_breastfed: Yup.string(),

  contraceptive_used: Yup.string(),

  contraceptive_methods: Yup.array().of(Yup.string()),

  contraceptive_other: Yup.string(),

  // ── Cervical Cancer Screening & HPV Vaccination ───
  counselling_interest: Yup.string(),

  hpv_vaccine_awareness: Yup.string(),

  hpv_vaccine_received: Yup.string(),

  hpv_vaccine_doses: Yup.number()
    .min(1)
    .max(3)
    .nullable()
    .transform((v) => (isNaN(v) ? null : v)),

  hpv_family_vaccination_interest: Yup.string(),

  cervical_screening_done: Yup.string(),

  cervical_screening_when: Yup.string(),

  cervical_screening_not_done_reason: Yup.array().of(Yup.string()),

  willing_to_screen_now: Yup.string(),

  // ── Breast Health and Screening ───────────────────
  self_breast_exam: Yup.string(),

  sbe_awareness: Yup.string(),

  breast_symptoms: Yup.string(),

  breast_imaging: Yup.array().of(Yup.string()),

  breast_imaging_date: Yup.string(),

  breast_imaging_result: Yup.string(),

  knows_breast_self_exam: Yup.string(),

  // ── Bone Health ───────────────────────────────────
  bone_test_done: Yup.string(),

  bone_test_name: Yup.array().of(Yup.string()),

  bone_test_other: Yup.string(),

  fracture_minor_fall: Yup.string(),

  vitamin_d_deficiency: Yup.string(),

  bone_supplements: Yup.string(),

  // ── Blood Count ───────────────────────────────────
  hemoglobin_tested: Yup.string(),

  anemia_diagnosed: Yup.string(),

  anemia_symptoms: Yup.string(),

  iron_supplements: Yup.string(),

  // ── General Preventive Health ─────────────────────
  bp_sugar_checked: Yup.string(),

  thyroid_tested: Yup.string(),

  gynecological_checkup: Yup.string(),

  womens_health_vaccinations: Yup.string(),

  // ── Alarming Signs ────────────────────────────────
  postmenopausal_bleeding: Yup.string(),

  pelvic_bloating: Yup.string(),

  severe_tiredness: Yup.string(),

  nipple_discharge: Yup.string(),

  breast_lump_change: Yup.string(),

  foul_vaginal_discharge: Yup.string(),

  // ── Postmenopausal Checklist ──────────────────────
  pm_cbc_done: Yup.string(),

  pm_hemoglobin_level: Yup.string(),

  pm_blood_sugar_done: Yup.string(),

  pm_lipid_profile_done: Yup.string(),

  pm_dexa_done: Yup.string(),

  pm_calcium_level: Yup.string(),

  pm_cervical_screening: Yup.string(),

  pm_cervical_results_normal: Yup.string(),

  pm_tvs_done: Yup.string(),

  pm_endometrial_thickness_normal: Yup.string(),

  pm_mammogram_done: Yup.string(),
});
