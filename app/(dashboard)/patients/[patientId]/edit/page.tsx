"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";

import DemographicForm from "@/components/forms/demographic/DemographicForm";

// =====================================
// Helper: convert any date-like value to YYYY-MM-DD for <input type="date">
// =====================================

function toDateInputValue(val: unknown): string {
  if (!val || typeof val !== "string") return "";
  const d = new Date(val);
  if (isNaN(d.getTime())) return String(val); // already formatted or not a date
  return d.toISOString().split("T")[0]; // → "2024-03-15"
}

// =====================================
// Helper: normalize demographicDetails before passing to form
// =====================================

function normalizeDemographic(details: Record<string, unknown>) {
  if (!details) return details;
  return {
    ...details,
    dateOfBirth: toDateInputValue(details.dateOfBirth),
    // Ensure array fields are actual arrays
    cancerType: Array.isArray(details.cancerType)
      ? details.cancerType
      : details.cancerType
        ? [details.cancerType]
        : [],
  };
}

import ClinicalStatusForm from "@/components/forms/clinical-status/ClinicalStatusForm";
import BodilyWellnessForm from "@/components/forms/bodily-wellness/BodilyWellnessForm";
import PerformanceWellnessForm from "@/components/forms/performance-wellness/PerformanceWellnessForm";
import MentalWellnessForm from "@/components/forms/mental-wellness/MentalWellnessForm";
import SocioCulturalWellnessForm from "@/components/forms/socio&cultural wellness/SocioCulturalWellnessForm";
import SpiritualWellnessForm from "@/components/forms/spiritual-wellness/SpiritualWellnessForm";
import FinancialWellnessForm from "@/components/forms/financial-wellness/FinancialWellnessForm";
import VisitForm from "@/components/forms/visit/VisitForm";
import WomensHealthForm from "@/components/forms/womens-health/WomensHealthForm";
import PatientNarrativeForm from "@/components/forms/patient-narrative/PatientNarrativeForm";
import CervicalCancerForm from "@/components/forms/disease-specific/cervical-cancer/CervicalCancerForm";
import BreastCancerForm from "@/components/forms/disease-specific/breast-cancer/BreastCancerForm";
import HeadAndNeckCancerForm from "@/components/forms/disease-specific/head-and-neck-cancer/HeadAndNeckCancerForm";

// Helper to get visit data
function getVisitData(patient: any, visitNumberStr: string | null) {
  if (!visitNumberStr || !patient.clinicalVisits) return null;
  return patient.clinicalVisits.find(
    (v: any) => String(v.visitNumber) === String(visitNumberStr),
  );
}

