"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

import PatientHeader from "@/components/patient-details/PatientHeader";
import PatientSection from "@/components/patient-details/PatientSection";
import ClinicalVisitsSection from "@/components/patient-details/ClinicalVisitsSection";
import OutputSection from "@/components/patient-details/OutputSection";

import {
  demographicLabels,
  demographicOrder,
} from "@/lib/patient/patientFieldConfig";

// =====================================
// Types
// =====================================

interface ClinicalVisit {
  _id?: string;
  visitNumber?: number;
  visitDate?: string;
  [key: string]:
  | string
  | number
  | boolean
  | string[]
  | { fileName: string; filePath: string }
  | Record<string, any>
  | null
  | undefined;
}

interface Patient {
  patientUniqueId: string;
  patientId: string;
  demographicDetails: Record<string, unknown>;
  clinicalVisits: ClinicalVisit[];
  createdAt?: string;
}

// =====================================
// Page
// =====================================

export default function PatientDetailsPage() {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`/api/patients/${params.patientId}`);
        setPatient(response.data.patient);
      } catch (err: unknown) {
        console.error(err);
        setError("Failed to load patient data.");
      } finally {
        setLoading(false);
      }
    };

    if (params.patientId) {
      fetchPatient();
    }
  }, [params.patientId]);

  // =====================================
  // Loading
  // =====================================

  if (loading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2B3674] border-t-transparent" />
        <p className="text-sm font-medium text-slate-500">
          Loading patient details...
        </p>
      </div>
    );
  }

  // =====================================
  // Error
  // =====================================

  if (error || !patient) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-2 text-center">
        <p className="text-lg font-semibold text-slate-700">
          Patient not found
        </p>
        <p className="text-sm text-slate-500">
          {error || "The patient record could not be loaded."}
        </p>
      </div>
    );
  }

  const patientId = patient.patientId || patient.patientUniqueId;

  return (
    <div className="space-y-6">
      {/* Patient Info Header */}
      <PatientHeader patient={{ ...patient, patientId }} />

      <div className="mx-3 sm:mx-10 space-y-4 mb-8">
        {/* =============================
            Demographic Details
        ============================= */}

        <PatientSection
          title="Demographic Details"
          data={patient.demographicDetails || {}}
          labels={demographicLabels}
          order={demographicOrder}
          actionHref={`/patients/${patientId}/edit?section=demographic`}
          buttonText="Edit"
        />

        {/* =============================
            Clinical Visits
        ============================= */}

        <ClinicalVisitsSection
          patientId={patientId}
          visits={patient.clinicalVisits || []}
          cancerTypes={
            Array.isArray(patient.demographicDetails?.cancerType)
              ? (patient.demographicDetails.cancerType as string[])
              : []
          }
        />

        {/* =============================
            Output
        ============================= */}

        <OutputSection
          visits={patient.clinicalVisits || []}
        />
      </div>
    </div>
  );
}
