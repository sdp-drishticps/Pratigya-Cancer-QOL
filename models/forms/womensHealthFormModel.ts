import { Schema } from "mongoose";

export interface WomensHealthFormData {
  // ─── Menstrual History ──────────────────────────
  menarche_age: string;
  period_regularity: string;
  menses_frequency: string;
  heavy_bleeding: string;
  unusual_discharge: string;
  period_pain: string;
  sexually_active: string;
  sexually_inactive_reason: string;
  menopause_age: string;

  // ─── Gynecologic History ────────────────────────
  visited_gynecologist: string;
  gynecologist_reason: string[];
  gynecologist_other_reason: string;
  current_pelvic_symptoms: string;
  itching_irritation: string;
  gynecological_surgery: string;
  gynecological_surgery_details: string;

  // ─── Obstetric and Fertility History ────────────
  infertility_treatment: string;
  total_pregnancies: string;
  number_of_children: string;
  miscarriage_termination: string;
  miscarriage_count: string;
  miscarriage_reason: string;
  stillbirth: string;
  stillbirth_count: string;
  stillbirth_reason: string;
  currently_breastfeeding: string;
  ever_breastfed: string;
  contraceptive_used: string;
  contraceptive_methods: string[];
  contraceptive_other: string;

  // ─── Cervical Cancer Screening & HPV Vaccination ─
  counselling_interest: string;
  hpv_vaccine_awareness: string;
  hpv_vaccine_received: string;
  hpv_vaccine_doses: string;
  hpv_family_vaccination_interest: string;
  cervical_screening_done: string;
  cervical_screening_when: string;
  cervical_screening_not_done_reason: string[];
  willing_to_screen_now: string;

  // ─── Breast Health and Screening ────────────────
  self_breast_exam: string;
  sbe_awareness: string;
  breast_symptoms: string;
  breast_imaging: string[];
  breast_imaging_date: string;
  breast_imaging_result: string;
  knows_breast_self_exam: string;

  // ─── Bone Health ────────────────────────────────
  bone_test_done: string;
  bone_test_name: string[];
  bone_test_other: string;
  fracture_minor_fall: string;
  vitamin_d_deficiency: string;
  bone_supplements: string;

  // ─── Blood Count ────────────────────────────────
  hemoglobin_tested: string;
  anemia_diagnosed: string;
  anemia_symptoms: string;
  iron_supplements: string;

  // ─── General Preventive Health ──────────────────
  bp_sugar_checked: string;
  thyroid_tested: string;
  gynecological_checkup: string;
  womens_health_vaccinations: string;

  // ─── Alarming Signs ─────────────────────────────
  postmenopausal_bleeding: string;
  pelvic_bloating: string;
  severe_tiredness: string;
  nipple_discharge: string;
  breast_lump_change: string;
  foul_vaginal_discharge: string;

  // ─── Postmenopausal Checklist ───────────────────
  pm_cbc_done: string;
  pm_hemoglobin_level: string;
  pm_blood_sugar_done: string;
  pm_lipid_profile_done: string;
  pm_dexa_done: string;
  pm_calcium_level: string;
  pm_cervical_screening: string;
  pm_cervical_results_normal: string;
  pm_tvs_done: string;
  pm_endometrial_thickness_normal: string;
  pm_mammogram_done: string;
}

export const WomensHealthSchema = new Schema<WomensHealthFormData>(
  {
    menarche_age: { type: String, default: "" },
    period_regularity: { type: String, default: "" },
    menses_frequency: { type: String, default: "" },
    heavy_bleeding: { type: String, default: "" },
    unusual_discharge: { type: String, default: "" },
    period_pain: { type: String, default: "" },
    sexually_active: { type: String, default: "" },
    sexually_inactive_reason: { type: String, default: "" },
    menopause_age: { type: String, default: "" },
    visited_gynecologist: { type: String, default: "" },
    gynecologist_reason: { type: [String], default: [] },
    gynecologist_other_reason: { type: String, default: "" },
    current_pelvic_symptoms: { type: String, default: "" },
    itching_irritation: { type: String, default: "" },
    gynecological_surgery: { type: String, default: "" },
    gynecological_surgery_details: { type: String, default: "" },
    infertility_treatment: { type: String, default: "" },
    total_pregnancies: { type: String, default: "" },
    number_of_children: { type: String, default: "" },
    miscarriage_termination: { type: String, default: "" },
    miscarriage_count: { type: String, default: "" },
    miscarriage_reason: { type: String, default: "" },
    stillbirth: { type: String, default: "" },
    stillbirth_count: { type: String, default: "" },
    stillbirth_reason: { type: String, default: "" },
    currently_breastfeeding: { type: String, default: "" },
    ever_breastfed: { type: String, default: "" },
    contraceptive_used: { type: String, default: "" },
    contraceptive_methods: { type: [String], default: [] },
    contraceptive_other: { type: String, default: "" },
    counselling_interest: { type: String, default: "" },
    hpv_vaccine_awareness: { type: String, default: "" },
    hpv_vaccine_received: { type: String, default: "" },
    hpv_vaccine_doses: { type: String, default: "" },
    hpv_family_vaccination_interest: { type: String, default: "" },
    cervical_screening_done: { type: String, default: "" },
    cervical_screening_when: { type: String, default: "" },
    cervical_screening_not_done_reason: { type: [String], default: [] },
    willing_to_screen_now: { type: String, default: "" },
    self_breast_exam: { type: String, default: "" },
    sbe_awareness: { type: String, default: "" },
    breast_symptoms: { type: String, default: "" },
    breast_imaging: { type: [String], default: [] },
    breast_imaging_date: { type: String, default: "" },
    breast_imaging_result: { type: String, default: "" },
    knows_breast_self_exam: { type: String, default: "" },
    bone_test_done: { type: String, default: "" },
    bone_test_name: { type: [String], default: [] },
    bone_test_other: { type: String, default: "" },
    fracture_minor_fall: { type: String, default: "" },
    vitamin_d_deficiency: { type: String, default: "" },
    bone_supplements: { type: String, default: "" },
    hemoglobin_tested: { type: String, default: "" },
    anemia_diagnosed: { type: String, default: "" },
    anemia_symptoms: { type: String, default: "" },
    iron_supplements: { type: String, default: "" },
    bp_sugar_checked: { type: String, default: "" },
    thyroid_tested: { type: String, default: "" },
    gynecological_checkup: { type: String, default: "" },
    womens_health_vaccinations: { type: String, default: "" },
    postmenopausal_bleeding: { type: String, default: "" },
    pelvic_bloating: { type: String, default: "" },
    severe_tiredness: { type: String, default: "" },
    nipple_discharge: { type: String, default: "" },
    breast_lump_change: { type: String, default: "" },
    foul_vaginal_discharge: { type: String, default: "" },
    pm_cbc_done: { type: String, default: "" },
    pm_hemoglobin_level: { type: String, default: "" },
    pm_blood_sugar_done: { type: String, default: "" },
    pm_lipid_profile_done: { type: String, default: "" },
    pm_dexa_done: { type: String, default: "" },
    pm_calcium_level: { type: String, default: "" },
    pm_cervical_screening: { type: String, default: "" },
    pm_cervical_results_normal: { type: String, default: "" },
    pm_tvs_done: { type: String, default: "" },
    pm_endometrial_thickness_normal: { type: String, default: "" },
    pm_mammogram_done: { type: String, default: "" },
  },
  { _id: false },
);
