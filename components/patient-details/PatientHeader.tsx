"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Check } from "lucide-react";

interface Props {
  patient: {
    patientId: string;
    demographicDetails: Record<string, unknown>;
  };
}

export default function PatientHeader({ patient }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(patient.patientId);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      {/* Header */}
      <div className="sticky top-19 z-40 bg-white px-4 py-3 sm:px-10">
        <div className="flex gap-3 flex-row items-center justify-between">
          <h1 className="text-sm md:text-xl font-bold text-[#2B3674]">
            Patient Details
          </h1>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#2B3674] sm:text-base"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="mx-4 border border-[#EAECF0] bg-white px-4 py-4 shadow-sm sm:mx-10 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-12 sm:gap-y-4">
          {/* Name */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-600">Name:</span>

            <span className="break-all text-sm font-medium text-[#2B3674]">
              {String(patient.demographicDetails?.fullName || "-")}
            </span>
          </div>

          {/* Patient ID */}
          <div className="flex flex-row gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-600">
                Patient ID:
              </span>

              <span className="break-all text-sm font-medium uppercase text-[#2B3674]">
                {patient.patientId}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className={`h-7 w-fit px-3 text-xs transition-all ${
                isCopied
                  ? "border-green-500 bg-green-50 text-green-600 hover:bg-green-100"
                  : "text-slate-600"
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="mr-1 h-2 w-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-2 w-2" />
                  Copy
                </>
              )}
            </Button>
          </div>

          {/* CR */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-600">CR No:</span>

            <span className="text-sm font-medium text-[#2B3674]">
              {String(patient.demographicDetails?.crNo || "-")}
            </span>
          </div>

          {/* Age */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-600">Age:</span>

            <span className="text-sm font-medium text-[#2B3674]">
              {String(patient.demographicDetails?.age || "-")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
