/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useCallback } from "react";
import WellnessInsights, {
  WellnessInsight,
} from "@/components/wellness-insights/WellnessInsights";
import axiosInstance from "@/lib/utils/axios";

// =====================================
// Types
// =====================================

interface SectionScore {
  score?: number | null;
  rawScore?: number | null;
  percentageScore?: number | null;
  maxScore: number;
  average?: number | null;
  change?: number | null;
  status?: "doing-well" | "attention" | "action" | "not-measured";
  lowerIsBetter?: boolean;
  greenThreshold?: number;
}

interface InsightsApiResponse {
  success: boolean;
  visitId: string;
  visitNumber: number;
  patientUniqueId: string;
  insights: {
    overall: SectionScore;
    bodilyWellness: SectionScore;
    performanceWellness: SectionScore;
    mentalWellness: SectionScore;
    socioCulturalWellness: SectionScore;
    spiritualWellness: SectionScore;
    financialWellness: SectionScore;
  };
}

// =====================================
// Mapper: API response → WellnessInsight[]
// =====================================

function mapInsights(data: InsightsApiResponse["insights"]): WellnessInsight[] {
  const sections: {
    id: string;
    title: string;
    key: keyof InsightsApiResponse["insights"];
  }[] = [
      { id: "overall", title: "Overall Well-Being", key: "overall" },
      { id: "bodily", title: "Bodily", key: "bodilyWellness" },
      { id: "performance", title: "Performance", key: "performanceWellness" },
      { id: "mental", title: "Mental", key: "mentalWellness" },
      {
        id: "socioCultural",
        title: "Socio-Cultural",
        key: "socioCulturalWellness",
      },
      { id: "spiritual", title: "Spiritual", key: "spiritualWellness" },
      { id: "financial", title: "Financial", key: "financialWellness" },
    ];

  return sections.map(({ id, title, key }) => {
    const section = data[key];

    // API returns rawScore (big number) and percentageScore/score (normalized 0-100)
    const rawScore = section?.rawScore ?? null;
    const maxScore = section?.maxScore ?? 100;

    // Normalized average out of 100
    const average =
      section?.average ?? section?.percentageScore ?? section?.score ?? null;

    // The UI displays the threshold in raw points
    const greenPercent = section?.greenThreshold ?? 20;
    const rawGreenThreshold = (greenPercent * maxScore) / 100;
    const actionPercent = 50;

    // Fallback status computation in case the API doesn't return it
    let status = section?.status as
      | "doing-well"
      | "attention"
      | "action"
      | "not-measured"
      | undefined;
    if (!status) {
      if (rawScore === null) {
        status = "not-measured";
      } else {
        const avg = average ?? 0;
        if (avg <= greenPercent) status = "doing-well";
        else if (avg <= actionPercent) status = "attention";
        else status = "action";
      }
    }

    return {
      id,
      title,
      score: rawScore,
      maxScore,
      average,
      change: section?.change ?? null,
      status,
      lowerIsBetter: section?.lowerIsBetter ?? true,
      greenThreshold: rawGreenThreshold,
    };
  });
}

// =====================================
// Component
// =====================================

interface VisitWellnessInsightsProps {
  visitId: string;
  visitNumber: string;
}

export default function VisitWellnessInsights({
  visitId,
  visitNumber,
}: VisitWellnessInsightsProps) {
  const [insights, setInsights] = useState<WellnessInsight[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = useCallback(async () => {
    if (!visitId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get<InsightsApiResponse>(
        `/patients/visits/${visitId}/wellness-insights`,
      );

      const data = response.data;

      if (!data.success) {
        setError("Failed to load wellness insights.");
        setInsights([]);
        return;
      }

      setInsights(mapInsights(data.insights));
    } catch (err) {
      console.error("Wellness Insights Fetch Error:", err);
      setError("Could not load wellness insights. Please try again.");
      setInsights([]);
    } finally {
      setLoading(false);
    }
  }, [visitId]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  if (loading) {
    return (
      <p className="text-sm text-[#718096] p-4 text-center">
        Loading insights…
      </p>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 m-4">
        {error}
      </div>
    );
  }

  if (insights.length === 0) {
    return (
      <p className="text-sm text-[#718096] p-4 text-center">
        No insights available.
      </p>
    );
  }

  return (
    <div className="mt-4 border-t border-[#EAECF0] pt-4">
      <WellnessInsights visitNumber={Number(visitNumber)} insights={insights} />
    </div>
  );
}
