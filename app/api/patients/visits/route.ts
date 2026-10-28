import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongoose";
import Patient from "@/models/Patient";
import Visit from "@/models/Visit";
import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";
import { savePatientFile } from "@/lib/services/fileUpload.service";
import type { VisitFormData } from "@/models/forms/visitFormModel";

const FILE_FIELDS = [
  "biopsyReport",
  "clinicalReport",
  "oralCavityPhoto",
] as const;

interface FileData {
  fileName: string;
  filePath: string;
}

export async function POST(request: NextRequest) {
  let patientUniqueId = "";

  try {
    await connectDB();
    const auth = await getAuthenticatedUser(request);
    if (!auth.user) {
      return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
    }

    const formData = await request.formData();

    patientUniqueId = formData.get("patientUniqueId")?.toString().trim() || "";
    if (!patientUniqueId) {
      return NextResponse.json({ success: false, message: "Patient Unique ID is required" }, { status: 400 });
    }

    const patient = await Patient.findOne({ patientUniqueId }).select("_id patientUniqueId");
    if (!patient) {
      return NextResponse.json({ success: false, message: "Patient not found" }, { status: 404 });
    }

    // ── Parse FormData ──────────────────────────────
    const raw: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
      if (value instanceof File || key === "patientUniqueId") continue;

      if (key === "treatmentReceived") {
        try {
          raw[key] = JSON.parse(value as string);
        } catch {
          raw[key] = [value];
        }
      } else {
        raw[key] = value;
      }
    }

    // ── Generate Next Visit Number ────────────────────
    const latestVisit = await Visit.findOne({ patientId: patient._id }).sort({ visitNumber: -1 }).select("visitNumber");
    const nextVisitNumber = latestVisit ? latestVisit.visitNumber + 1 : 1;

    // ── Handle File Uploads ──────────────────────────
    const fileData: Record<(typeof FILE_FIELDS)[number], FileData> = {
      biopsyReport: { fileName: "", filePath: "" },
      clinicalReport: { fileName: "", filePath: "" },
      oralCavityPhoto: { fileName: "", filePath: "" },
    };

    for (const fieldName of FILE_FIELDS) {
      const file = formData.get(fieldName);
      if (!(file instanceof File) || file.size === 0) continue;

      const savedFile = await savePatientFile({
        file,
        patientId: patientUniqueId,
        fieldName,
      });
      fileData[fieldName] = savedFile;
    }

    // ── Build Visit Details ──────────────────────────
    const visitDetails: VisitFormData = {
      phaseOfCare: raw.phaseOfCare || "",
      diagnosisDate: raw.diagnosisDate || "",
      monthsSinceDiagnosis: raw.monthsSinceDiagnosis || "",
      biopsyReport: fileData.biopsyReport,
      stageAtDiagnosis: raw.stageAtDiagnosis || "",
      extent: raw.extent || "",
      treatmentReceived: raw.treatmentReceived || [],
      treatmentStatus: raw.treatmentStatus || "",
      treatmentCompletionDate: raw.treatmentCompletionDate || "",
      diseaseStatus: raw.diseaseStatus || "",
      recurrenceDate: raw.recurrenceDate || "",
      clinicalReport: fileData.clinicalReport,
      ptnmStaging: raw.ptnmStaging || "",
      durationOfSurvival: raw.durationOfSurvival || "",
      tobaccoUse: raw.tobaccoUse || "",
      tobaccoType: raw.tobaccoType || "",
      oralCavityPhoto: fileData.oralCavityPhoto,
      partnerTobaccoUse: raw.partnerTobaccoUse || "",
      alcoholUse: raw.alcoholUse || "",
      respondent: raw.respondent || "",
      consent: raw.consent === "true",
    };

    // ── Create Visit ────────────────────────────────
    const visit = await Visit.create({
      patientId: patient._id,
      visitNumber: nextVisitNumber,
      visitDate: raw.visitDate ? new Date(raw.visitDate) : new Date(),
      visitDetails,
      sectionStatus: {
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
      },
      createdBy: auth.user._id,
    });

    return NextResponse.json({
      success: true,
      message: `Visit ${visit.visitNumber} created successfully`,
      patientUniqueId: patient.patientUniqueId,
      visitId: visit._id,
      visitNumber: visit.visitNumber,
    }, { status: 201 });

  } catch (error: any) {
    console.error("Create Visit Error:", error);

    if (error?.code === 11000) {
      return NextResponse.json({ success: false, message: "Visit already exists for this patient" }, { status: 409 });
    }

    if (error instanceof Error && (error.message === "Only PDF, JPG and PNG files are allowed." || error.message === "File size must not exceed 5 MB.")) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}