import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongoose";
import Visit from "@/models/Visit";

import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";

// =====================================
// GET  /api/patients/visits/[visitId]/disease-specific/breast-cancer
// POST /api/patients/visits/[visitId]/disease-specific/breast-cancer
// =====================================

type Params = Promise<{ visitId: string }>;

// =====================================
// GET - Return saved Breast Cancer data
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
      .select("_id visitNumber diseaseSpecific sectionStatus")
      .lean();

    if (!visit) {
      return NextResponse.json(
        { success: false, message: "Visit not found" },
        { status: 404 },
      );
    }

    const diseaseData = visit.diseaseSpecific?.breastCancer ?? {};

    return NextResponse.json(
      {
        success: true,
        visitId: visit._id,
        visitNumber: visit.visitNumber,
        sectionCompleted: visit.sectionStatus?.diseaseSpecific?.breastCancer ?? false,
        data: diseaseData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get Breast Cancer Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// =====================================
// POST - Save / overwrite Breast Cancer data
// =====================================

export async function POST(
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

    const visit = await Visit.findOne({ _id: visitId, createdBy: auth.user._id });

    if (!visit) {
      return NextResponse.json(
        { success: false, message: "Visit not found" },
        { status: 404 },
      );
    }

    const body = await request.json();

    // Strip non-question fields
    const { patientId: _pid, ...breastCancerData } = body;
    void _pid;

    // ===================================
    // Save to Visit
    // ===================================

    if (!visit.diseaseSpecific) {
      visit.diseaseSpecific = {} as any;
    }

    visit.diseaseSpecific.breastCancer = breastCancerData;
    visit.sectionStatus.diseaseSpecific.breastCancer = true;

    visit.markModified("diseaseSpecific");
    visit.markModified("sectionStatus");

    await visit.save();

    return NextResponse.json(
      {
        success: true,
        message: "Breast Cancer saved successfully",
        visitId: visit._id,
        visitNumber: visit.visitNumber,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Save Breast Cancer Error:", error);
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
