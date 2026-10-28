import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";

import { connectDB } from "@/lib/db/mongoose";
import Patient from "@/models/Patient";
import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";
import { getPatientFilesFromS3 } from "@/lib/services/fileUpload.service";

// =====================================
// POST /api/patients/download-files
// Downloads uploaded files for selected patients as a ZIP
// Body: { ids: string[] }
// =====================================

export async function POST(request: NextRequest) {
  try {
    // ─── Connect DB ───────────────────────────────────────
    await connectDB();

    // ─── Auth ─────────────────────────────────────────────
    const auth = await getAuthenticatedUser(request);

    if (!auth.user) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: auth.status },
      );
    }

    // ─── Parse Body ───────────────────────────────────────
    const body = await request.json();
    const ids: string[] = body?.ids ?? [];

    if (!ids.length) {
      return NextResponse.json(
        { success: false, message: "No patient IDs provided" },
        { status: 400 },
      );
    }

    // ─── Fetch Patients (only belonging to this user) ─────
    const patients = await Patient.find({
      _id: { $in: ids },
      createdBy: auth.user._id,
    })
      .select("patientUniqueId demographicDetails.fullName demographicDetails.crNo")
      .lean();

    if (!patients.length) {
      return NextResponse.json(
        { success: false, message: "No patients found" },
        { status: 404 },
      );
    }

    // ─── Build ZIP ────────────────────────────────────────
    const zip = new JSZip();

    let totalFiles = 0;

    for (const patient of patients) {
      const pid = patient.patientUniqueId;
      const folderName = `${pid}_${patient.demographicDetails?.fullName || "unknown"}`;

      // Fetch all files for this patient from S3
      let files: { name: string; buffer: Buffer }[] = [];
      try {
        files = await getPatientFilesFromS3(pid);
      } catch {
        // No files or S3 error — skip silently
        continue;
      }

      for (const { name, buffer } of files) {
        zip.folder(folderName)?.file(name, buffer);
        totalFiles++;
      }
    }

    if (totalFiles === 0) {
      return NextResponse.json(
        { success: false, message: "No uploaded files found for selected patients" },
        { status: 404 },
      );
    }

    // ─── Generate ZIP Buffer ──────────────────────────────
    const zipBuffer = await zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    // ─── Return ZIP as Download ───────────────────────────
    const dateStr = new Date().toISOString().split("T")[0];
    const zipName = `patient-files-${dateStr}.zip`;

    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${zipName}"`,
        "Content-Length": String(zipBuffer.length),
      },
    });
  } catch (error) {
    console.error("Download Patient Files Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
