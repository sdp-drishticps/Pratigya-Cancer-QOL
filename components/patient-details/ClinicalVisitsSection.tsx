"use client";

import Link from "next/link";
import { useState } from "react";
import { FiPlus, FiChevronDown, FiChevronUp } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import SectionHeader from "./SectionHeader";

import { formatDate } from "@/lib/utils/formatDate";

// Sub-components
import FormStatusBadges from "./clinical-visits/FormStatusBadges";
import {
  VisitInfoAccordion,
  ClinicalStatusAccordion,
} from "./clinical-visits/VisitInfoAccordions";
import WellnessAccordions from "./clinical-visits/WellnessAccordions";
import DiseaseSpecificAccordions from "./clinical-visits/DiseaseSpecificAccordions";
import WomensHealthAccordion from "./clinical-visits/WomensHealthAccordion";
import PatientNarrativeAccordion from "./clinical-visits/PatientNarrativeAccordion";

import type { ClinicalVisit } from "./clinical-visits/visitTypes";

// =====================================
// Props
// =====================================

interface ClinicalVisitsSectionProps {
  patientId: string;
  visits: ClinicalVisit[];
  cancerTypes?: string[];
}

// =====================================
// ClinicalVisitsSection
// =====================================

export default function ClinicalVisitsSection({
  patientId,
  visits,
  cancerTypes = [],
}: ClinicalVisitsSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const [openVisit, setOpenVisit] = useState<number | null>(null);

  const sortedVisits = [...visits].sort(
    (a, b) =>
      new Date(String(b.visitDate || "")).getTime() -
      new Date(String(a.visitDate || "")).getTime(),
  );

  return (
    <div className="overflow-hidden rounded border border-[#EAECF0] bg-white">
      {/* Header */}
      <SectionHeader
        title="Clinical Visits"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        extraActions={
          <Button
            asChild
            size="sm"
            className="h-9 bg-[#2B3674] hover:bg-[#1E285D]"
          >
            <Link href={`/forms/visit?patientId=${patientId}`}>
              <FiPlus className="mr-1 h-4 w-2" />
              Add New Visit
            </Link>
          </Button>
        }
      >
        <p className="text-[12px] sm:text-sm text-slate-500">
          Total Visits: {sortedVisits.length}
        </p>
      </SectionHeader>

      {/* Body */}
      {expanded && (
        <>
          {sortedVisits.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No clinical visits recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-[#EAECF0]">
              {sortedVisits.map((visit) => (
                <div key={visit._id || visit.visitNumber} className="bg-white">
                  {/* Visit Row Header */}
                  <div className="flex items-center justify-between px-6 py-4">
                    <div
                      onClick={() =>
                        setOpenVisit(
                          openVisit === visit.visitNumber
                            ? null
                            : (visit.visitNumber ?? null),
                        )
                      }
                      className="flex cursor-pointer items-center gap-3"
                    >
                      {openVisit === visit.visitNumber ? (
                        <FiChevronUp size={18} className="text-[#2B3674]" />
                      ) : (
                        <FiChevronDown size={18} className="text-[#2B3674]" />
                      )}
                      <div>
                        <h4 className="text-sm font-semibold text-[#2B3674] sm:text-base">
                          Visit #{visit.visitNumber}
                        </h4>
                        <p className="text-sm text-slate-500">
                          {formatDate(visit.visitDate)}
                        </p>
                      </div>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-9 border-[#2B3674] text-[#2B3674] hover:bg-[#2B3674] hover:text-white"
                      onClick={() =>
                        setOpenVisit(
                          openVisit === visit.visitNumber
                            ? null
                            : (visit.visitNumber ?? null),
                        )
                      }
                    >
                      {openVisit === visit.visitNumber ? "Hide" : "View"}
                    </Button>
                  </div>

                  {/* Visit Details Panel */}
                  {openVisit === visit.visitNumber && (
                    <div className="border-t border-[#EAECF0] bg-[#F9FAFB] p-6">
                      <FormStatusBadges visit={visit} />

                      <VisitInfoAccordion visit={visit} patientId={patientId} />

                      <ClinicalStatusAccordion
                        visit={visit}
                        patientId={patientId}
                      />

                      <WellnessAccordions visit={visit} patientId={patientId} />

                      <DiseaseSpecificAccordions
                        visit={visit}
                        patientId={patientId}
                        cancerTypes={cancerTypes}
                      />

                      <WomensHealthAccordion
                        visit={visit}
                        patientId={patientId}
                      />

                      <PatientNarrativeAccordion
                        visit={visit}
                        patientId={patientId}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
