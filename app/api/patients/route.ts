import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongoose";
import Patient from "@/models/Patient";

import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";

// =====================================
// GET /api/patients
// Returns all patients created by the logged-in user
// =====================================

export async function GET(request: NextRequest) {
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
    // Fetch Patients for this User
    // =====================================

    const patients = await Patient.find({
      createdBy: auth.user._id,
    })
      .select(
        "patientUniqueId demographicDetails.fullName demographicDetails.crNo demographicDetails.age demographicDetails.sex createdAt",
      )
      .sort({ createdAt: -1 })
      .lean();

    // =====================================
    // Format Response
    // =====================================

    const formatted = patients.map((patient) => ({
      _id: patient._id,
      patientId: patient.patientUniqueId,
      fullName: patient.demographicDetails?.fullName || "",
      crNo: patient.demographicDetails?.crNo || "",
      age: patient.demographicDetails?.age ?? "",
      gender: patient.demographicDetails?.sex || "",
      createdAt: patient.createdAt,
    }));

    return NextResponse.json(
      {
        success: true,
        patients: formatted,
        total: formatted.length,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Get Patients Error:", error);

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
