/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import { LuLayoutDashboard } from "react-icons/lu";
import { Button } from "@/components/ui/button";

import FormGrid from "@/components/forms/shared/FormGrid";

import { demographicFields } from "./demographicFields";
import { demographicInitialValues } from "./demographicInitialValues";
import { demographicSchema } from "./demographicSchema";

import { DemographicFormValues } from "./types";

interface DemographicFormProps {
  initialValues?: Partial<DemographicFormValues>;
  patientId?: string;
  isEdit?: boolean;
}

export default function DemographicForm({
  initialValues,
  patientId,
  isEdit = false,
}: DemographicFormProps) {
  const router = useRouter();

  // =====================================
  // Formik
  // =====================================

  const formik = useFormik<DemographicFormValues>({
    enableReinitialize: true,

    initialValues: {
      ...demographicInitialValues,
      ...(initialValues ?? {}),
    },

    validationSchema: demographicSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        // =================================
        // EDIT
        // =================================

        if (isEdit) {
          await axios.put(`/api/patients/${patientId}`, values);

          toast.success("Demographic Details updated successfully");
          router.push(`/patients/${patientId}`);
          router.refresh();
          return;
        }

        // =================================
        // CREATE
        // =================================

        const response = await axios.post(
          "/api/patients/demographic-details",
          values,
        );

        toast.success(
          response.data.message || "Demographic Details saved successfully",
        );

        router.push(`/forms/visit?patientId=${response.data.patientId}`);
        router.refresh();
        formik.resetForm();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { setFieldValue } = formik;

  // =====================================
  // Calculate Age from DOB
  // =====================================

  useEffect(() => {
    const dob = formik.values.dateOfBirth;

    if (!dob) {
      setFieldValue("age", "");

      return;
    }

    const birthDate = new Date(dob);

    if (Number.isNaN(birthDate.getTime())) {
      setFieldValue("age", "");

      return;
    }

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    setFieldValue("age", age >= 0 ? age : "");
  }, [formik.values.dateOfBirth, setFieldValue]);


  // =====================================
  // Button Text
  // =====================================

  const buttonText = formik.isSubmitting
    ? isEdit
      ? "Updating..."
      : "Saving and Next..."
    : isEdit
      ? "Update"
      : "Save and Next";

  // =====================================
  // Render
  // =====================================

  return (
    <div className="w-full bg-[#FCFCFF] p-1">
      {/* =================================
          HEADER
      ================================= */}

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#2B3674] md:text-2xl">
          Demographic Details
        </h1>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 border-[#2B3674] text-[#2B3674] hover:bg-[#2B3674] hover:text-white transition-colors"
        >
          <LuLayoutDashboard size={18} />
          Back to Dashboard
        </Button>
      </div>

      {/* =================================
          FORM
      ================================= */}

      <form onSubmit={formik.handleSubmit} className="space-y-8">
        
        {/* =================================
            FULL FORM GRID
        ================================= */}

        <FormGrid
          fields={demographicFields.map((f) =>
            f.name === "crNo" && isEdit ? { ...f, disabled: true } : f,
          )}
          formik={formik}
        />

        {/* =================================
            SAVE BUTTON
        ================================= */}

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-[#2B3674] px-8 py-5 text-white hover:bg-[#1E285D]"
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </div>
  );
}
