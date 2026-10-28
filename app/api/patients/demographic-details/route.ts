import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongoose";
import Patient from "@/models/Patient";
import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";
import { generatePatientId } from "@/lib/utils/generatePatientId";
import type { IDemographicDetails } from "@/models/forms/demographicDetailsModel";

// =====================================
// POST /api/patients/demographic-details
// Create a new patient with demographic details
// =====================================

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // ── Authenticate the user ────────────────────────────────────────
    const auth = await getAuthenticatedUser(request);

    if (!auth.user) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: auth.status },
      );
    }

    // ── Parse JSON body ─────────────────────────────
    const body: IDemographicDetails = await request.json();

    // ── Validate required fields ────────────────────
    const crNo = body.crNo?.trim().toUpperCase();
    const fullName = body.fullName?.trim();

    if (!crNo) {
      return NextResponse.json(
        { success: false, message: "CR Number is required" },
        { status: 400 },
      );
    }

    if (!fullName) {
      return NextResponse.json(
        { success: false, message: "Full name is required" },
        { status: 400 },
      );
    }

    // ── Duplicate CR Number check ───────────────────
    const existing = await Patient.findOne({
      "demographicDetails.crNo": crNo,
    }).select("_id");

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "A patient with this CR Number already exists",
        },
        { status: 409 },
      );
    }

    // ── Build demographicDetails ────────────────────
    const demographicDetails: IDemographicDetails = {
      ...body,
      fullName,
      crNo,
    };

    // ── Generate Patient ID ─────────────────────────
    const patientUniqueId = await generatePatientId();

    // ── Create Patient ──────────────────────────────
    const patient = await Patient.create({
      patientUniqueId,
      demographicDetails,
      createdBy: auth.user._id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Demographic details saved successfully",
        patientId: patient.patientUniqueId,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Demographic Save Error:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: number }).code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Patient with this information already exists.",
        },
        { status: 409 },
      );
    }

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
