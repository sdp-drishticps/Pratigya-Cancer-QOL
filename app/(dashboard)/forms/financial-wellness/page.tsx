import { Suspense } from "react";
import FinancialWellnessForm from "@/components/forms/financial-wellness/FinancialWellnessForm";
export default function FinancialWellnessPage() {
  return (
    <Suspense>
      <FinancialWellnessForm />
    </Suspense>
  );
}