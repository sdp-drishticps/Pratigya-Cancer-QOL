import HeadAndNeckCancerForm from "@/components/forms/disease-specific/head-and-neck-cancer/HeadAndNeckCancerForm";

export default async function HeadAndNeckCancerPage({
  searchParams,
}: {
  searchParams: Promise<{ patientId?: string }>;
}) {
  const { patientId } = await searchParams;
  return <HeadAndNeckCancerForm patientId={patientId} />;
}
