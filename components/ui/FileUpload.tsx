"use client";

import { useRef } from "react";
import { FileText } from "lucide-react";

import { Label } from "@/components/ui/label";
import FormError from "@/components/ui/FormError";

interface FileUploadProps {
  label: string;
  required?: boolean;
  fileName?: string;
  accept?: string;
  touched?: boolean;
  error?: string;
  onFileSelect: (file: File) => void;
}

export default function FileUpload({
  label,
  required = false,
  fileName,
  accept = ".pdf,.jpg,.jpeg,.png",
  touched,
  error,
  onFileSelect,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onFileSelect(file);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-700">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </Label>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        onChange={handleChange}
      />

      {/* Upload Box */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm transition-colors hover:border-slate-300  focus:outline-none focus:ring-2 focus:ring-[#2B3674]/20"
      >
        <span className="truncate text-slate-500">
          {fileName || "Choose file"}
        </span>

        <span className="rounded bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          Browse
        </span>
      </button>

      {/* Selected File */}
      {fileName && (
        <div className="flex items-center gap-2 rounded-md bg-slate-50 px-2 py-1">
          <FileText className="h-4 w-4 text-[#2B3674]" />

          <p
            className="truncate text-sm text-slate-600"
            title={fileName}
          >
            {fileName}
          </p>
        </div>
      )}

      <FormError
        touched={touched}
        error={error}
      />
    </div>
  );
}