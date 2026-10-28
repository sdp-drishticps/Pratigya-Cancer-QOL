import { Schema } from "mongoose";

export interface FileAttachment {
  fileName: string;
  filePath: string;
}

export const FileSchema = new Schema<FileAttachment>(
  {
    fileName: { type: String, default: "" },
    filePath: { type: String, default: "" },
  },
  { _id: false },
);
