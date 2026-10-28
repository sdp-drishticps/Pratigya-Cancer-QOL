import { FormFieldConfig } from "@/components/forms/shared/FormField";

// =====================================
// Shared Yes/No options
// =====================================

const YES_NO = ["Yes", "No"] as const;
const YES_NO_NA = ["Yes", "No", "Not applicable"] as const;
const YES_NO_DK = ["Yes", "No", "Don't know"] as const;

// =====================================
// Section 1 – Menstrual History
// =====================================

export const menstrualHistoryFields: FormFieldConfig[] = [
  {
    name: "period_regularity",
    label: "Periods regular or irregular?",
    type: "select",
    placeholder: "Select",
    options: ["Regular", "Irregular"],
  },
  {
    name: "menses_frequency",
    label: "Frequency of menses",
    type: "select",
    placeholder: "Select frequency",
    options: [
      "Every 21–24 days (frequent)",
      "Every 25–38 days (normal)",
      "Every 39–45 days (infrequent)",
      "More than 45 days apart",
      "Not applicable / Postmenopausal",
    ],
  },
  {
    name: "menarche_age",
    label: "Age at menarche (years)",
    type: "number",
    placeholder: "e.g. 13",
    min: 8,
    max: 20,
  },
  {
    name: "menopause_age",
    label: "Age at menopause (if applicable)",
    type: "number",
    placeholder: "e.g. 50",
    min: 30,
    max: 65,
  },
  {
    name: "heavy_bleeding",
    label: "Heavy bleeding on heaviest day?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "unusual_discharge",
    label: "Unusual / bad-smelling vaginal discharge?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "period_pain",
    label: "Period pain affecting daily activities?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "sexually_active",
    label: "Are you sexually active?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "sexually_inactive_reason",
    label: "Reason for not being sexually active",
    type: "text",
    placeholder: "Specify reason",
    showWhen: (v) => v.sexually_active === "No",
  },
];

// =====================================
// Section 2 – Gynecologic History
// =====================================

export const gynecologicHistoryFields: FormFieldConfig[] = [
  {
    name: "visited_gynecologist",
    label: "Ever visited a gynecologist?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "gynecologist_reason",
    label: "Reason for gynecologist visit",
    type: "multiselect",
    placeholder: "Select reason(s)",
    options: [
      "Fibroids",
      "Ovarian cyst",
      "Endometriosis",
      "PCOS",
      "Pelvic infection",
      "Other",
      "Patient does not know exact diagnosis",
    ],
    showWhen: (v) => v.visited_gynecologist === "Yes",
  },
  {
    name: "gynecologist_other_reason",
    label: "Other reason (specify)",
    type: "text",
    placeholder: "Specify other reason",
    showWhen: (v) =>
      Array.isArray(v.gynecologist_reason) &&
      v.gynecologist_reason.includes("Other"),
  },
  {
    name: "current_pelvic_symptoms",
    label: "Current pelvic pain / unusual discharge?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "itching_irritation",
    label: "Itching or irritation in private area?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "gynecological_surgery",
    label: "Ever had gynaecological surgery?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "gynecological_surgery_details",
    label: "Gynaecological surgery details",
    type: "text",
    placeholder: "Specify surgery / surgeries",
    showWhen: (v) => v.gynecological_surgery === "Yes",
  },
];

// =====================================
// Section 3 – Obstetric and Fertility History
// =====================================

export const obstetricFertilityFields: FormFieldConfig[] = [
  {
    name: "infertility_treatment",
    label: "History of infertility treatment?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "total_pregnancies",
    label: "Total number of pregnancies",
    type: "number",
    placeholder: "e.g. 2",
    min: 0,
    max: 20,
  },
  {
    name: "number_of_children",
    label: "Number of children",
    type: "number",
    placeholder: "e.g. 2",
    min: 0,
    max: 20,
  },
  {
    name: "miscarriage_termination",
    label: "Ever had miscarriage / termination?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "miscarriage_count",
    label: "No. of miscarriages / terminations",
    type: "number",
    placeholder: "e.g. 1",
    min: 0,
    showWhen: (v) => v.miscarriage_termination === "Yes",
  },
  {
    name: "miscarriage_reason",
    label: "Reason for miscarriage / termination",
    type: "text",
    placeholder: "Specify reason (if known)",
    showWhen: (v) => v.miscarriage_termination === "Yes",
  },
  {
    name: "stillbirth",
    label: "Ever had a stillbirth?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "stillbirth_count",
    label: "Number of stillbirths",
    type: "number",
    placeholder: "e.g. 1",
    min: 0,
    showWhen: (v) => v.stillbirth === "Yes",
  },
  {
    name: "stillbirth_reason",
    label: "Reason for stillbirth",
    type: "text",
    placeholder: "Specify reason (if known)",
    showWhen: (v) => v.stillbirth === "Yes",
  },
  {
    name: "currently_breastfeeding",
    label: "Currently breastfeeding?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO_NA],
  },
  {
    name: "ever_breastfed",
    label: "Ever breastfed your child?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "contraceptive_used",
    label: "Ever used family planning / contraceptive?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "contraceptive_methods",
    label: "Contraceptive method(s) used",
    type: "multiselect",
    placeholder: "Select method(s)",
    options: [
      "Condoms",
      "Oral contraceptive pills",
      "Copper-T (IUCD)",
      "Injectable contraceptives",
      "Contraceptive implant",
      "Female sterilization (Tubectomy)",
      "Male sterilization (Vasectomy)",
      "Natural methods (safe period/withdrawal)",
      "Emergency contraceptive pill",
      "Other",
    ],
    showWhen: (v) => v.contraceptive_used === "Yes",
  },
  {
    name: "contraceptive_other",
    label: "Other contraceptive method (specify)",
    type: "text",
    placeholder: "Specify other method",
    showWhen: (v) =>
      Array.isArray(v.contraceptive_methods) &&
      v.contraceptive_methods.includes("Other"),
  },
];

