import { Suspense } from "react";
import SpiritualForm from "@/components/forms/spiritual-wellness/SpiritualWellnessForm";
export default function SpiritualWellnessPage() {
  return (
    <Suspense>
      <SpiritualForm />
    </Suspense>
  );
}