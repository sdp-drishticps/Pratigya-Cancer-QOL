"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PatientVisitHeaderProps {
  patientId: string;
  visitNumber: string;
  patientName?: string;
  isVerifying?: boolean;
  patientIdDisabled?: boolean;

  onPatientIdChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onPatientIdBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function PatientVisitHeader({
  patientId,
  visitNumber,
  patientName = "",
  isVerifying = false,
  patientIdDisabled = false,
  onPatientIdChange,
  onPatientIdBlur,
}: PatientVisitHeaderProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Patient Unique ID */}

      <div className="space-y-2">
        <Label
          htmlFor="patientId"
          className="text-sm font-medium text-slate-700"
        >
          Patient Unique ID
          <span className="text-red-500"> *</span>
        </Label>

        <Input
          id="patientId"
          name="patientId"
          value={patientId}
          onChange={onPatientIdChange}
          onBlur={onPatientIdBlur}
          disabled={patientIdDisabled}
          placeholder={patientIdDisabled ? "" : "Enter Patient ID"}
          className={`h-11 w-full ${
            patientIdDisabled ? "cursor-not-allowed bg-slate-100" : "bg-white"
          }`}
        />

        {isVerifying && <p className="text-sm text-blue-500">Verifying...</p>}

        {!isVerifying && patientName && (
          <p className="text-sm font-medium text-green-600">
            ✓ Patient Verified: {patientName}
          </p>
        )}
      </div>

      {/* Visit Number */}

      <div className="space-y-2">
        <Label
          htmlFor="visitNumber"
          className="text-sm font-medium text-slate-700"
        >
          Visit Number
        </Label>

        <Input
          id="visitNumber"
          name="visitNumber"
          value={visitNumber}
          readOnly
          disabled
          placeholder="Visit Number"
          className="h-11 w-full cursor-not-allowed bg-slate-100"
        />
      </div>
    </div>
  );
}
