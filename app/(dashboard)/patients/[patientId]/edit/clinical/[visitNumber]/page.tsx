"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EditClinicalVisitPage() {
  const params = useParams();

  const patientId = params.patientId as string;

  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-lg font-semibold text-slate-700">
        Edit Clinical Visit
      </p>
      <p className="text-sm text-slate-500">
        Use the individual forms below to update each wellness section for this visit.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        <Button asChild variant="outline">
          <Link href={`/forms/clinical-status?patientId=${patientId}`}>
            Clinical Status
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/forms/bodily-wellness?patientId=${patientId}`}>
            Bodily Wellness
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/forms/performance-wellness?patientId=${patientId}`}>
            Performance Wellness
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/forms/mental-wellness?patientId=${patientId}`}>
            Mental Wellness
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/forms/socio-cultural-wellness?patientId=${patientId}`}>
            Socio-Cultural Wellness
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/forms/spiritual-wellness?patientId=${patientId}`}>
            Spiritual Wellness
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/forms/financial-wellness?patientId=${patientId}`}>
            Financial Wellness
          </Link>
        </Button>
      </div>
      <Button asChild className="mt-4 bg-[#2B3674] text-white hover:bg-[#1E285D]">
        <Link href={`/patients/${patientId}`}>← Back to Patient</Link>
      </Button>
    </div>
  );
}