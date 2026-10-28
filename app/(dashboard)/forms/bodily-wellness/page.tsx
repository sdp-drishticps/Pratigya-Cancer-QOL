import { Suspense } from "react";
import BodilyWellnessForm from "@/components/forms/bodily-wellness/BodilyWellnessForm";
export default function BodilyWellnessPage() {
  return (
    <Suspense>
      <BodilyWellnessForm />
    </Suspense>
  );
}