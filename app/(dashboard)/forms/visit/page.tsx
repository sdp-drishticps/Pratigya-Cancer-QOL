import { Suspense } from "react";
import VisitForm from "@/components/forms/visit/VisitForm";
export default function VisitPage() {
  return (
    <Suspense>
      <VisitForm />
    </Suspense>
  );
}