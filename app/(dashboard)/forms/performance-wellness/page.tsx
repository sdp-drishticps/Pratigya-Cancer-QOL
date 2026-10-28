import { Suspense } from "react";
import PerformanceWellnessForm from "@/components/forms/performance-wellness/PerformanceWellnessForm";
export default function PerformanceWellnessPage() {
  return (
    <Suspense>
      <PerformanceWellnessForm />
    </Suspense>
  );
}