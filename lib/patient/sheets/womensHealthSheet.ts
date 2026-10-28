import { joinArray, visitHeader, ExportPatient } from "./exportTypes";

// ============================================================
// SHEET 10 — WOMEN'S HEALTH
// 1 row per visit
// ============================================================

export const buildWomensHealthRows = (patients: ExportPatient[]) =>
  patients
    .filter((p) => {
      const sex = (p.demographicDetails?.sex ?? "").toLowerCase();
      return sex === "female" || sex === "f";
    })
    .flatMap((p) =>
    (p.visits || []).map((v) => ({
      ...visitHeader(p, v),

      // ─── Menstrual History ────────────────────────────────
      "Menarche Age": v.womensHealth?.menarche_age ?? "",
      "Period Regularity": v.womensHealth?.period_regularity ?? "",
      "Menses Frequency": v.womensHealth?.menses_frequency ?? "",
      "Heavy Bleeding": v.womensHealth?.heavy_bleeding ?? "",
      "Unusual Discharge": v.womensHealth?.unusual_discharge ?? "",
      "Period Pain": v.womensHealth?.period_pain ?? "",
      "Sexually Active": v.womensHealth?.sexually_active ?? "",
      "Sexually Inactive Reason": v.womensHealth?.sexually_inactive_reason ?? "",
      "Menopause Age": v.womensHealth?.menopause_age ?? "",

      // ─── Gynecologic History ──────────────────────────────
      "Visited Gynecologist": v.womensHealth?.visited_gynecologist ?? "",
      "Gynecologist Reason": joinArray(v.womensHealth?.gynecologist_reason),
      "Gynecologist Other Reason":
        v.womensHealth?.gynecologist_other_reason ?? "",
      "Current Pelvic Symptoms": v.womensHealth?.current_pelvic_symptoms ?? "",
      "Itching / Irritation": v.womensHealth?.itching_irritation ?? "",
      "Gynecological Surgery": v.womensHealth?.gynecological_surgery ?? "",
      "Gynecological Surgery Details":
        v.womensHealth?.gynecological_surgery_details ?? "",

      // ─── Obstetric & Fertility History ───────────────────
      "Infertility Treatment": v.womensHealth?.infertility_treatment ?? "",
      "Total Pregnancies": v.womensHealth?.total_pregnancies ?? "",
      "Number Of Children": v.womensHealth?.number_of_children ?? "",
      "Miscarriage / Termination":
        v.womensHealth?.miscarriage_termination ?? "",
      "Miscarriage Count": v.womensHealth?.miscarriage_count ?? "",
      "Miscarriage Reason": v.womensHealth?.miscarriage_reason ?? "",
      Stillbirth: v.womensHealth?.stillbirth ?? "",
      "Stillbirth Count": v.womensHealth?.stillbirth_count ?? "",
      "Stillbirth Reason": v.womensHealth?.stillbirth_reason ?? "",
      "Currently Breastfeeding": v.womensHealth?.currently_breastfeeding ?? "",
      "Ever Breastfed": v.womensHealth?.ever_breastfed ?? "",
      "Contraceptive Used": v.womensHealth?.contraceptive_used ?? "",
      "Contraceptive Methods": joinArray(v.womensHealth?.contraceptive_methods),
      "Contraceptive Other": v.womensHealth?.contraceptive_other ?? "",

      // ─── Cervical Cancer Screening & HPV ─────────────────
      "Counselling Interest": v.womensHealth?.counselling_interest ?? "",
      "HPV Vaccine Awareness": v.womensHealth?.hpv_vaccine_awareness ?? "",
      "HPV Vaccine Received": v.womensHealth?.hpv_vaccine_received ?? "",
      "HPV Vaccine Doses": v.womensHealth?.hpv_vaccine_doses ?? "",
      "HPV Family Vaccination Interest":
        v.womensHealth?.hpv_family_vaccination_interest ?? "",
      "Cervical Screening Done": v.womensHealth?.cervical_screening_done ?? "",
      "Cervical Screening When": v.womensHealth?.cervical_screening_when ?? "",
      "Cervical Screening Not Done Reason": joinArray(
        v.womensHealth?.cervical_screening_not_done_reason,
      ),
      "Willing To Screen Now": v.womensHealth?.willing_to_screen_now ?? "",

      // ─── Breast Health & Screening ────────────────────────
      "Self Breast Exam": v.womensHealth?.self_breast_exam ?? "",
      "SBE Awareness": v.womensHealth?.sbe_awareness ?? "",
      "Breast Symptoms": v.womensHealth?.breast_symptoms ?? "",
      "Breast Imaging": joinArray(v.womensHealth?.breast_imaging),
      "Breast Imaging Date": v.womensHealth?.breast_imaging_date ?? "",
      "Breast Imaging Result": v.womensHealth?.breast_imaging_result ?? "",
      "Knows Breast Self Exam": v.womensHealth?.knows_breast_self_exam ?? "",

      // ─── Bone Health ─────────────────────────────────────
      "Bone Test Done": v.womensHealth?.bone_test_done ?? "",
      "Bone Test Name": joinArray(v.womensHealth?.bone_test_name),
      "Bone Test Other": v.womensHealth?.bone_test_other ?? "",
      "Fracture Minor Fall": v.womensHealth?.fracture_minor_fall ?? "",
      "Vitamin D Deficiency": v.womensHealth?.vitamin_d_deficiency ?? "",
      "Bone Supplements": v.womensHealth?.bone_supplements ?? "",

      // ─── Blood Count ──────────────────────────────────────
      "Hemoglobin Tested": v.womensHealth?.hemoglobin_tested ?? "",
      "Anemia Diagnosed": v.womensHealth?.anemia_diagnosed ?? "",
      "Anemia Symptoms": v.womensHealth?.anemia_symptoms ?? "",
      "Iron Supplements": v.womensHealth?.iron_supplements ?? "",

      // ─── General Preventive Health ────────────────────────
      "BP / Sugar Checked": v.womensHealth?.bp_sugar_checked ?? "",
      "Thyroid Tested": v.womensHealth?.thyroid_tested ?? "",
      "Gynecological Checkup": v.womensHealth?.gynecological_checkup ?? "",
      "Women's Health Vaccinations":
        v.womensHealth?.womens_health_vaccinations ?? "",

      // ─── Alarming Signs ───────────────────────────────────
      "Postmenopausal Bleeding": v.womensHealth?.postmenopausal_bleeding ?? "",
      "Pelvic Bloating": v.womensHealth?.pelvic_bloating ?? "",
      "Severe Tiredness": v.womensHealth?.severe_tiredness ?? "",
      "Nipple Discharge": v.womensHealth?.nipple_discharge ?? "",
      "Breast Lump / Change": v.womensHealth?.breast_lump_change ?? "",
      "Foul Vaginal Discharge": v.womensHealth?.foul_vaginal_discharge ?? "",

      // ─── Postmenopausal Checklist ─────────────────────────
      "PM CBC Done": v.womensHealth?.pm_cbc_done ?? "",
      "PM Hemoglobin Level": v.womensHealth?.pm_hemoglobin_level ?? "",
      "PM Blood Sugar Done": v.womensHealth?.pm_blood_sugar_done ?? "",
      "PM Lipid Profile Done": v.womensHealth?.pm_lipid_profile_done ?? "",
      "PM DEXA Done": v.womensHealth?.pm_dexa_done ?? "",
      "PM Calcium Level": v.womensHealth?.pm_calcium_level ?? "",
      "PM Cervical Screening": v.womensHealth?.pm_cervical_screening ?? "",
      "PM Cervical Results Normal":
        v.womensHealth?.pm_cervical_results_normal ?? "",
      "PM TVS Done": v.womensHealth?.pm_tvs_done ?? "",
      "PM Endometrial Thickness Normal":
        v.womensHealth?.pm_endometrial_thickness_normal ?? "",
      "PM Mammogram Done": v.womensHealth?.pm_mammogram_done ?? "",
    })),
  );
