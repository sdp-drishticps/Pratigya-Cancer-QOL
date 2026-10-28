import { Schema } from "mongoose";

export interface FinancialWellnessFormData {
  treatmentCareExpensesAffordable: number;
  savingsUsedForTreatment: number;
  propertyAssetsMortgagedOrSold: number;
  soughtFinancialSupport: number;
  governmentSupportScheme: number;
  ongoingLoanOrDebt: number;
  familyMemberIncomeLoss: number;
  childEducationAffected: number;
  futureFinancialWorry: number;
  treatmentTooDifficultFinancially: number;
}

export const FinancialWellnessSchema = new Schema<FinancialWellnessFormData>(
  {
    treatmentCareExpensesAffordable: { type: Number, default: 0 },
    savingsUsedForTreatment: { type: Number, default: 0 },
    propertyAssetsMortgagedOrSold: { type: Number, default: 0 },
    soughtFinancialSupport: { type: Number, default: 0 },
    governmentSupportScheme: { type: Number, default: 0 },
    ongoingLoanOrDebt: { type: Number, default: 0 },
    familyMemberIncomeLoss: { type: Number, default: 0 },
    childEducationAffected: { type: Number, default: 0 },
    futureFinancialWorry: { type: Number, default: 0 },
    treatmentTooDifficultFinancially: { type: Number, default: 0 },
  },
  { _id: false },
);
