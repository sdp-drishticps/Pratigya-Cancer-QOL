interface FileValue {
  fileName: string;
  filePath: string;
}

interface DetailCardProps {
  label: string;
  value: string | number | boolean | string[] | FileValue | null;
}
export default function DetailCard({ label, value }: DetailCardProps) {
  const fileValue = value as Partial<FileValue>;

  const isFile =
    typeof value === "object" && value !== null && !!fileValue?.filePath;

  const isEmpty =
    value === null ||
    value === undefined ||
    value === "" ||
    value === "not-applicable" ||
    value === "Not Provided" ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      (Object.keys(value).length === 0 || !fileValue?.filePath));

  let displayValue = "Not Provided";

  if (Array.isArray(value)) {
    const validValues = value.filter(
      (v) => v !== null && v !== undefined && String(v).trim() !== "",
    );
    displayValue =
      validValues.length > 0 ? validValues.join(", ") : "Not Provided";
  } else if (
    value !== null &&
    value !== undefined &&
    value !== "" &&
    typeof value !== "object"
  ) {
    displayValue = String(value);
  }

  return (
    <div className="rounded-lg border border-[#E4E7EC] bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <p className="mb-2 text-sm font-medium text-[#667085]">{label}</p>

      {isFile ? (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">
            {fileValue?.fileName}
          </p>

          <div className="flex gap-4">
            <a
              href={fileValue?.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue-600 underline"
            >
              View
            </a>

            <a
              href={fileValue?.filePath}
              download
              className="text-sm font-semibold text-green-600 underline"
            >
              Download
            </a>
          </div>
        </div>
      ) : (
        <p
          className={`wrap-break-word text-sm ${isEmpty ? "italic text-slate-400" : "font-semibold text-[#101828]"
            }`}
        >
          {displayValue}
        </p>
      )}
    </div>
  );
}
