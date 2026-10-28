/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IDemographicDetails } from "@/models/forms/demographicDetailsModel";
import type { VisitFormData } from "@/models/forms/visitFormModel";
import type { ClinicalStatusFormData } from "@/models/forms/clinicalStatusFormModel";
import type { BodilyWellnessFormData } from "@/models/forms/wellness/bodilyWellnessFormModel";
import type { PerformanceWellnessFormData } from "@/models/forms/wellness/performanceWellnessFormModel";
import type { MentalWellnessFormData } from "@/models/forms/wellness/mentalWellnessFormModel";
import type { SocioCulturalWellnessFormData } from "@/models/forms/wellness/socioCulturalWellnessFormModel";
import type { SpiritualWellnessFormData } from "@/models/forms/wellness/spiritualWellnessFormModel";
import type { FinancialWellnessFormData } from "@/models/forms/wellness/financialWellnessFormModel";
import type { WomensHealthFormData } from "@/models/forms/womensHealthFormModel";
import type { PatientNarrativeFormData } from "@/models/forms/patientNarrativeFormModel";
import type {
  CervicalCancerFormData,
  BreastCancerFormData,
  HeadAndNeckCancerFormData,
} from "@/models/forms/diseaseSpecificFormModel";
import type { WellnessInsightsPayload } from "@/lib/scoring/wellnessScoringTypes";

export interface ExportVisit {
  visitNumber: number;
  visitDate: Date | string;
  visitDetails: VisitFormData;
  clinicalStatus: ClinicalStatusFormData;
  bodilyWellness: BodilyWellnessFormData;
  performanceWellness: PerformanceWellnessFormData;
  mentalWellness: MentalWellnessFormData;
  socioCulturalWellness: SocioCulturalWellnessFormData;
  spiritualWellness: SpiritualWellnessFormData;
  financialWellness: FinancialWellnessFormData;
  womensHealth: WomensHealthFormData;
  patientNarrative: PatientNarrativeFormData;
  diseaseSpecific: {
    cervicalCancer: CervicalCancerFormData;
    breastCancer: BreastCancerFormData;
    headAndNeckCancer: HeadAndNeckCancerFormData;
  };
  wellnessScore: WellnessInsightsPayload;
  [key: string]: any;
}

export interface ExportPatient {
  patientUniqueId: string;
  demographicDetails: IDemographicDetails;
  visits: ExportVisit[];
  [key: string]: any;
}

// ─── Shared Helpers ────────────────────────────────────────────────────────

export const joinArray = (v: any): string =>
  !v ? "" : Array.isArray(v) ? v.join(", ") : String(v);

export const getFileName = (v: any): string =>
  !v ? "" : typeof v === "object" ? v.fileName || "" : "";

/** Returns a hyperlink descriptor for file fields so Excel can render a clickable link. */
export const getFileHyperlink = (
  v: any,
): { text: string; url: string } | string => {
  if (!v || typeof v !== "object") return "";
  const text: string = v.fileName || "";
  const filePath: string = v.filePath || "";
  if (!text && !filePath) return "";
  // If no path stored yet, fall back to just the file name as plain text
  if (!filePath) return text;
  // Build full absolute URL so Excel can open the file directly
  const baseUrl =
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_APP_URL) ||
    "";
  const url = filePath.startsWith("http") ? filePath : `${baseUrl}${filePath}`;
  return { text, url };
};

export const formatDate = (v: any): string => {
  if (!v) return "";
  try {
    return new Date(v).toLocaleDateString("en-IN");
  } catch {
    return String(v);
  }
};

// ─── Visit Row Header (common across all visit-level sheets) ───────────────

export const visitHeader = (patient: ExportPatient, visit: ExportVisit) => ({
  "Patient ID": patient.patientUniqueId,
  "Patient Name": patient.demographicDetails?.fullName ?? "",
  "CR No": patient.demographicDetails?.crNo ?? "",
  "Visit No": visit.visitNumber ?? "",
  "Visit Date": formatDate(visit.visitDate),
});
