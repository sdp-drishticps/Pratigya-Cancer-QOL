"use client";

import { FiEdit2, FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import DetailCard from "@/components/patient-details/DetailCard";
import SectionAccordion from "./SectionAccordion";
import { hiddenIfEmptyFields } from "@/lib/patient/patientHiddenFields";
import { patientNarrativeLabels, patientNarrativeOrder } from "@/lib/patient/patientFieldConfig";
import type { ClinicalVisit } from "./visitTypes";

// =====================================
// Props
// =====================================

interface Props {
  visit: ClinicalVisit;
  patientId: string;
}

// =====================================
// PatientNarrativeAccordion
// Only renders when sectionStatus.patientNarrative is truthy
// =====================================

export default function PatientNarrativeAccordion({
  visit,
  patientId,
}: Props) {
  const router = useRouter();

  const nrData = visit.patientNarrative as Record<string, unknown> | undefined;
  const isFilled = !!(nrData && Object.keys(nrData).length > 0);

  const handleActionClick = () => {
    if (!isFilled) {
      const prevData = visit.financialWellness as Record<string, unknown> | undefined;
      const isPrevFilled = prevData && Object.keys(prevData).length > 0;
      if (!isPrevFilled) {
        toast.error("Please fill out Financial Wellness first.");
        return;
      }
    }
    router.push(
      `/patients/${patientId}/edit?section=patient-narrative&visitNumber=${visit.visitNumber}`,
    );
  };

  return (
    <SectionAccordion
      title="Patient Narrative"
      isFilled={isFilled}
      actionText={isFilled ? "Edit" : "Add"}
      actionIcon={
        isFilled ? (
          <FiEdit2 className="mr-1 h-3 w-3" />
        ) : (
          <FiPlus className="mr-1 h-3 w-3" />
        )
      }
      onActionClick={handleActionClick}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {patientNarrativeOrder.map((fieldName) => {
          const value = nrData?.[fieldName];
          
          if (
            hiddenIfEmptyFields.includes(fieldName) &&
            (value === undefined ||
              value === null ||
              value === "" ||
              (Array.isArray(value) && value.length === 0))
          ) {
            return null;
          }

          return (
            <DetailCard
              key={fieldName}
              label={patientNarrativeLabels[fieldName] || fieldName}
              value={value as string | number | boolean | string[] | null}
            />
          );
        })}
      </div>
    </SectionAccordion>
  );
}
