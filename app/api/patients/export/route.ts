import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import Patient from "@/models/Patient";
import Visit from "@/models/Visit";
import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";

// =====================================
// POST /api/patients/export
// Returns full patient + visits data for selected patient _ids
// Body: { ids: string[] }
// =====================================

export async function POST(request: NextRequest) {
  try {
    // ─── Connect DB ──────────────────────────────────────────
    await connectDB();

    // ─── Auth ────────────────────────────────────────────────
    const auth = await getAuthenticatedUser(request);

    if (!auth.user) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: auth.status },
      );
    }

    // ─── Parse Body ──────────────────────────────────────────
    const body = await request.json();
    const ids: string[] = body?.ids ?? [];

    if (!ids.length) {
      return NextResponse.json(
        { success: false, message: "No patient IDs provided" },
        { status: 400 },
      );
    }

    // ─── Fetch Patients (only belonging to this user) ─────────
    const patients = await Patient.find({
      _id: { $in: ids },
      createdBy: auth.user._id,
    }).lean();

    if (!patients.length) {
      return NextResponse.json(
        { success: false, message: "No patients found" },
        { status: 404 },
      );
    }

    // ─── Fetch All Visits For These Patients ──────────────────
    const patientMongoIds = patients.map((p) => p._id);

    const visits = await Visit.find({
      patientId: { $in: patientMongoIds },
    })
      .sort({ patientId: 1, visitNumber: 1 })
      .lean();

    // ─── Group Visits By Patient ──────────────────────────────
    const visitsByPatient: Record<string, typeof visits> = {};

    for (const visit of visits) {
      const pid = String(visit.patientId);
      if (!visitsByPatient[pid]) visitsByPatient[pid] = [];
      visitsByPatient[pid].push(visit);
    }

    // ─── Assemble Export Payload ──────────────────────────────
    const exportData = patients.map((patient) => ({
      patientUniqueId: patient.patientUniqueId,
      demographicDetails: patient.demographicDetails,
      visits: visitsByPatient[String(patient._id)] ?? [],
    }));

    return NextResponse.json(
      { success: true, patients: exportData },
      { status: 200 },
    );
  } catch (error) {
    console.error("Export Patients Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
