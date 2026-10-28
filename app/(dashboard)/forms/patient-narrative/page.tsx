import { Suspense } from "react";
import PatientNarrativeForm from "@/components/forms/patient-narrative/PatientNarrativeForm";

export const metadata = {
  title: "Patient Narrative | Cancer Survivor",
  description: "Record the patient's narrative and lived experience",
};

export default function PatientNarrativePage() {
  return (
    <Suspense>
      <PatientNarrativeForm />
    </Suspense>
  );
}
