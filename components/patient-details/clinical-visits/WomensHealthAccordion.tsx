"use client";

import { FiEdit2, FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import DetailCard from "@/components/patient-details/DetailCard";
import SectionAccordion from "./SectionAccordion";
import { hiddenIfEmptyFields } from "@/lib/patient/patientHiddenFields";
import { womensHealthLabels, womensHealthOrder } from "@/lib/patient/patientFieldConfig";
import type { ClinicalVisit } from "./visitTypes";

// =====================================
// Props
// =====================================

interface Props {
  visit: ClinicalVisit;
  patientId: string;
  isFemale?: boolean;
}

// =====================================
// WomensHealthAccordion
// Always renders for female patients; hidden for others unless already filled
// =====================================

export default function WomensHealthAccordion({ visit, patientId, isFemale = false }: Props) {
  const router = useRouter();

  // Show only if patient is female OR the section was already filled
  if (!isFemale && !visit.sectionStatus?.womensHealth) return null;

  const whData = visit.womensHealth as Record<string, unknown> | undefined;
  const isFilled = !!(whData && Object.keys(whData).length > 0);

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
      `/patients/${patientId}/edit?section=womens-health&visitNumber=${visit.visitNumber}`,
    );
  };

  return (
    <SectionAccordion
      title="Women's Health"
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {womensHealthOrder.map((fieldName) => {
          const value = whData?.[fieldName];
          
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
              label={womensHealthLabels[fieldName] || fieldName}
              value={value as string | number | boolean | string[] | null}
            />
          );
        })}
      </div>
    </SectionAccordion>
  );
}
