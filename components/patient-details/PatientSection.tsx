"use client";

import { useState } from "react";

import DetailCard from "./DetailCard";
import SectionHeader from "./SectionHeader";
import { hiddenIfEmptyFields } from "@/lib/patient/patientHiddenFields";
import { formatDate } from "@/lib/utils/formatDate";

interface PatientSectionProps {
  title: string;
  data: Record<string, unknown>;
  labels: Record<string, string>;
  order: string[];
  actionHref?: string;
  buttonText?: string;
}

export default function PatientSection({
  title,
  data,
  labels,
  order,
  actionHref,
  buttonText = "Edit",
}: PatientSectionProps) {
  const [expanded, setExpanded] = useState(false);

  const dateFields = [
    "dateOfBirth",
    "diagnosisDate",
    "recurrenceDate",
    "biopsyDate",
    "visitDate",
  ];
  return (
    <div className="overflow-hidden rounded border border-[#EAECF0] bg-white">
      <SectionHeader
        title={title}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        actionHref={actionHref}
        buttonText={buttonText}
      />

      {expanded && (
        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">
          {order
            .filter((field) => {
              if (hiddenIfEmptyFields.includes(field)) {
                const value = data?.[field];

                return !(value === undefined || value === null || value === "");
              }

              return true;
            })
            .map((field) => (
              <DetailCard
                key={field}
                label={labels[field] || field}
                value={
                  dateFields.includes(field)
                    ? formatDate(data?.[field] as string)
                    : ((data?.[field] as
                        | string
                        | number
                        | boolean
                        | string[]
                        | null) ?? null)
                }
              />
            ))}
        </div>
      )}
    </div>
  );
}
