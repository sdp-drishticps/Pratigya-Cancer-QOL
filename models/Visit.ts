import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { VisitDetailsSchema } from "./forms/visitFormModel";
import { ClinicalStatusSchema } from "./forms/clinicalStatusFormModel";
import { BodilyWellnessSchema } from "./forms/wellness/bodilyWellnessFormModel";
import { PerformanceWellnessSchema } from "./forms/wellness/performanceWellnessFormModel";
import { MentalWellnessSchema } from "./forms/wellness/mentalWellnessFormModel";
import { SocioCulturalWellnessSchema } from "./forms/wellness/socioCulturalWellnessFormModel";
import { SpiritualWellnessSchema } from "./forms/wellness/spiritualWellnessFormModel";
import { FinancialWellnessSchema } from "./forms/wellness/financialWellnessFormModel";
import { WellnessScoreSchema } from "./forms/wellness/wellnessScoreModel";
import { WomensHealthSchema } from "./forms/womensHealthFormModel";
import { PatientNarrativeSchema } from "./forms/patientNarrativeFormModel";
import {
  CervicalCancerSchema,
  BreastCancerSchema,
  HeadAndNeckCancerSchema,
} from "./forms/diseaseSpecificFormModel";
import {
  ISectionStatus,
  SectionStatusSchema,
} from "./forms/sectionStatusModel";
import type { VisitFormData } from "./forms/visitFormModel";
import type { ClinicalStatusFormData } from "./forms/clinicalStatusFormModel";
import type { BodilyWellnessFormData } from "./forms/wellness/bodilyWellnessFormModel";
import type { PerformanceWellnessFormData } from "./forms/wellness/performanceWellnessFormModel";
import type { MentalWellnessFormData } from "./forms/wellness/mentalWellnessFormModel";
import type { SocioCulturalWellnessFormData } from "./forms/wellness/socioCulturalWellnessFormModel";
import type { SpiritualWellnessFormData } from "./forms/wellness/spiritualWellnessFormModel";
import type { FinancialWellnessFormData } from "./forms/wellness/financialWellnessFormModel";
import type { WellnessInsightsPayload } from "@/lib/scoring/wellnessScoringTypes";
import type { WomensHealthFormData } from "./forms/womensHealthFormModel";
import type { PatientNarrativeFormData } from "./forms/patientNarrativeFormModel";
import type {
  CervicalCancerFormData,
  BreastCancerFormData,
  HeadAndNeckCancerFormData,
} from "./forms/diseaseSpecificFormModel";

// =====================================
// Visit Interface
// =====================================

export interface IVisit extends Document {
  patientId: Types.ObjectId;

  visitNumber: number;

  visitDate: Date;

  visitDetails: VisitFormData;

  sectionStatus: ISectionStatus;

  clinicalStatus: ClinicalStatusFormData;

  bodilyWellness: BodilyWellnessFormData;

  performanceWellness: PerformanceWellnessFormData;

  mentalWellness: MentalWellnessFormData;

  socioCulturalWellness: SocioCulturalWellnessFormData;

  spiritualWellness: SpiritualWellnessFormData;

  financialWellness: FinancialWellnessFormData;

  womensHealth: WomensHealthFormData;

  patientNarrative: PatientNarrativeFormData;

  diseaseSpecific: {
    cervicalCancer: CervicalCancerFormData;
    breastCancer: BreastCancerFormData;
    headAndNeckCancer: HeadAndNeckCancerFormData;
  };

  // WellnessInsightsPayload is the full computed score object stored in DB
  wellnessScore: WellnessInsightsPayload;

  createdBy: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}

// =====================================
// Visit Schema
// =====================================

const VisitSchema = new Schema<IVisit>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },

    visitNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    visitDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    visitDetails: { type: VisitDetailsSchema, default: () => ({}) },

    sectionStatus: { type: SectionStatusSchema, default: () => ({}) },

    clinicalStatus: { type: ClinicalStatusSchema, default: undefined },

    bodilyWellness: { type: BodilyWellnessSchema, default: undefined },

    performanceWellness: {
      type: PerformanceWellnessSchema,
      default: undefined,
    },

    mentalWellness: { type: MentalWellnessSchema, default: undefined },

    socioCulturalWellness: {
      type: SocioCulturalWellnessSchema,
      default: undefined,
    },

    spiritualWellness: { type: SpiritualWellnessSchema, default: undefined },

    financialWellness: { type: FinancialWellnessSchema, default: undefined },

    diseaseSpecific: {
      type: new Schema(
        {
          cervicalCancer: { type: CervicalCancerSchema, default: undefined },
          breastCancer: { type: BreastCancerSchema, default: undefined },
          headAndNeckCancer: {
            type: HeadAndNeckCancerSchema,
            default: undefined,
          },
        },
        { _id: false },
      ),
      default: undefined,
    },

    womensHealth: { type: WomensHealthSchema, default: undefined },

    patientNarrative: { type: PatientNarrativeSchema, default: undefined },

    wellnessScore: { type: WellnessScoreSchema, default: undefined },

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
// Unique Visit Number Per Patient
// =====================================

VisitSchema.index(
  {
    patientId: 1,
    visitNumber: 1,
  },
  {
    unique: true,
  },
);

// =====================================
// Model
// =====================================

const Visit: Model<IVisit> =
  mongoose.models.Visit || mongoose.model<IVisit>("Visit", VisitSchema);

export default Visit;
