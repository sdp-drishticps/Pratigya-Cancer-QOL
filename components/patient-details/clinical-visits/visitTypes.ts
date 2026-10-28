// =====================================
// Shared types for clinical visits
// =====================================

export interface ClinicalVisit {
  _id?: string;
  visitNumber?: number;
  visitDate?: string;
  sectionStatus?: Record<string, boolean>;
  clinicalStatus?: Record<string, unknown>;
  bodilyWellness?: Record<string, unknown>;
  performanceWellness?: Record<string, unknown>;
  mentalWellness?: Record<string, unknown>;
  socioCulturalWellness?: Record<string, unknown>;
  spiritualWellness?: Record<string, unknown>;
  financialWellness?: Record<string, unknown>;
  womensHealth?: Record<string, unknown>;
  patientNarrative?: Record<string, unknown>;
  diseaseSpecific?: {
    cervicalCancer?: Record<string, unknown>;
    breastCancer?: Record<string, unknown>;
    headAndNeckCancer?: Record<string, unknown>;
  };
  visitDetails?: Record<string, unknown>;
  [key: string]: unknown;
}
