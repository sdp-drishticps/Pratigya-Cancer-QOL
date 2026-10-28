import { Suspense } from "react";
import WomensHealthForm from "@/components/forms/womens-health/WomensHealthForm";

export default function WomensHealthPage() {
  return (
    <Suspense>
      <WomensHealthForm />
    </Suspense>
  );
}
