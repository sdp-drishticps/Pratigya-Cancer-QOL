import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import path from "path";

// =====================================
// S3 Client Configuration
// =====================================

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;
const AWS_REGION = process.env.AWS_REGION!;

// Full public URL: https://{bucket}.s3.{region}.amazonaws.com/{key}
function buildS3Url(key: string): string {
  return `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];

// =====================================
// Types
// =====================================

interface SavePatientFileParams {
  file: File;
  patientId: string;
  fieldName: string;
}

interface SavedFile {
  fileName: string;
  filePath: string; // Full S3 public URL stored in DB
}

// =====================================
// Upload file to S3
// =====================================

export async function savePatientFile({
  file,
  patientId,
  fieldName,
}: SavePatientFileParams): Promise<SavedFile> {
  // ── Validate file object ──────────────────────────────────
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Invalid file");
  }

  // ── File size ─────────────────────────────────────────────
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size must not exceed 5 MB.");
  }

  // ── File type / extension ─────────────────────────────────
  const extension = path.extname(file.name).toLowerCase();

  if (
    !ALLOWED_FILE_TYPES.includes(file.type) ||
    !ALLOWED_EXTENSIONS.includes(extension)
  ) {
    throw new Error("Only PDF, JPG and PNG files are allowed.");
  }

  // ── Build S3 key: uploads/{patientId}/{fieldName}-{timestamp}{ext} ────
  const fileName = `${fieldName}-${Date.now()}${extension}`;
  const s3Key = `uploads/${patientId}/${fileName}`;

  // ── Upload to S3 ──────────────────────────────────────────
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: buffer,
      ContentType: file.type,
    }),
  );

  // Build and return full public S3 URL
  const fileUrl = buildS3Url(s3Key);

  return {
    fileName,
    filePath: fileUrl, // Full S3 URL stored in DB
  };
}

// =====================================
// Download all files for a patient from S3 as { filename: Buffer }
// =====================================

export async function getPatientFilesFromS3(
  patientId: string,
): Promise<{ name: string; buffer: Buffer }[]> {
  const prefix = `uploads/${patientId}/`;

  // List all objects under the patient's prefix
  const listResponse = await s3Client.send(
    new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: prefix,
    }),
  );

  const objects = listResponse.Contents ?? [];

  const results: { name: string; buffer: Buffer }[] = [];

  for (const obj of objects) {
    if (!obj.Key) continue;

    const getResponse = await s3Client.send(
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: obj.Key,
      }),
    );

    // Convert stream to Buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of getResponse.Body as AsyncIterable<Uint8Array>) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Use just the filename part (strip prefix)
    const name = obj.Key.replace(prefix, "");
    results.push({ name, buffer });
  }

  return results;
}

