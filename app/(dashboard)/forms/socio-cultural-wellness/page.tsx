import { Suspense } from "react";
import SocioCulturalWellnessForm from "@/components/forms/socio&cultural wellness/SocioCulturalWellnessForm";
export default function SocioCulturalWellnessPage() {
  return (
    <Suspense>
      <SocioCulturalWellnessForm />
    </Suspense>
  );
}