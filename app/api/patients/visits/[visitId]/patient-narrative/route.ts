import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongoose";
import Visit from "@/models/Visit";

import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";

// =====================================
// GET  /api/patients/visits/[visitId]/patient-narrative
// POST /api/patients/visits/[visitId]/patient-narrative
// =====================================

type Params = Promise<{ visitId: string }>;

// =====================================
// GET - Return saved Patient Narrative data
// =====================================

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    await connectDB();

    const auth = await getAuthenticatedUser(request);
    if (!auth.user) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: auth.status },
      );
    }

    const { visitId } = await params;

    if (!visitId) {
      return NextResponse.json(
        { success: false, message: "Visit ID is required" },
        { status: 400 },
      );
    }

    const visit = await Visit.findOne({ _id: visitId, createdBy: auth.user._id })
      .select("_id visitNumber patientNarrative sectionStatus")
      .lean();

    if (!visit) {
      return NextResponse.json(
        { success: false, message: "Visit not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        visitId: visit._id,
        visitNumber: visit.visitNumber,
        sectionCompleted: visit.sectionStatus?.patientNarrative ?? false,
        data: visit.patientNarrative ?? {},
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get Patient Narrative Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// =====================================
// POST - Save / overwrite Patient Narrative data
// =====================================

export async function POST(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    await connectDB();

    // ===================================
    // Auth
    // ===================================

    const auth = await getAuthenticatedUser(request);
    if (!auth.user) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: auth.status },
      );
    }

    // ===================================
    // Resolve Visit
    // ===================================

    const { visitId } = await params;

    if (!visitId) {
      return NextResponse.json(
        { success: false, message: "Visit ID is required" },
        { status: 400 },
      );
    }

    const visit = await Visit.findOne({ _id: visitId, createdBy: auth.user._id });

    if (!visit) {
      return NextResponse.json(
        { success: false, message: "Visit not found" },
        { status: 404 },
      );
    }

    // ===================================
    // Parse Body
    // ===================================

    const body = await request.json();

    // Strip non-question fields
    const { patientId: _pid, ...patientNarrativeData } = body;
    void _pid;

    // ===================================
    // Save to Visit
    // ===================================

    visit.patientNarrative = patientNarrativeData;
    visit.sectionStatus.patientNarrative = true;

    await visit.save();

    // ===================================
    // Response
    // ===================================

    return NextResponse.json(
      {
        success: true,
        message: "Patient Narrative saved successfully",
        visitId: visit._id,
        visitNumber: visit.visitNumber,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Save Patient Narrative Error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
