interface FormErrorProps {
  error?: string;
  touched?: boolean;
}

export default function FormError({
  error,
  touched,
}: FormErrorProps) {
  if (!touched || !error) return null;

  return (
    <p className="mt-1 text-sm text-red-500">
      {error}
    </p>
  );
}