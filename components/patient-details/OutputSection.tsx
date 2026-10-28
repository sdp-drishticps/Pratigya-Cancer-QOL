"use client";

import { useState } from "react";

import SectionHeader from "./SectionHeader";
import VisitWellnessInsights from "./VisitWellnessInsights";
import { formatDate } from "@/lib/utils/formatDate";

// =====================================
// Types
// =====================================

interface ClinicalVisit {
  _id?: string;
  visitNumber?: number;
  visitDate?: string;
  [key: string]: unknown;
}

interface OutputSectionProps {
  visits: ClinicalVisit[];
}

// =====================================
// OutputSection — top-level component
// =====================================

export default function OutputSection({ visits }: OutputSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [selectedVisitId, setSelectedVisitId] = useState<string | null>(null);

  const sortedVisits = [...visits].sort(
    (a, b) =>
      new Date(String(b.visitDate || "")).getTime() -
      new Date(String(a.visitDate || "")).getTime(),
  );

  const selectedVisit = sortedVisits.find(
    (v) => String(v._id) === selectedVisitId,
  );

  const handleVisitClick = (visitId: string) => {
    setSelectedVisitId((prev) => (prev === visitId ? null : visitId));
  };

  return (
    <div className="overflow-hidden rounded border border-[#EAECF0] bg-white">
      {/* Header */}
      <SectionHeader
        title="Output"
        expanded={expanded}
        onToggle={() => {
          setExpanded(!expanded);
          if (expanded) setSelectedVisitId(null);
        }}
      >
        <p className="text-[12px] sm:text-sm text-slate-500">
          Wellness Insights for all visits
        </p>
      </SectionHeader>

      {/* Body */}
      {expanded && (
        <>
          {sortedVisits.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No visits recorded yet.
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Visit Badge Buttons */}
              <div className="flex flex-wrap gap-3">
                {sortedVisits.map((visit) => {
                  const vId = String(visit._id);
                  const isActive = selectedVisitId === vId;
                  return (
                    <button
                      key={vId}
                      type="button"
                      onClick={() => handleVisitClick(vId)}
                      className={`
                        px-3 py-1.5 rounded-md border text-xs font-semibold
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-[#2B3674] text-white border-[#2B3674]"
                            : "bg-white text-[#2B3674] border-[#2B3674] hover:bg-[#2B3674]/10"
                        }
                      `}
                    >
                      Visit #{visit.visitNumber}
                    </button>
                  );
                })}
              </div>

              {/* Wellness Insights Panel */}
              {selectedVisit && (
                <div className="rounded-lg border border-[#EAECF0] bg-[#F9FAFB] p-6 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-[#2B3674] text-base">
                      Visit #{selectedVisit.visitNumber} — Wellness Insights
                    </h4>
                    <span className="text-xs text-slate-400">
                      {formatDate(selectedVisit.visitDate)}
                    </span>
                  </div>
                  <VisitWellnessInsights
                    visitId={String(selectedVisit._id)}
                    visitNumber={String(selectedVisit.visitNumber)}
                  />
                </div>
              )}

              {/* Placeholder when no visit selected */}
              {!selectedVisit && (
                <div className="rounded-lg border border-dashed border-[#D0D5DD] bg-[#F9FAFB] p-8 text-center text-slate-400 text-sm">
                  Select a visit above to view its wellness insights.
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
