"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FileUpload from "@/components/ui/FileUpload";
import MultiSelectDropdown from "@/components/ui/MultiSelectDropdown";

export type FormFieldType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "multiselect"
  | "file"
  | "calculated"
  | "checkbox"
  | "textarea";

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FormFieldType;

  required?: boolean;

  placeholder?: string;

  options?: readonly string[] | string[];

  min?: number;
  max?: number;
  step?: string | number;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];

  accept?: string;

  disabled?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  showWhen?: (values: Record<string, any>) => boolean;
}

interface FormFieldProps {
  field: FormFieldConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;

  file?: File | null;

  onFileSelect?: (file: File) => void;
}

export default function FormField({
  field,
  formik,
  file,
  onFileSelect,
}: FormFieldProps) {
  const value = formik.values[field.name];

  const touched = formik.touched[field.name];

  const error = formik.errors[field.name];

  const renderError = () => {
    if (!touched || !error) {
      return null;
    }

    return (
      <p className="text-sm text-red-500">
        {typeof error === "string" ? error : "Invalid value"}
      </p>
    );
  };

  const renderLabel = () => (
    <Label className="text-sm font-medium text-slate-700">
      {field.label}

      {field.required && <span className="text-red-500"> *</span>}
    </Label>
  );

  /*
   * SELECT
   */

  if (field.type === "select") {
    return (
      <div className="space-y-2">
        {renderLabel()}

        <Select
          value={value || ""}
          onValueChange={(newValue) => {
            formik.setFieldValue(field.name, newValue);
          }}
        >
          <SelectTrigger className="h-11 w-full bg-white">
            <SelectValue placeholder={field.placeholder || "Select Option"} />
          </SelectTrigger>

          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {renderError()}
      </div>
    );
  }

  /*
   * MULTI SELECT
   */

  if (field.type === "multiselect") {
    return (
      <div className="space-y-2">
        <MultiSelectDropdown
          label={field.label}
          placeholder={field.placeholder || "Select"}
          required={field.required}
          options={field.options ? [...field.options] : []}
          value={value || []}
          onChange={(newValue) => {
            formik.setFieldValue(field.name, newValue);
          }}
          error={
            touched
              ? typeof error === "string"
                ? error
                : undefined
              : undefined
          }
        />
      </div>
    );
  }

  /*
   * FILE
   */

  if (field.type === "file") {
    const fileValue = value || {};

    return (
      <FileUpload
        label={field.label}
        required={field.required}
        fileName={file?.name || fileValue.fileName || ""}
        touched={touched?.fileName}
        error={error?.fileName}
        accept={field.accept}
        onFileSelect={onFileSelect || (() => { })}
      />
    );
  }

  /*
   * CHECKBOX
   */

  if (field.type === "checkbox") {
    return (
      <div className="col-span-full space-y-1">
        <div className="flex items-center gap-3 pt-3">
          <Checkbox
            id={field.name}
            checked={!!value}
            onCheckedChange={(checked) =>
              formik.setFieldValue(field.name, checked)
            }
          />

          <Label
            htmlFor={field.name}
            className="cursor-pointer text-sm font-medium text-slate-700"
          >
            {field.label}
            {field.required && <span className="text-red-500"> *</span>}
          </Label>
        </div>

        {renderError()}
      </div>
    );
  }

  /*
   * CALCULATED
   */

  if (field.type === "calculated") {
    return (
      <div className="space-y-2">
        {renderLabel()}

        <Input
          name={field.name}
          value={value || ""}
          placeholder={field.placeholder}
          readOnly
          className="h-11 cursor-not-allowed bg-slate-100"
        />

        {renderError()}
      </div>
    );
  }

  /*
   * TEXTAREA
   */

  if (field.type === "textarea") {
    return (
      <div className="space-y-2">
        {renderLabel()}

        <Textarea
          name={field.name}
          placeholder={field.placeholder}
          value={value ?? ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={field.disabled}
          rows={4}
          className={`w-full resize-y ${field.disabled ? "cursor-not-allowed bg-slate-100" : "bg-white"
            }`}
        />

        {renderError()}
      </div>
    );
  }

  /*
   * NORMAL INPUT
   *
   * text
   * number
   * date
   */

  return (
    <div className="space-y-2">
      {renderLabel()}

      <Input
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        min={field.min}
        max={field.max}
        step={field.type === "number" ? (field.step ?? "any") : field.step}
        maxLength={field.maxLength}
        inputMode={field.inputMode}
        value={value ?? ""}
        onChange={(e) => {
          if (field.inputMode === "numeric") {
            // Strip any character that is not a digit
            const digits = e.target.value.replace(/\D/g, "");
            formik.setFieldValue(field.name, digits);
          } else {
            formik.handleChange(e);
          }
        }}
        onBlur={formik.handleBlur}
        disabled={field.disabled}
        readOnly={field.disabled}
        className={`h-11 w-full ${field.disabled ? "cursor-not-allowed bg-slate-100" : "bg-white"
          }`}
      />

      {renderError()}
    </div>
  );
}
