import { Schema } from "mongoose";

export interface IDemographicDetails {
  // ─── Identification ──────────────────────────────
  fullName: string;
  crNo: string;
  dateOfBirth: string;
  age: string;
  sex: string;
  maritalStatus: string;
  contactNumber: string;

  // ─── Residence ───────────────────────────────────
  villageTownCity: string;
  blockTehsil: string;
  district: string;
  state: string;
  pinCode: string;
  settlement: string;
  distanceToHospital: string;

  // ─── Socioeconomic ───────────────────────────────
  education: string;
  occupation: string;
  otherOccupation: string;
  monthlyFamilyIncome: string;
  mainCaregiver: string;

  // ─── Cancer Details ──────────────────────────────
  cancerType: string[];
  otherCancerType: string;
}

export const DemographicDetailsSchema = new Schema<IDemographicDetails>(
  {
    // ─── Identification ────────────────────────────
    fullName: { type: String, required: true, trim: true },
    crNo: { type: String, required: true, trim: true, uppercase: true },
    dateOfBirth: { type: String, default: "" },
    age: { type: String, default: "" },
    sex: { type: String, default: "" },
    maritalStatus: { type: String, default: "" },
    contactNumber: { type: String, default: "", trim: true },

    // ─── Residence ─────────────────────────────────
    villageTownCity: { type: String, default: "", trim: true },
    blockTehsil: { type: String, default: "", trim: true },
    district: { type: String, default: "", trim: true },
    state: { type: String, default: "", trim: true },
    pinCode: { type: String, default: "", trim: true },
    settlement: { type: String, default: "" },
    distanceToHospital: { type: String, default: "" },

    // ─── Socioeconomic ─────────────────────────────
    education: { type: String, default: "" },
    occupation: { type: String, default: "" },
    otherOccupation: { type: String, default: "" },
    monthlyFamilyIncome: { type: String, default: "" },
    mainCaregiver: { type: String, default: "" },

    // ─── Cancer Details ────────────────────────────
    cancerType: { type: [String], default: [] },
    otherCancerType: { type: String, default: "" },
  },
  { _id: false },
);
