"use client";

import { FiEdit2, FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import DetailCard from "@/components/patient-details/DetailCard";
import SectionAccordion from "./SectionAccordion";
import { bodilyWellnessQuestions } from "@/components/forms/bodily-wellness/bodilyWellnessQuestions";
import { performanceWellnessQuestions } from "@/components/forms/performance-wellness/performanceWellnessQuestions";
import { mentalWellnessQuestions } from "@/components/forms/mental-wellness/mentalWellnessQuestions";
import { socioCulturalWellnessQuestions } from "@/components/forms/socio&cultural wellness/socioCulturalWellnessQuestions";
import { spiritualWellnessQuestions } from "@/components/forms/spiritual-wellness/spiritualWellnessQuestions";
import { financialWellnessQuestions } from "@/components/forms/financial-wellness/financialWellnessQuestions";
import type { ClinicalVisit } from "./visitTypes";

// =====================================
// Wellness section config
// =====================================

const WELLNESS_SECTIONS = [
  {
    key: "bodilyWellness",
    title: "Bodily Wellness",
    route: "bodily-wellness",
    questions: bodilyWellnessQuestions,
    requiredPrev: "clinicalStatus",
    requiredPrevTitle: "Clinical Status",
  },
  {
    key: "performanceWellness",
    title: "Performance Wellness",
    route: "performance-wellness",
    questions: performanceWellnessQuestions,
    requiredPrev: "bodilyWellness",
    requiredPrevTitle: "Bodily Wellness",
  },
  {
    key: "mentalWellness",
    title: "Mental Wellness",
    route: "mental-wellness",
    questions: mentalWellnessQuestions,
    requiredPrev: "performanceWellness",
    requiredPrevTitle: "Performance Wellness",
  },
  {
    key: "socioCulturalWellness",
    title: "Socio-Cultural Wellness",
    route: "socio-cultural-wellness",
    questions: socioCulturalWellnessQuestions,
    requiredPrev: "mentalWellness",
    requiredPrevTitle: "Mental Wellness",
  },
  {
    key: "spiritualWellness",
    title: "Spiritual Wellness",
    route: "spiritual-wellness",
    questions: spiritualWellnessQuestions,
    requiredPrev: "socioCulturalWellness",
    requiredPrevTitle: "Socio-Cultural Wellness",
  },
  {
    key: "financialWellness",
    title: "Financial Wellness",
    route: "financial-wellness",
    questions: financialWellnessQuestions,
    requiredPrev: "spiritualWellness",
    requiredPrevTitle: "Spiritual Wellness",
  },
] as const;

// =====================================
// Props
// =====================================

interface Props {
  visit: ClinicalVisit;
  patientId: string;
}

// =====================================
// WellnessAccordions
// =====================================

export default function WellnessAccordions({ visit, patientId }: Props) {
  const router = useRouter();

  return (
    <>
      {WELLNESS_SECTIONS.map((section) => {
        const sectionData = visit[section.key as keyof ClinicalVisit] as
          | Record<string, unknown>
          | undefined;
        const isFilled = !!(sectionData && Object.keys(sectionData).length > 0);

        const handleActionClick = () => {
          if (!isFilled) {
            const prevData = visit[
              section.requiredPrev as keyof ClinicalVisit
            ] as Record<string, unknown> | undefined;
            const isPrevFilled =
              prevData && Object.keys(prevData).length > 0;
            if (!isPrevFilled) {
              toast.error(
                `Please fill out ${section.requiredPrevTitle} first.`,
              );
              return;
            }
          }
          router.push(
            `/patients/${patientId}/edit?section=${section.route}&visitNumber=${visit.visitNumber}`,
          );
        };

        return (
          <SectionAccordion
            key={section.key}
            title={section.title}
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
              {section.questions.map((q) => (
                <DetailCard
                  key={q.name}
                  label={q.question}
                  value={(sectionData?.[q.name] ?? null) as string | number | boolean | string[]}
                />
              ))}
            </div>
          </SectionAccordion>
        );
      })}
    </>
  );
}