// =====================================
// Section 4 – Cervical Cancer Screening & HPV Vaccination
// =====================================

export const cervicalHpvFields: FormFieldConfig[] = [
  {
    name: "counselling_interest",
    label: "Want cervical cancer / HPV counselling?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "hpv_vaccine_awareness",
    label: "Heard of the HPV vaccine?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "hpv_vaccine_received",
    label: "Received the HPV vaccine?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "hpv_vaccine_doses",
    label: "No. of HPV vaccine doses received",
    type: "number",
    placeholder: "e.g. 2",
    min: 1,
    max: 3,
    showWhen: (v) => v.hpv_vaccine_received === "Yes",
  },
  {
    name: "hpv_family_vaccination_interest",
    label: "Discuss HPV vaccine for family girls (9–14)?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "cervical_screening_done",
    label: "Had cervical screening? (Pap / HPV / VIA)",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "cervical_screening_when",
    label: "When was cervical screening done?",
    type: "text",
    placeholder: "e.g. 2022 or approx. 2 years ago",
    showWhen: (v) => v.cervical_screening_done === "Yes",
  },
  {
    name: "cervical_screening_not_done_reason",
    label: "Reason for no cervical screening",
    type: "multiselect",
    placeholder: "Select reason(s)",
    options: [
      "Not aware",
      "Physician did not advise",
      "Advised but lack of resources",
      "Financial constraints",
    ],
    showWhen: (v) => v.cervical_screening_done === "No",
  },
  {
    name: "willing_to_screen_now",
    label: "Willing to undergo cervical screening now?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
];

// =====================================
// Section 5 – Breast Health and Screening
// =====================================

export const breastHealthFields: FormFieldConfig[] = [
  {
    name: "self_breast_exam",
    label: "Ever examined your own breast?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "sbe_awareness",
    label: "Aware of Self-Breast Examination (SBE)?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
    showWhen: (v) => v.self_breast_exam === "No",
  },
  {
    name: "breast_symptoms",
    label: "Lump, discharge, pain or skin changes in breast?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "breast_imaging",
    label: "Had mammogram / breast ultrasound / biopsy?",
    type: "multiselect",
    placeholder: "Select",
    options: ["Mammogram", "Breast ultrasound", "Biopsy", "None"],
  },
  {
    name: "breast_imaging_date",
    label: "Date / year of breast imaging or biopsy",
    type: "text",
    placeholder: "e.g. 2023 or March 2023",
    showWhen: (v) =>
      Array.isArray(v.breast_imaging) &&
      v.breast_imaging.some((x: string) =>
        ["Mammogram", "Breast ultrasound", "Biopsy"].includes(x),
      ),
  },
  {
    name: "breast_imaging_result",
    label: "Result of breast imaging / biopsy",
    type: "text",
    placeholder: "Describe result",
    showWhen: (v) =>
      Array.isArray(v.breast_imaging) &&
      v.breast_imaging.some((x: string) =>
        ["Mammogram", "Breast ultrasound", "Biopsy"].includes(x),
      ),
  },
  {
    name: "knows_breast_self_exam",
    label: "Know how to examine own breasts?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
];

// =====================================
// Section 6 – Bone Health
// =====================================

export const boneHealthFields: FormFieldConfig[] = [
  {
    name: "bone_test_done",
    label: "Bone health test in past 1 year?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "bone_test_name",
    label: "Which bone test(s)?",
    type: "multiselect",
    placeholder: "Select test(s)",
    options: [
      "DEXA scan",
      "X-ray",
      "Blood test – Vitamin D",
      "Blood test – Calcium",
      "I don't know the name of the test",
      "Other",
    ],
    showWhen: (v) => v.bone_test_done === "Yes",
  },
  {
    name: "bone_test_other",
    label: "Other bone test (specify)",
    type: "text",
    placeholder: "Specify test name",
    showWhen: (v) =>
      Array.isArray(v.bone_test_name) &&
      v.bone_test_name.includes("Other"),
  },
  {
    name: "fracture_minor_fall",
    label: "Fracture after a minor fall or injury?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "vitamin_d_deficiency",
    label: "Ever told you have vitamin D deficiency?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "bone_supplements",
    label: "Taking bone health supplements / treatment?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
];

// =====================================
// Section 7 – Blood Count
// =====================================

export const bloodCountFields: FormFieldConfig[] = [
  {
    name: "hemoglobin_tested",
    label: "Hemoglobin tested in the past 1 year?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "anemia_diagnosed",
    label: "Ever told you have anemia?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "anemia_symptoms",
    label: "Fatigue / dizziness suggesting low blood count?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "iron_supplements",
    label: "Taking iron / folic acid supplements?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
];

// =====================================
// Section 8 – General Preventive Health
// =====================================

export const preventiveHealthFields: FormFieldConfig[] = [
  {
    name: "bp_sugar_checked",
    label: "BP and blood sugar checked (past 6 months)?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "thyroid_tested",
    label: "Thyroid test in the past 1 year?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "gynecological_checkup",
    label: "Gynecological check-up in the past 1 year?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "womens_health_vaccinations",
    label: "Women's health vaccinations received?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
];

// =====================================
// Section 9 – Alarming Signs
// =====================================

export const alarmingSignsFields: FormFieldConfig[] = [
  {
    name: "postmenopausal_bleeding",
    label: "Unexplained post-menopausal bleeding?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "pelvic_bloating",
    label: "Pelvic pain / bloating lasting > 2 weeks?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "severe_tiredness",
    label: "Severe tiredness?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "nipple_discharge",
    label: "Nipple discharge (blood-stained) past 2 weeks?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "breast_lump_change",
    label: "New breast lump or change in breast shape?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "foul_vaginal_discharge",
    label: "Foul smelling / excessive vaginal discharge?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
];

// =====================================
// Section 10 – Postmenopausal Checklist
// (only shown when postmenopausal)
// =====================================

export const postmenopausalChecklistFields: FormFieldConfig[] = [
  {
    name: "pm_cbc_done",
    label: "CBC done in the last 1 year?",
    type: "select",
    placeholder: "Select",
    options: ["Yes", "No", "Don't know / Not sure"],
  },
  {
    name: "pm_hemoglobin_level",
    label: "Recent Hemoglobin level",
    type: "text",
    placeholder: "e.g. 11.5 g/dL",
    showWhen: (v) => v.pm_cbc_done === "Yes",
  },
  {
    name: "pm_blood_sugar_done",
    label: "Blood sugar checked in the last 1 year?",
    type: "select",
    placeholder: "Select",
    options: ["Yes", "No", "Don't know / Not sure"],
  },
  {
    name: "pm_lipid_profile_done",
    label: "Lipid profile done in the last 1 year?",
    type: "select",
    placeholder: "Select",
    options: ["Yes", "No", "Don't know / Not sure"],
  },
  {
    name: "pm_dexa_done",
    label: "DEXA scan done in the last 2 years?",
    type: "select",
    placeholder: "Select",
    options: ["Yes", "No", "Never", "Don't know / Not sure"],
  },
  {
    name: "pm_calcium_level",
    label: "Calcium level (if known)",
    type: "text",
    placeholder: "e.g. 9.2 mg/dL",
    showWhen: (v) => v.pm_dexa_done === "Yes",
  },
  {
    name: "pm_cervical_screening",
    label: "Cervical screening ever done?",
    type: "select",
    placeholder: "Select",
    options: [
      "Yes, within the last year",
      "Yes, more than one year ago",
      "No",
      "Don't know",
    ],
  },
  {
    name: "pm_cervical_results_normal",
    label: "Cervical screening results normal?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO_DK],
    showWhen: (v) =>
      v.pm_cervical_screening === "Yes, within the last year" ||
      v.pm_cervical_screening === "Yes, more than one year ago",
  },
  {
    name: "pm_tvs_done",
    label: "Transvaginal ultrasound (TVS) in last 1 year?",
    type: "select",
    placeholder: "Select",
    options: ["Yes", "No", "Never"],
  },
  {
    name: "pm_endometrial_thickness_normal",
    label: "Endometrial thickness normal (< 4 mm)?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO_DK],
    showWhen: (v) => v.pm_tvs_done === "Yes",
  },
  {
    name: "pm_mammogram_done",
    label: "Mammogram done in the last 2 years?",
    type: "select",
    placeholder: "Select",
    options: ["Yes", "No", "Never"],
  },
];
