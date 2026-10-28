import CervicalCancerForm from "@/components/forms/disease-specific/cervical-cancer/CervicalCancerForm";

export default async function CervicalCancerPage({
  searchParams,
}: {
  searchParams: Promise<{ patientId?: string }>;
}) {
  const { patientId } = await searchParams;
  return <CervicalCancerForm patientId={patientId} />;
}
