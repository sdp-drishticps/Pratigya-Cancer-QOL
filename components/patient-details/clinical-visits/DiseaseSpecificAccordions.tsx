"use client";

import { FiEdit2, FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import DetailCard from "@/components/patient-details/DetailCard";
import SectionAccordion from "./SectionAccordion";
import { hiddenIfEmptyFields } from "@/lib/patient/patientHiddenFields";
import {
  breastCancerLabels,
  breastCancerOrder,
  cervicalCancerLabels,
  cervicalCancerOrder,
  headAndNeckCancerLabels,
  headAndNeckCancerOrder,
} from "@/lib/patient/patientFieldConfig";
import type { ClinicalVisit } from "./visitTypes";

// =====================================
// Cancer type → section key map
// =====================================

const CANCER_TYPE_TO_KEY: Record<string, string> = {
  "Cervical Cancer": "cervicalCancer",
  "Breast Cancer": "breastCancer",
  "Head and Neck Cancer": "headAndNeckCancer",
};

// =====================================
// Disease-specific section config
// =====================================

const DISEASE_SECTIONS = [
  {
    key: "cervicalCancer" as const,
    title: "Cervical Cancer (Disease-Specific)",
    route: "cervical-cancer",
    labels: cervicalCancerLabels,
    order: cervicalCancerOrder,
  },
  {
    key: "breastCancer" as const,
    title: "Breast Cancer (Disease-Specific)",
    route: "breast-cancer",
    labels: breastCancerLabels,
    order: breastCancerOrder,
  },
  {
    key: "headAndNeckCancer" as const,
    title: "Head & Neck Cancer (Disease-Specific)",
    route: "head-and-neck-cancer",
    labels: headAndNeckCancerLabels,
    order: headAndNeckCancerOrder,
  },
];

// =====================================
// Props
// =====================================

interface Props {
  visit: ClinicalVisit;
  patientId: string;
  cancerTypes: string[];
}

// =====================================
// DiseaseSpecificAccordions
// =====================================

export default function DiseaseSpecificAccordions({
  visit,
  patientId,
  cancerTypes,
}: Props) {
  const router = useRouter();

  const filteredSections = DISEASE_SECTIONS.filter(
    ({ key }) =>
      cancerTypes.length === 0 ||
      cancerTypes.some((ct) => CANCER_TYPE_TO_KEY[ct] === key),
  );

  return (
    <>
      {filteredSections.map(({ key, title, route, labels, order }, index) => {
        const dsData = visit.diseaseSpecific?.[key] as
          | Record<string, unknown>
          | undefined;

        const hasValue = (val: unknown) =>
          val !== undefined &&
          val !== null &&
          val !== "" &&
          !(Array.isArray(val) && val.length === 0);

        const hasAnyData = order.some((fieldName) =>
          hasValue(dsData?.[fieldName]),
        );
        const isFilled = hasAnyData;

        const handleActionClick = () => {
          if (!isFilled) {
            // Check previous form
            if (index === 0) {
              const prevData = visit.financialWellness as Record<string, unknown> | undefined;
              const isPrevFilled = prevData && Object.keys(prevData).length > 0;
              if (!isPrevFilled) {
                toast.error("Please fill out Financial Wellness first.");
                return;
              }
            } else {
              const prevSection = filteredSections[index - 1];
              const prevData = visit.diseaseSpecific?.[prevSection.key] as Record<string, unknown> | undefined;
              const isPrevFilled = prevData && prevSection.order.some((f) => hasValue(prevData[f]));
              if (!isPrevFilled) {
                toast.error(`Please fill out ${prevSection.title} first.`);
                return;
              }
            }
          }
          router.push(
            `/patients/${patientId}/edit?section=${route}&visitNumber=${visit.visitNumber}`,
          );
        };

        return (
          <SectionAccordion
            key={key}
            title={title}
            isFilled={isFilled}
            actionText={isFilled ? "Edit" : "Add"}
            actionIcon={
              isFilled ? (
                <FiEdit2 className="mr-1 h-3 w-3" />
              ) : (
                <FiPlus className="mr-1 h-3 w-3" />
              )
            }
            emptyMessage="No data entered yet."
            onActionClick={handleActionClick}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {order.map((fieldName) => {
                const value = dsData?.[fieldName];

                if (
                  hiddenIfEmptyFields.includes(fieldName) &&
                  !hasValue(value)
                ) {
                  return null;
                }

                return (
                  <DetailCard
                    key={fieldName}
                    label={labels[fieldName] || fieldName}
                    value={value as string | number | boolean | string[] | null}
                  />
                );
              })}
            </div>
          </SectionAccordion>
        );
      })}
    </>
  );
}
