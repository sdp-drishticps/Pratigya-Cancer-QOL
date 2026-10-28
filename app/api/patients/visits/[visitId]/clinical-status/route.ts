import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongoose";

import Patient from "@/models/Patient";
import Visit from "@/models/Visit";

import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";

import { savePatientFile } from "@/lib/services/fileUpload.service";

// =====================================
// Clinical Status File Fields
// =====================================

const FILE_FIELDS = ["haemoglobinReport", "creatinineReport"] as const;

// =====================================
// GET Clinical Status
// =====================================

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      visitId: string;
    }>;
  },
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
      .select("_id visitNumber clinicalStatus sectionStatus")
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
        sectionCompleted: visit.sectionStatus?.clinicalStatus ?? false,
        data: visit.clinicalStatus ?? {},
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get Clinical Status Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// =====================================
// POST Clinical Status
// =====================================


export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      visitId: string;
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
    // Get Visit ID
    // =====================================

    const { visitId } = await params;

    if (!visitId) {
      return NextResponse.json(
        {
          success: false,
          message: "Visit ID is required",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================
    // Find Visit
    // =====================================

    const visit = await Visit.findOne({ _id: visitId, createdBy: auth.user._id });

    if (!visit) {
      return NextResponse.json(
        {
          success: false,
          message: "Visit not found",
        },
        {
          status: 404,
        },
      );
    }

    // =====================================
    // Find Patient
    // =====================================

    const patient = await Patient.findById(visit.patientId).select(
      "patientUniqueId",
    );

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
    // Read FormData
    // =====================================

    const formData = await request.formData();

    const clinicalData: Record<string, unknown> = {};

    // =====================================
    // Read Normal Fields
    // =====================================

    for (const [key, value] of formData.entries()) {
      if (value instanceof File || key === "patientUniqueId") {
        continue;
      }

      if (key === "comorbidities") {
        try {
          clinicalData[key] = JSON.parse(value as string);
        } catch {
          clinicalData[key] = [value];
        }
        continue;
      }

      clinicalData[key] = value;
    }

    // =====================================
    // Existing Clinical Data
    // =====================================

    const fileData: Record<
      string,
      {
        fileName: string;
        filePath: string;
      }
    > = {};

    // =====================================
    // Upload Files
    // =====================================

    for (const fieldName of FILE_FIELDS) {
      const file = formData.get(fieldName);

      if (!(file instanceof File) || file.size === 0) {
        continue;
      }

      const savedFile = await savePatientFile({
        file,
        patientId: patient.patientUniqueId,
        fieldName,
      });

      fileData[fieldName] = savedFile;
    }

    // =====================================
    // Add File Data
    // =====================================

    Object.assign(clinicalData, fileData);

    // =====================================
    // Update Visit
    // =====================================

    if (!visit.clinicalStatus) {
      visit.clinicalStatus = {} as typeof visit.clinicalStatus;
    }
    Object.assign(visit.clinicalStatus, clinicalData);
    visit.markModified("clinicalStatus");

    // =====================================
    // Update Section Status
    // =====================================

    visit.sectionStatus.clinicalStatus = true;

    await visit.save();

    // =====================================
    // Success
    // =====================================

    return NextResponse.json(
      {
        success: true,

        message: "Clinical Status saved successfully",

        patientUniqueId: patient.patientUniqueId,

        visitId: visit._id,

        visitNumber: visit.visitNumber,
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    console.error("Clinical Status Save Error:", error);

    // =====================================
    // File Validation Errors
    // =====================================

    if (error instanceof Error) {
      if (error.message === "Only PDF, JPG and PNG files are allowed.") {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
          },
          {
            status: 400,
          },
        );
      }

      if (error.message === "File size must not exceed 5 MB.") {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
          },
          {
            status: 400,
          },
        );
      }
    }

    // =====================================
    // General Error
    // =====================================

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

