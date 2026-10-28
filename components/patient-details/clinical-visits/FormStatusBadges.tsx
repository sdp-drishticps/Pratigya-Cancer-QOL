"use client";

import type { ClinicalVisit } from "./visitTypes";

// =====================================
// FormStatusBadges
// Shows the green/gray completion pills for each form section
// Rendered in explicit logical order — not MongoDB insertion order
// =====================================

// Core sections in display order
const CORE_SECTIONS: { key: string; label: string }[] = [
  { key: "clinicalStatus", label: "Clinical Status" },
  { key: "bodilyWellness", label: "Bodily Wellness" },
  { key: "performanceWellness", label: "Performance Wellness" },
  { key: "mentalWellness", label: "Mental Wellness" },
  { key: "socioCulturalWellness", label: "Socio-Cultural Wellness" },
  { key: "spiritualWellness", label: "Spiritual Wellness" },
  { key: "financialWellness", label: "Financial Wellness" },
  { key: "patientNarrative", label: "Patient Narrative" },
];

// Disease-specific sections (only shown when filled)
const DISEASE_SECTIONS: { key: string; label: string }[] = [
  { key: "cervicalCancer", label: "Cervical Cancer" },
  { key: "breastCancer", label: "Breast Cancer" },
  { key: "headAndNeckCancer", label: "Head & Neck Cancer" },
];

// Optional sections — only shown when filled
const OPTIONAL_SECTIONS: { key: string; label: string }[] = [
  { key: "womensHealth", label: "Women's Health" },
];

interface Props {
  visit: ClinicalVisit;
}

export default function FormStatusBadges({ visit }: Props) {
  if (!visit.sectionStatus) return null;

  const status = visit.sectionStatus as Record<string, unknown>;
  const diseaseStatus = (status.diseaseSpecific ?? {}) as Record<string, boolean>;

  return (
    <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <h5 className="text-sm font-semibold text-[#344054] whitespace-nowrap">
        Form Status
      </h5>
      <div className="flex flex-wrap items-center gap-2">
        {/* Visit Information — always complete once a visit exists */}
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          ✓ Visit Information
        </span>

        {/* Core sections in logical order */}
        {CORE_SECTIONS.map(({ key, label }) => {
          const done = status[key] === true;
          return (
            <span
              key={key}
              className={`rounded-full px-3 py-1 text-xs font-medium ${done
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-500"
                }`}
            >
              {done ? "✓" : "○"} {label}
            </span>
          );
        })}

        {/* Disease-specific — only show filled ones */}
        {DISEASE_SECTIONS.map(({ key, label }) => {
          if (!diseaseStatus[key]) return null;
          return (
            <span
              key={key}
              className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
            >
              ✓ {label}
            </span>
          );
        })}

        {/* Optional sections — only show when filled */}
        {OPTIONAL_SECTIONS.map(({ key, label }) => {
          if (!status[key]) return null;
          return (
            <span
              key={key}
              className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
            >
              ✓ {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
