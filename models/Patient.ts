import mongoose, { Document, Model, Schema, Types } from "mongoose";
import {
  IDemographicDetails,
  DemographicDetailsSchema,
} from "./forms/demographicDetailsModel";

export type { IDemographicDetails };

// =====================================
// Patient Interface
// =====================================

export interface IPatient extends Document {
  patientUniqueId: string;
  demographicDetails: IDemographicDetails;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// =====================================
// Patient Schema
// =====================================

const PatientSchema = new Schema<IPatient>(
  {
    patientUniqueId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    demographicDetails: {
      type: DemographicDetailsSchema,
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// =====================================
// Model
// =====================================

const Patient: Model<IPatient> =
  mongoose.models.Patient || mongoose.model<IPatient>("Patient", PatientSchema);

export default Patient;
