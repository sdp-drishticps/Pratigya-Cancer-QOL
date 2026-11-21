import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import Visit from "@/models/Visit";
import Patient from "@/models/Patient";
import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";
import { savePatientFile } from "@/lib/services/fileUpload.service";

const FILE_FIELDS = [
  "biopsyReport",
  "clinicalReport",
  "oralCavityPhoto",
] as const;

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ visitId: string }> },
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

    const visit = await Visit.findOne({
      _id: visitId,
      createdBy: auth.user._id,
    });
    if (!visit) {
      return NextResponse.json(
        { success: false, message: "Visit not found" },
        { status: 404 },
      );
    }

    const patient = await Patient.findById(visit.patientId).select(
      "patientUniqueId",
    );
    if (!patient) {
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 },
      );
    }

    const formData = await request.formData();

    if (!visit.visitDetails) {
      visit.visitDetails = {} as any;
    }

    const raw: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) continue;

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

    if (raw.visitDate) {
      visit.visitDate = new Date(raw.visitDate);
    }

    // Assign text fields to visitDetails
    const textFields = [
      "phaseOfCare",
      "diagnosisDate",
      "monthsSinceDiagnosis",
      "stageAtDiagnosis",
      "extent",
      "treatmentReceived",
      "treatmentStatus",
      "treatmentCompletionDate",
      "diseaseStatus",
      "recurrenceDate",
      "ptnmStaging",
      "durationOfSurvival",
      "tobaccoUse",
      "tobaccoType",
      "partnerTobaccoUse",
      "alcoholUse",
      "respondent",
    ];

    for (const field of textFields) {
      if (raw[field] !== undefined) {
        (visit.visitDetails as unknown as Record<string, unknown>)[field] =
          raw[field];
      }
    }

    if (raw.consent !== undefined) {
      visit.visitDetails.consent = raw.consent === "true";
    }

    for (const fieldName of FILE_FIELDS) {
      const file = formData.get(fieldName);

      // No new file uploaded - keep existing
      if (!(file instanceof File) || file.size === 0) {
        continue;
      }

      // Save new file
      const saved = await savePatientFile({
        file,
        patientId: patient.patientUniqueId,
        fieldName,
      });

      visit.visitDetails[fieldName] = saved;
    }

    visit.markModified("visitDetails");
    await visit.save();

    return NextResponse.json({
      success: true,
      message: "Visit updated successfully",
      visitId: visit._id,
      visitNumber: visit.visitNumber,
    });
  } catch (error: any) {
    console.error("Update Visit Error:", error);
    if (
      error instanceof Error &&
      (error.message === "Only PDF, JPG and PNG files are allowed." ||
        error.message === "File size must not exceed 40 MB.")
    ) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
