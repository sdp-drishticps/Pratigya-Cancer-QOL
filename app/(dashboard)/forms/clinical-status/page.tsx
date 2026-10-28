import { Suspense } from "react";
import ClinicalStatusForm from "@/components/forms/clinical-status/ClinicalStatusForm";
export default function ClinicalStatusPage() {
  return (
    <Suspense>
      <ClinicalStatusForm />
    </Suspense>
  );
}