import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongoose";

import Patient from "@/models/Patient";
import Visit from "@/models/Visit";

import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";

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
    // Patient ID
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

    const patient = await Patient.findOne({
      patientUniqueId: id,
      createdBy: auth.user._id,
    }).lean();

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
    // Get All Visits
    // =====================================

    const allVisits = await Visit.find({
      patientId: patient._id,
      createdBy: auth.user._id,
    })
      .sort({
        visitNumber: -1,
      })
      .lean();

    // Latest visit will be derived after formatting

    // =====================================
    // Response
    // =====================================

    // Ensure nested sectionStatus objects exist for older visits (due to .lean())
    const defaultSectionStatus = {
      clinicalStatus: false,
      bodilyWellness: false,
      performanceWellness: false,
      mentalWellness: false,
      socioCulturalWellness: false,
      spiritualWellness: false,
      financialWellness: false,
      womensHealth: false,
      patientNarrative: false,
      diseaseSpecific: {
        cervicalCancer: false,
        breastCancer: false,
        headAndNeckCancer: false,
      },
    };

    const formattedVisits = allVisits.map((v) => {
      v.sectionStatus = {
        ...defaultSectionStatus,
        ...(v.sectionStatus || {}),
        diseaseSpecific: {
          ...defaultSectionStatus.diseaseSpecific,
          ...(v.sectionStatus?.diseaseSpecific || {}),
        },
      };
      return v;
    });

    return NextResponse.json(
      {
        success: true,

        patient: {
          ...patient,

          // Alias for frontend compatibility
          patientId: patient.patientUniqueId,

          // All visits (sorted newest first — [0] is the latest)
          clinicalVisits: formattedVisits,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Get Patient Error:", error);

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

// =====================================
// PUT /api/patients/[patientUniqueId]
// Update demographic details (with optional file uploads via FormData)
// =====================================

export async function PUT(
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
        { success: false, message: auth.error },
        { status: auth.status },
      );
    }

    // =====================================
    // Patient ID
    // =====================================

    const { patientUniqueId } = await params;

    const id = patientUniqueId?.trim().toUpperCase();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Patient Unique ID is required" },
        { status: 400 },
      );
    }

    // =====================================
    // Find Patient (owned by this user)
    // =====================================

    const patient = await Patient.findOne({
      patientUniqueId: id,
      createdBy: auth.user._id,
    });

    if (!patient) {
      return NextResponse.json(
        { success: false, message: "Patient not found or access denied" },
        { status: 404 },
      );
    }

    // =====================================
    // Parse JSON
    // =====================================

    const body = await request.json();

    // crNo is immutable — never update it
    delete body.crNo;

    // We don't want to overwrite the whole object if we don't have to,
    // but the body contains the new demographic details.
    // Let's merge them.
    Object.assign(patient.demographicDetails, body);

    patient.markModified("demographicDetails");

    await patient.save();

    return NextResponse.json(
      {
        success: true,
        message: "Demographic Details updated successfully",
        patientId: patient.patientUniqueId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update Patient Error:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
