import { Suspense } from "react";
import MentalWellnessForm from "@/components/forms/mental-wellness/MentalWellnessForm";
export default function MentalWellnessPage() {
  return (
    <Suspense>
      <MentalWellnessForm />
    </Suspense>
  );
}