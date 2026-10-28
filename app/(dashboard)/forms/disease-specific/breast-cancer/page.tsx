import BreastCancerForm from "@/components/forms/disease-specific/breast-cancer/BreastCancerForm";

export default async function BreastCancerPage({
  searchParams,
}: {
  searchParams: Promise<{ patientId?: string }>;
}) {
  const { patientId } = await searchParams;
  return <BreastCancerForm patientId={patientId} />;
}
