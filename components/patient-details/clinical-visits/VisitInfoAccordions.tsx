"use client";

import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

import DetailCard from "@/components/patient-details/DetailCard";
import SectionAccordion from "./SectionAccordion";
import { visitFields } from "@/components/forms/visit/visitFields";
import { visitLabels, clinicalStatusLabels } from "@/lib/patient/patientFieldConfig";
import { hiddenIfEmptyFields } from "@/lib/patient/patientHiddenFields";
import { formatDate } from "@/lib/utils/formatDate";
import type { ClinicalVisit } from "./visitTypes";

// =====================================
// Constants
// =====================================

const DATE_FIELDS = new Set([
  "visitDate",
  "diagnosisDate",
  "treatmentCompletionDate",
  "recurrenceDate",
]);

// =====================================
// Props
// =====================================

interface Props {
  visit: ClinicalVisit;
  patientId: string;
}

// =====================================
// VisitInfoAccordion
// Uses visitFields config with showWhen to conditionally show fields
// =====================================

export function VisitInfoAccordion({ visit, patientId }: Props) {
  const router = useRouter();

  // Merge root visit fields + visitDetails into one flat data object for showWhen evaluation
  const visitData: Record<string, unknown> = {
    visitDate: visit.visitDate,
    ...((visit.visitDetails as Record<string, unknown>) ?? {}),
  };

  return (
    <SectionAccordion
      title="Visit Information"
      isFilled={true}
      actionText="Edit"
      actionIcon={<FiEdit2 className="mr-1 h-3 w-3" />}
      onActionClick={() =>
        router.push(
          `/patients/${patientId}/edit?section=visit&visitNumber=${visit.visitNumber}`,
        )
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visitFields
          .filter((field) => {
            // Respect showWhen — same logic as the form itself
            if (field.showWhen) {
              if (!field.showWhen(visitData)) return false;
            }
            // Check hiddenIfEmptyFields
            if (hiddenIfEmptyFields.includes(field.name)) {
              const value = visitData[field.name];
              const isEmpty = value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
              if (isEmpty) return false;
            }
            return true;
          })
          .map((field) => {
            const rawValue = visitData[field.name];
            const displayValue = DATE_FIELDS.has(field.name)
              ? formatDate(rawValue as string)
              : rawValue;
            return (
              <DetailCard
                key={field.name}
                label={visitLabels[field.name] || field.label}
                value={
                  (displayValue ?? null) as
                  | string
                  | number
                  | boolean
                  | string[]
                  | { fileName: string; filePath: string }
                  | null
                }
              />
            );
          })}
      </div>
    </SectionAccordion>
  );
}

// =====================================
// ClinicalStatusAccordion
// =====================================

// Clinical status fields with their showWhen conditions
const CLINICAL_STATUS_FIELDS = [
  { name: "assessmentDone", label: "Assessment Done" },
  { name: "ecogPerformanceStatus", label: "ECOG Performance Status" },
  { name: "weight", label: "Weight (kg)" },
  { name: "height", label: "Height (cm)" },
  { name: "bmi", label: "BMI" },
  { name: "haemoglobin", label: "Haemoglobin (g/dL)" },
  { name: "haemoglobinReport", label: "Haemoglobin Report" },
  { name: "creatinine", label: "Creatinine (mg/dL)" },
  { name: "creatinineReport", label: "Creatinine Report" },
  { name: "comorbidities", label: "Comorbidities" },
  { name: "treatmentCompliance", label: "Treatment Compliance" },
] as const;

export function ClinicalStatusAccordion({ visit, patientId }: Props) {
  const router = useRouter();

  const isFilled =
    !!visit.clinicalStatus && Object.keys(visit.clinicalStatus).length > 0;

  const csData = (visit.clinicalStatus ?? {}) as Record<string, unknown>;

  return (
    <SectionAccordion
      title="Clinical Status"
      isFilled={isFilled}
      actionText={isFilled ? "Edit" : "Add"}
      actionIcon={
        isFilled ? (
          <FiEdit2 className="mr-1 h-3 w-3" />
        ) : (
          <span className="mr-1 text-xs">+</span>
        )
      }
      onActionClick={() =>
        router.push(
          `/patients/${patientId}/edit?section=clinical-status&visitNumber=${visit.visitNumber}`,
        )
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CLINICAL_STATUS_FIELDS.map((field) => (
          <DetailCard
            key={field.name}
            label={clinicalStatusLabels[field.name] || field.label}
            value={
              (csData[field.name] ?? null) as
              | string
              | number
              | boolean
              | string[]
              | { fileName: string; filePath: string }
              | null
            }
          />
        ))}
      </div>
    </SectionAccordion>
  );
}
