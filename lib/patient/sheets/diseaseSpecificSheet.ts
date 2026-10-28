import { joinArray, visitHeader, ExportPatient } from "./exportTypes";

// ============================================================
// SHEET 12A — CERVICAL CANCER (Disease Specific)
// 1 row per visit (only patients with cervical cancer data)
// ============================================================

export const buildCervicalCancerRows = (patients: ExportPatient[]) =>
  patients.flatMap((p) =>
    (p.visits || [])
      .filter((v) => v.diseaseSpecific?.cervicalCancer)
      .map((v) => ({
        ...visitHeader(p, v),

        "Menarche Age":
          v.diseaseSpecific?.cervicalCancer?.menarche_age ?? "",
        "Marriage Age":
          v.diseaseSpecific?.cervicalCancer?.marriage_age ?? "",
        "First Intimate Relationship Age":
          v.diseaseSpecific?.cervicalCancer?.first_intimate_relationship_age ??
          "",
        "Family Planning Methods": joinArray(
          v.diseaseSpecific?.cervicalCancer?.family_planning_methods,
        ),
        "Family Planning Duration":
          v.diseaseSpecific?.cervicalCancer?.family_planning_duration ?? "",
        "Pregnancy Count":
          v.diseaseSpecific?.cervicalCancer?.pregnancy_count ?? "",
        Miscarriage: v.diseaseSpecific?.cervicalCancer?.miscarriage ?? "",
        "Miscarriage Details":
          v.diseaseSpecific?.cervicalCancer?.miscarriage_details ?? "",
        Stillbirth: v.diseaseSpecific?.cervicalCancer?.stillbirth ?? "",
        "Stillbirth Details":
          v.diseaseSpecific?.cervicalCancer?.stillbirth_details ?? "",
        "Visited Gynecologist":
          v.diseaseSpecific?.cervicalCancer?.visited_gynecologist ?? "",
        "Screening Test":
          v.diseaseSpecific?.cervicalCancer?.screening_test ?? "",
        "Abdominal Cramp":
          v.diseaseSpecific?.cervicalCancer?.abdominal_cramp ?? "",
        "Vaginal Discharge":
          v.diseaseSpecific?.cervicalCancer?.vaginal_discharge ?? "",
        "Burning Urine":
          v.diseaseSpecific?.cervicalCancer?.burning_urine ?? "",
        "Bowel Control":
          v.diseaseSpecific?.cervicalCancer?.bowel_control ?? "",
        "Leg Swelling": v.diseaseSpecific?.cervicalCancer?.leg_swelling ?? "",
        "Back Pain": v.diseaseSpecific?.cervicalCancer?.back_pain ?? "",
        Squatting: v.diseaseSpecific?.cervicalCancer?.squatting ?? "",
        "Role As Wife": v.diseaseSpecific?.cervicalCancer?.role_wife ?? "",
        "Relationship Closeness":
          v.diseaseSpecific?.cervicalCancer?.relationship_closeness ?? "",
        "Uneasy Discussing":
          v.diseaseSpecific?.cervicalCancer?.uneasy_discussing ?? "",
        "People Avoided":
          v.diseaseSpecific?.cervicalCancer?.people_avoided ?? "",
      })),
  );

// ============================================================
// SHEET 12B — BREAST CANCER (Disease Specific)
// 1 row per visit (only patients with breast cancer data)
// ============================================================

export const buildBreastCancerRows = (patients: ExportPatient[]) =>
  patients.flatMap((p) =>
    (p.visits || [])
      .filter((v) => v.diseaseSpecific?.breastCancer)
      .map((v) => ({
        ...visitHeader(p, v),

        "Arm / Shoulder Pain":
          v.diseaseSpecific?.breastCancer?.arm_shoulder_pain ?? "",
        Swelling: v.diseaseSpecific?.breastCancer?.swelling ?? "",
        "Difficulty Raising Arm":
          v.diseaseSpecific?.breastCancer?.difficulty_raising_arm ?? "",
        "Skin Changes": v.diseaseSpecific?.breastCancer?.skin_changes ?? "",
        "Difficulty Sleeping":
          v.diseaseSpecific?.breastCancer?.difficulty_sleeping ?? "",
        "Difficulty Carrying":
          v.diseaseSpecific?.breastCancer?.difficulty_carrying ?? "",
        "Hesitation With Clothes":
          v.diseaseSpecific?.breastCancer?.hesitation_clothes ?? "",
        "Relationship Closeness":
          v.diseaseSpecific?.breastCancer?.relationship_closeness ?? "",
        "Uneasy In Social Situations":
          v.diseaseSpecific?.breastCancer?.uneasy_social ?? "",
      })),
  );

// ============================================================
// SHEET 12C — HEAD & NECK CANCER (Disease Specific)
// 1 row per visit (only patients with head & neck cancer data)
// ============================================================

export const buildHeadAndNeckCancerRows = (patients: ExportPatient[]) =>
  patients.flatMap((p) =>
    (p.visits || [])
      .filter((v) => v.diseaseSpecific?.headAndNeckCancer)
      .map((v) => ({
        ...visitHeader(p, v),

        Pain: v.diseaseSpecific?.headAndNeckCancer?.pain ?? "",
        "Difficulty Chewing / Swallowing":
          v.diseaseSpecific?.headAndNeckCancer
            ?.difficulty_chewing_swallowing ?? "",
        "Choking / Coughing":
          v.diseaseSpecific?.headAndNeckCancer?.choking_coughing ?? "",
        "Voice Changes":
          v.diseaseSpecific?.headAndNeckCancer?.voice_changes ?? "",
        "Wounds / Ulcers":
          v.diseaseSpecific?.headAndNeckCancer?.wounds_ulcers ?? "",
        "Taste Changes":
          v.diseaseSpecific?.headAndNeckCancer?.taste_changes ?? "",
        "Appearance Distress":
          v.diseaseSpecific?.headAndNeckCancer?.appearance_distress ?? "",
        "Embarrassed By Tube":
          v.diseaseSpecific?.headAndNeckCancer?.embarrassed_tube ?? "",
        "Uncomfortable Eating Out":
          v.diseaseSpecific?.headAndNeckCancer?.uncomfortable_eating_out ?? "",
        "Smell Avoidance":
          v.diseaseSpecific?.headAndNeckCancer?.smell_avoidance ?? "",
        "Self Blame":
          v.diseaseSpecific?.headAndNeckCancer?.self_blame ?? "",
      })),
  );
