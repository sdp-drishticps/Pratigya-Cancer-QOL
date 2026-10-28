// =====================================
// saveWellnessScore — shared helper
// =====================================
//
// Called after any wellness section is saved (POST).
// Looks up current + previous visits, computes the full
// WellnessInsightsPayload, and stores it on visit.wellnessScore.
//
// Usage:
//   await computeAndSaveWellnessScore(visitId);
// =====================================

import Visit from "@/models/Visit";
import { computeWellnessInsights } from "@/lib/scoring/wellnessScoring";

export async function computeAndSaveWellnessScore(
  visitId: string,
): Promise<any> {
  // =====================================
  // Find Current Visit
  // =====================================

  const visit = await Visit.findById(visitId);

  if (!visit) {
    console.warn(`[computeAndSaveWellnessScore] Visit not found: ${visitId}`);
    return;
  }

  // =====================================
  // Find Previous Visit (for change delta)
  // =====================================

  const previousVisit = await Visit.findOne({
    patientId: visit.patientId,
    visitNumber: visit.visitNumber - 1,
  })
    .select(
      "bodilyWellness performanceWellness mentalWellness socioCulturalWellness spiritualWellness financialWellness",
    )
    .lean();

  // =====================================
  // Build Section Data Objects
  // =====================================

  const currentSections = {
    bodilyWellness: (visit.bodilyWellness as unknown as Record<string, unknown>) ?? {},
    performanceWellness: (visit.performanceWellness as unknown as Record<string, unknown>) ?? {},
    mentalWellness: (visit.mentalWellness as unknown as Record<string, unknown>) ?? {},
    socioCulturalWellness: (visit.socioCulturalWellness as unknown as Record<string, unknown>) ?? {},
    spiritualWellness: (visit.spiritualWellness as unknown as Record<string, unknown>) ?? {},
    financialWellness: (visit.financialWellness as unknown as Record<string, unknown>) ?? {},
  };

  const prevSections = previousVisit
    ? {
        bodilyWellness: (previousVisit.bodilyWellness as unknown as Record<string, unknown>) ?? {},
        performanceWellness: (previousVisit.performanceWellness as unknown as Record<string, unknown>) ?? {},
        mentalWellness: (previousVisit.mentalWellness as unknown as Record<string, unknown>) ?? {},
        socioCulturalWellness: (previousVisit.socioCulturalWellness as unknown as Record<string, unknown>) ?? {},
        spiritualWellness: (previousVisit.spiritualWellness as unknown as Record<string, unknown>) ?? {},
        financialWellness: (previousVisit.financialWellness as unknown as Record<string, unknown>) ?? {},
      }
    : null;

  // =====================================
  // Compute & Persist
  // =====================================

  const insights = computeWellnessInsights(currentSections, prevSections);

  visit.wellnessScore = insights;
  visit.markModified("wellnessScore");

  await visit.save();
  return insights;
}