export default function EditPatientPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const section = searchParams.get("section");
  const visitNumber = searchParams.get("visitNumber");

  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`/api/patients/${params.patientId}`);
        setPatient(response.data.patient);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [params.patientId]);

  // =====================================
  // Loading
  // =====================================

  if (loading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2B3674] border-t-transparent" />
        <p className="text-sm font-medium text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-center text-slate-600">
        Patient not found
      </div>
    );
  }

  const patientId = patient.patientId || patient.patientUniqueId;
  const visitData = getVisitData(patient, visitNumber);

  // =====================================
  // Section Routing
  // =====================================

  switch (section) {
    case "visit": {
      const visitInitData = {
        ...visitData,
        ...(visitData?.visitDetails || {}),
        // Normalize visitDate from ISO to YYYY-MM-DD for <input type="date">
        visitDate:
          toDateInputValue(visitData?.visitDate) ||
          new Date().toISOString().split("T")[0],
        // Normalize date fields inside visitDetails
        treatmentCompletionDate: toDateInputValue(
          visitData?.visitDetails?.treatmentCompletionDate as string,
        ),
        diagnosisDate: toDateInputValue(
          visitData?.visitDetails?.diagnosisDate as string,
        ),
        recurrenceDate: toDateInputValue(
          visitData?.visitDetails?.recurrenceDate as string,
        ),
      };
      return (
        <VisitForm
          initialValues={visitInitData as any}
          patientId={patientId}
          isEdit
        />
      );
    }

    case "demographic":
      return (
        <DemographicForm
          initialValues={normalizeDemographic(patient.demographicDetails)}
          patientId={patientId}
          isEdit
        />
      );

    case "clinical-status":
      return (
        <ClinicalStatusForm
          initialValues={visitData?.clinicalStatus}
          patientId={patientId}
          isEdit={
            !!(
              visitData?.clinicalStatus &&
              Object.keys(visitData.clinicalStatus).length > 0
            )
          }
        />
      );

    case "bodily-wellness":
      return (
        <BodilyWellnessForm
          initialValues={visitData?.bodilyWellness}
          patientId={patientId}
          isEdit={
            !!(
              visitData?.bodilyWellness &&
              Object.keys(visitData.bodilyWellness).length > 0
            )
          }
        />
      );

    case "performance-wellness":
      return (
        <PerformanceWellnessForm
          initialValues={visitData?.performanceWellness}
          patientId={patientId}
          isEdit={
            !!(
              visitData?.performanceWellness &&
              Object.keys(visitData.performanceWellness).length > 0
            )
          }
        />
      );

    case "mental-wellness":
      return (
        <MentalWellnessForm
          initialValues={visitData?.mentalWellness}
          patientId={patientId}
          isEdit={
            !!(
              visitData?.mentalWellness &&
              Object.keys(visitData.mentalWellness).length > 0
            )
          }
        />
      );

    case "socio-cultural-wellness":
      return (
        <SocioCulturalWellnessForm
          initialValues={visitData?.socioCulturalWellness}
          patientId={patientId}
          isEdit={
            !!(
              visitData?.socioCulturalWellness &&
              Object.keys(visitData.socioCulturalWellness).length > 0
            )
          }
        />
      );

    case "spiritual-wellness":
      return (
        <SpiritualWellnessForm
          initialValues={visitData?.spiritualWellness}
          patientId={patientId}
          isEdit={
            !!(
              visitData?.spiritualWellness &&
              Object.keys(visitData.spiritualWellness).length > 0
            )
          }
        />
      );

    case "financial-wellness":
      return (
        <FinancialWellnessForm
          initialValues={visitData?.financialWellness}
          patientId={patientId}
          isEdit={
            !!(
              visitData?.financialWellness &&
              Object.keys(visitData.financialWellness).length > 0
            )
          }
        />
      );

    case "womens-health":
      return (
        <WomensHealthForm
          initialValues={visitData?.womensHealth}
          patientId={patientId}
          isEdit={
            !!(
              visitData?.womensHealth &&
              Object.keys(visitData.womensHealth).length > 0
            )
          }
        />
      );

    case "patient-narrative":
      return (
        <PatientNarrativeForm
          initialValues={visitData?.patientNarrative}
          patientId={patientId}
          isEdit={
            !!(
              visitData?.patientNarrative &&
              Object.keys(visitData.patientNarrative).length > 0
            )
          }
        />
      );

    case "cervical-cancer":
      return (
        <CervicalCancerForm
          initialValues={visitData?.diseaseSpecific?.cervicalCancer}
          patientId={patientId}
          isEdit={
            !!(
              visitData?.diseaseSpecific?.cervicalCancer &&
              Object.keys(visitData.diseaseSpecific.cervicalCancer).length > 0
            )
          }
        />
      );

    case "breast-cancer":
      return (
        <BreastCancerForm
          initialValues={visitData?.diseaseSpecific?.breastCancer}
          patientId={patientId}
          isEdit={
            !!(
              visitData?.diseaseSpecific?.breastCancer &&
              Object.keys(visitData.diseaseSpecific.breastCancer).length > 0
            )
          }
        />
      );

    case "head-and-neck-cancer":
      return (
        <HeadAndNeckCancerForm
          initialValues={visitData?.diseaseSpecific?.headAndNeckCancer}
          patientId={patientId}
          isEdit={
            !!(
              visitData?.diseaseSpecific?.headAndNeckCancer &&
              Object.keys(visitData.diseaseSpecific.headAndNeckCancer).length >
              0
            )
          }
        />
      );

    default:
      return (
        <div className="flex h-[70vh] items-center justify-center text-center text-slate-600">
          Section not found or not yet available.
        </div>
      );
  }
}
