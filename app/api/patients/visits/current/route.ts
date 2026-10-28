import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongoose";
import Patient from "@/models/Patient";
import Visit from "@/models/Visit";

import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";

// GET /api/patients/visits/current?patientId=<patientUniqueId>
// Returns the latest visit for a given patient.
export async function GET(request: NextRequest) {
  try {
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
    // Query Param
    // =====================================

    const { searchParams } = new URL(request.url);

    const patientUniqueId = searchParams.get("patientId")?.trim().toUpperCase();

    if (!patientUniqueId) {
      return NextResponse.json(
        {
          success: false,
          message: "patientId query parameter is required",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================
    // Find Patient
    // =====================================

    const patient = await Patient.findOne({
      patientUniqueId,
    })
      .select("_id")
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
    // Find Latest Visit
    // =====================================

    const latestVisit = await Visit.findOne({
      patientId: patient._id,
      createdBy: auth.user._id,
    })
      .sort({ visitNumber: -1 })
      .select("_id visitNumber visitDate sectionStatus")
      .lean();

    // =====================================
    // No Visit Yet
    // =====================================

    if (!latestVisit) {
      return NextResponse.json(
        {
          success: true,
          hasVisit: false,
          visit: null,
        },
        {
          status: 200,
        },
      );
    }

    // =====================================
    // Return Visit
    // =====================================
    
    // Ensure nested sectionStatus objects exist for older visits (due to .lean())
    const defaultSectionStatus = {
      clinicalStatus: false, bodilyWellness: false, performanceWellness: false,
      mentalWellness: false, socioCulturalWellness: false, spiritualWellness: false, financialWellness: false,
      womensHealth: false, patientNarrative: false,
      diseaseSpecific: { cervicalCancer: false, breastCancer: false, headAndNeckCancer: false }
    };
    
    latestVisit.sectionStatus = {
      ...defaultSectionStatus,
      ...(latestVisit.sectionStatus || {}),
      diseaseSpecific: {
        ...defaultSectionStatus.diseaseSpecific,
        ...(latestVisit.sectionStatus?.diseaseSpecific || {})
      }
    };

    return NextResponse.json(
      {
        success: true,
        hasVisit: true,
        visit: latestVisit,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Get Current Visit Error:", error);

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
