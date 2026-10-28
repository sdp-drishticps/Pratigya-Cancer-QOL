import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongoose";
import Patient from "@/models/Patient";
import Visit from "@/models/Visit";

import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";
import { computeAndSaveWellnessScore } from "@/lib/scoring/saveWellnessScore";

// =====================================
// GET /api/patients/visits/[visitId]/wellness-insights
// =====================================
//
// Returns wellness insight scores for a single visit.
//
// Fast path : if visit.wellnessScore is already stored in DB, return it directly.
// Fallback  : compute on-the-fly (legacy visits), persist to DB, then return.
//
// Response:
// {
//   success: true,
//   visitId: string,
//   visitNumber: number,
//   patientUniqueId: string,
//   insights: WellnessInsightsPayload
// }
// =====================================

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      visitId: string;
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
    // Resolve Visit ID
    // =====================================

    const { visitId } = await params;

    if (!visitId) {
      return NextResponse.json(
        {
          success: false,
          message: "Visit ID is required",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================
    // Find Current Visit
    // =====================================

    const visit = await Visit.findOne({ _id: visitId, createdBy: auth.user._id }).lean();

    if (!visit) {
      return NextResponse.json(
        {
          success: false,
          message: "Visit not found",
        },
        {
          status: 404,
        },
      );
    }

    // =====================================
    // Find Patient
    // =====================================

    const patient = await Patient.findById(visit.patientId)
      .select("patientUniqueId")
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
    // Resolve Insights
    // =====================================
    //
    // Force recalculation on every read to ensure fresh derived scores
    // (like overall rawScore and percentageScore) are populated correctly.
    // =====================================

    const insights = await computeAndSaveWellnessScore(visitId);

    // =====================================
    // Success Response
    // =====================================

    return NextResponse.json(
      {
        success: true,

        visitId: visit._id,

        visitNumber: visit.visitNumber,

        visitDate: visit.visitDate,

        patientUniqueId: patient.patientUniqueId,

        insights,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Wellness Insights Error:", error);

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

