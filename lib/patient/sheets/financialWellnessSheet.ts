import { visitHeader, ExportPatient } from "./exportTypes";

// ============================================================
// SHEET 9 — FINANCIAL WELLNESS
// 1 row per visit (scores: 0–4)
// ============================================================

export const buildFinancialWellnessRows = (patients: ExportPatient[]) =>
  patients.flatMap((p) =>
    (p.visits || []).map((v) => ({
      ...visitHeader(p, v),

      "Treatment / Care Expenses Affordable":
        v.financialWellness?.treatmentCareExpensesAffordable ?? "",
      "Savings Used For Treatment":
        v.financialWellness?.savingsUsedForTreatment ?? "",
      "Property / Assets Mortgaged Or Sold":
        v.financialWellness?.propertyAssetsMortgagedOrSold ?? "",
      "Sought Financial Support":
        v.financialWellness?.soughtFinancialSupport ?? "",
      "Government Support Scheme":
        v.financialWellness?.governmentSupportScheme ?? "",
      "Ongoing Loan Or Debt": v.financialWellness?.ongoingLoanOrDebt ?? "",
      "Family Member Income Loss":
        v.financialWellness?.familyMemberIncomeLoss ?? "",
      "Child Education Affected":
        v.financialWellness?.childEducationAffected ?? "",
      "Future Financial Worry":
        v.financialWellness?.futureFinancialWorry ?? "",
      "Treatment Too Difficult Financially":
        v.financialWellness?.treatmentTooDifficultFinancially ?? "",
    })),
  );
