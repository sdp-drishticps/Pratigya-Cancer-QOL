"use client";

import { ArrowDown, ArrowUp } from "lucide-react";

export interface WellnessInsight {
  id: string;
  title: string;
  score: number | null;
  maxScore: number;
  average: number | null;
  change: number | null;
  status: "doing-well" | "attention" | "action" | "not-measured";
  lowerIsBetter?: boolean;
  greenThreshold?: number;
}

interface WellnessInsightsProps {
  visitNumber: number;
  insights: WellnessInsight[];
}

const statusConfig = {
  "doing-well": {
    label: "Doing well",
    border: "border-l-[#008A5B]",
    dot: "bg-[#008A5B]",
  },

  attention: {
    label: "Needs attention",
    border: "border-l-[#D9A400]",
    dot: "bg-[#D9A400]",
  },

  action: {
    label: "Needs action now",
    border: "border-l-[#C9251C]",
    dot: "bg-[#C9251C]",
  },

  "not-measured": {
    label: "Not measured",
    border: "border-l-[#D9DEE7]",
    dot: "bg-[#D9DEE7]",
  },
};

export default function WellnessInsights({
  visitNumber,
  insights,
}: WellnessInsightsProps) {
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 mt-3 shadow-sm">
      {/* =====================================
          CARDS
      ===================================== */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {insights.map((item) => {
          const config = statusConfig[item.status as keyof typeof statusConfig] || statusConfig["not-measured"];

          return (
            <InsightCard
              key={item.id}
              insight={item}
              borderColor={config.border}
            />
          );
        })}
      </div>

      {/* =====================================
          LEGEND
      ===================================== */}

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        <LegendItem color="bg-[#008A5B]" label="Doing well" />

        <LegendItem color="bg-[#D9A400]" label="Needs attention" />

        <LegendItem color="bg-[#C9251C]" label="Needs action now" />

        <LegendItem color="bg-[#D9DEE7]" label="Not measured" />
      </div>
    </section>
  );
}

// =====================================
// INSIGHT CARD
// =====================================

function InsightCard({
  insight,
  borderColor,
}: {
  insight: WellnessInsight;
  borderColor: string;
}) {
  const isMeasured = insight.score !== null && insight.score !== undefined;

  const change = insight.change ?? 0;

  const changeIsBetter = insight.lowerIsBetter ? change < 0 : change > 0;

  const changeText = change > 0 ? `+${change}` : `${change}`;

  return (
    <div
      className={`
        min-h-33.75
        rounded-xl
        border
        border-slate-200
        border-l-[6px]
        ${borderColor}
        bg-white
        px-4
        py-3
        overflow-hidden
      `}
    >
      {/* Title */}

      <p className="text-[11px] font-medium uppercase tracking-wide text-[#718096]">
        {insight.title}
      </p>

      {/* Score */}

      {isMeasured ? (
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-[22px] font-bold leading-tight text-[#111827]">
            {insight.score}
          </span>

          <span className="text-[11px] text-[#718096]">
            /{insight.maxScore}
          </span>
        </div>
      ) : (
        <div className="mt-1">
          <span className="text-[26px] font-semibold text-[#111827]">—</span>
        </div>
      )}

      {/* Status */}

      <p
        className={`
          mt-0.5 text-[11px]
          ${
            insight.status === "doing-well"
              ? "text-[#008A5B]"
              : insight.status === "attention"
                ? "text-[#C58F00]"
                : insight.status === "action"
                  ? "text-[#C9251C]"
                  : "text-[#94A3B8]"
          }
        `}
      >
        {(statusConfig[insight.status as keyof typeof statusConfig] || statusConfig["not-measured"]).label}

        {isMeasured && insight.average !== null && (
          <span className="text-[#64748B]"> · avg {insight.average}/100</span>
        )}
      </p>

      {/* Change */}

      {isMeasured && insight.change !== null && (
        <div className="mt-1 flex items-center gap-1 text-[11px]">
          <span
            className={changeIsBetter ? "text-[#008A5B]" : "text-[#C9251C]"}
          >
            {change > 0 ? `+${change}` : `${change}`}
          </span>

          <span className="text-[#64748B]">
            since last visit — {change === 0 ? "same" : changeIsBetter ? "better" : "worse"}
          </span>
        </div>
      )}

      {/* Threshold */}

      <p className="mt-1.5 text-[10px] text-[#94A3B8]">
        {insight.lowerIsBetter ? "lower is better" : "higher is better"}

        {insight.greenThreshold !== undefined && (
          <> · green ≤{insight.greenThreshold}</>
        )}
      </p>
    </div>
  );
}

// =====================================
// LEGEND ITEM
// =====================================

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-3.5 w-3.5 rounded-full ${color}`} />

      <span className="text-[11px] text-[#64748B]">{label}</span>
    </div>
  );
}
