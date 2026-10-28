import { joinArray, getFileHyperlink, visitHeader, ExportPatient } from "./exportTypes";

// ============================================================
// SHEET 3 — CLINICAL STATUS
// 1 row per visit
// ============================================================

export const buildClinicalStatusRows = (patients: ExportPatient[]) =>
  patients.flatMap((p) =>
    (p.visits || []).map((v) => ({
      ...visitHeader(p, v),

      "Assessment Done": v.clinicalStatus?.assessmentDone ?? "",
      "ECOG Performance Status": v.clinicalStatus?.ecogPerformanceStatus ?? "",
      "Weight (kg)": v.clinicalStatus?.weight ?? "",
      "Height (cm)": v.clinicalStatus?.height ?? "",
      BMI: v.clinicalStatus?.bmi ?? "",
      "Haemoglobin (g/dL)": v.clinicalStatus?.haemoglobin ?? "",
      "Haemoglobin Report": getFileHyperlink(v.clinicalStatus?.haemoglobinReport),
      "Creatinine (mg/dL)": v.clinicalStatus?.creatinine ?? "",
      "Creatinine Report": getFileHyperlink(v.clinicalStatus?.creatinineReport),
      Comorbidities: joinArray(v.clinicalStatus?.comorbidities),
      "Treatment Compliance": v.clinicalStatus?.treatmentCompliance ?? "",
    })),
  );
