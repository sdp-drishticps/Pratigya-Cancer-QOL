import { joinArray, getFileHyperlink, formatDate, visitHeader, ExportPatient } from "./exportTypes";

// ============================================================
// SHEET 2 — VISIT DETAILS
// 1 row per visit
// ============================================================

export const buildVisitDetailsRows = (patients: ExportPatient[]) =>
  patients.flatMap((p) =>
    (p.visits || []).map((v) => ({
      ...visitHeader(p, v),

      "Phase Of Care": v.visitDetails?.phaseOfCare ?? "",
      "Diagnosis Date": formatDate(v.visitDetails?.diagnosisDate),
      "Months Since Diagnosis": v.visitDetails?.monthsSinceDiagnosis ?? "",
      "Biopsy Report": getFileHyperlink(v.visitDetails?.biopsyReport),
      "Stage At Diagnosis": v.visitDetails?.stageAtDiagnosis ?? "",
      Extent: v.visitDetails?.extent ?? "",
      "Treatment Received": joinArray(v.visitDetails?.treatmentReceived),
      "Treatment Status": v.visitDetails?.treatmentStatus ?? "",
      "Treatment Completion Date": formatDate(
        v.visitDetails?.treatmentCompletionDate,
      ),
      "Disease Status": v.visitDetails?.diseaseStatus ?? "",
      "Recurrence Date": formatDate(v.visitDetails?.recurrenceDate),
      "Clinical Report": getFileHyperlink(v.visitDetails?.clinicalReport),
      "PTNM Staging": v.visitDetails?.ptnmStaging ?? "",
      "Duration Of Survival": v.visitDetails?.durationOfSurvival ?? "",
      "Tobacco Use": v.visitDetails?.tobaccoUse ?? "",
      "Tobacco Type": v.visitDetails?.tobaccoType ?? "",
      "Oral Cavity Photo": getFileHyperlink(v.visitDetails?.oralCavityPhoto),
      "Partner Tobacco Use": v.visitDetails?.partnerTobaccoUse ?? "",
      "Alcohol Use": v.visitDetails?.alcoholUse ?? "",
      Respondent: v.visitDetails?.respondent ?? "",
      Consent: v.visitDetails?.consent ? "Yes" : "No",
    })),
  );
