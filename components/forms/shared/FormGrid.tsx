"use client";

import FormField, { FormFieldConfig } from "./FormField";

interface FormGridProps {
  fields: readonly FormFieldConfig[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;

  files?: Record<string, File | null>;

  onFileSelect?: (fieldName: string, file: File) => void;

  /** Override the grid wrapper class. Defaults to the 4-col layout. */
  gridClass?: string;
}

export default function FormGrid({
  fields,
  formik,
  files = {},
  onFileSelect,
  gridClass = "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4",
}: FormGridProps) {
  return (
    <div className={gridClass}>
      {fields
        .filter((field) =>
          field.showWhen ? field.showWhen(formik.values) : true,
        )
        .map((field) => (
          <FormField
            key={field.name}
            field={field}
            formik={formik}
            file={files[field.name] || null}
            onFileSelect={
              onFileSelect ? (file) => onFileSelect(field.name, file) : undefined
            }
          />
        ))}
    </div>
  );
}
