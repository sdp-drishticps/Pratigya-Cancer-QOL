import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongoose";
import Patient from "@/models/Patient";
import Visit from "@/models/Visit";

import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";
import { computeWellnessInsights } from "@/lib/scoring/wellnessScoring";

// =====================================
// GET /api/patients/[patientUniqueId]/wellness-summary
// =====================================
//
// Aggregates wellness insights across all visits for a patient,
// in ascending visitNumber order. Useful for longitudinal trend charts.
//
// Response:
// {
//   success: true,
//   patientUniqueId: string,
//   totalVisits: number,
//   visits: Array<{
//     visitId: string,
//     visitNumber: number,
//     visitDate: Date,
//     insights: WellnessInsightsPayload
//   }>
// }
// =====================================

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      patientUniqueId: string;
    }>;
  },
) {
  try {
    // =====================================
    // Connect Database
    // =====================================

    await connectDB();

    // =====================================
    // Authenticate User
    // =====================================

    const auth = await getAuthenticatedUser(request);

    if (!auth.user) {
      return NextResponse.json(
        {
          success: false,
          message: auth.error,
        },
        {
          status: auth.status,
        },
      );
    }

    // =====================================
    // Resolve Patient ID
    // =====================================

    const { patientUniqueId } = await params;

    const id = patientUniqueId?.trim().toUpperCase();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Patient Unique ID is required",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================
    // Find Patient
    // =====================================

    const patient = await Patient.findOne({ patientUniqueId: id, createdBy: auth.user._id })
      .select("_id patientUniqueId")
      .lean();

    if (!patient) {
      return NextResponse.json(
        {
          success: false,
          message: "Patient not found",
        },
        {
          status: 404,
        },
      );
    }

    // =====================================
    // Fetch All Visits (ascending order)
    // =====================================

    const allVisits = await Visit.find({ patientId: patient._id, createdBy: auth.user._id })
      .sort({ visitNumber: 1 })
      .select(
        "_id visitNumber visitDate bodilyWellness performanceWellness mentalWellness socioCulturalWellness spiritualWellness financialWellness",
      )
      .lean();

    // =====================================
    // Compute Insights for Each Visit
    // =====================================

    const visitSummaries = allVisits.map((visit, index) => {
      const currentSections = {
        bodilyWellness:
          (visit.bodilyWellness as unknown as Record<string, unknown>) ?? {},
        performanceWellness:
          (visit.performanceWellness as unknown as Record<string, unknown>) ?? {},
        mentalWellness:
          (visit.mentalWellness as unknown as Record<string, unknown>) ?? {},
        socioCulturalWellness:
          (visit.socioCulturalWellness as unknown as Record<string, unknown>) ?? {},
        spiritualWellness:
          (visit.spiritualWellness as unknown as Record<string, unknown>) ?? {},
        financialWellness:
          (visit.financialWellness as unknown as Record<string, unknown>) ?? {},
      };

      // Previous visit in the sorted array (index - 1)
      const prevVisit = index > 0 ? allVisits[index - 1] : null;

      const prevSections = prevVisit
        ? {
            bodilyWellness:
              (prevVisit.bodilyWellness as unknown as Record<string, unknown>) ?? {},
            performanceWellness:
              (prevVisit.performanceWellness as unknown as Record<string, unknown>) ?? {},
            mentalWellness:
              (prevVisit.mentalWellness as unknown as Record<string, unknown>) ?? {},
            socioCulturalWellness:
              (prevVisit.socioCulturalWellness as unknown as Record<string, unknown>) ??
              {},
            spiritualWellness:
              (prevVisit.spiritualWellness as unknown as Record<string, unknown>) ?? {},
            financialWellness:
              (prevVisit.financialWellness as unknown as Record<string, unknown>) ?? {},
          }
        : null;

      const insights = computeWellnessInsights(currentSections, prevSections);

      return {
        visitId: visit._id,
        visitNumber: visit.visitNumber,
        visitDate: visit.visitDate,
        insights,
      };
    });

    // =====================================
    // Success Response
    // =====================================

    return NextResponse.json(
      {
        success: true,

        patientUniqueId: patient.patientUniqueId,

        totalVisits: allVisits.length,

        visits: visitSummaries,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Wellness Summary Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
