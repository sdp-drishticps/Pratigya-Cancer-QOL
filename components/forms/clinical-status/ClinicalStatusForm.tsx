/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import { clinicalStatusInitialValues } from "./clinicalStatusInitialValues";
import { clinicalStatusSchema } from "./clinicalStatusSchema";

import { LuLayoutDashboard } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import FormGrid from "@/components/forms/shared/FormGrid";

import { clinicalStatusFields } from "./clinicalStatusFields";
import { usePatientVisit } from "@/components/forms/shared/usePatientVisit";
import PatientVisitHeader from "@/components/forms/shared/PatientVisitHeader";

interface ClinicalStatusFormProps {
  initialValues?: typeof clinicalStatusInitialValues;
  patientId?: string;
  isEdit?: boolean;
}

export default function ClinicalStatusForm({
  initialValues,
  patientId,
  isEdit = false,
}: ClinicalStatusFormProps) {
  const router = useRouter();

  // =====================================
  // File States
  // =====================================

  const [selectedHaemoglobinReport, setSelectedHaemoglobinReport] =
    useState<File | null>(null);

  const [selectedCreatinineReport, setSelectedCreatinineReport] =
    useState<File | null>(null);

  // =====================================
  // Patient Valid Ref
  // =====================================

  const isPatientValidRef = useRef(false);

  // =====================================
  // Formik
  // =====================================

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      ...clinicalStatusInitialValues,
      ...(initialValues ?? {}),
      patientId: patientId ?? "",
    },

    validationSchema: clinicalStatusSchema,

    onSubmit: async () => {
      // Actual submission is handled
      // by handleSubmit below.
    },
  });

  // =====================================
  // Patient / Visit
  // =====================================

  const {
    patientIdFromUrl,
    patientName,
    visitNumber,
    visitId,
    isVerifying,
    isPatientValid,
    handlePatientBlur,
    resetPatientVisit,
  } = usePatientVisit({
    formik,
    isEdit,
  });

  // Keep ref synchronized with
  // latest patient verification state.
  useEffect(() => {
    isPatientValidRef.current = isPatientValid;
  }, [isPatientValid]);

  // =====================================
  // Submit
  // =====================================

  const handleSubmit = async () => {
    // =====================================
    // Validate Form
    // =====================================

    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      formik.setTouched(
        Object.keys(errors).reduce(
          (acc, key) => {
            acc[key] = true;

            return acc;
          },
          {} as Record<string, boolean>,
        ),
      );

      if (errors.patientId) {
        toast.error(errors.patientId as string);
      } else {
        toast.error("Please fill all required fields correctly.");
      }

      return;
    }

    // =====================================
    // Verify Patient
    // =====================================

    if (!isEdit && !isPatientValidRef.current) {
      toast.error("Please verify patient first");

      return;
    }

    // =====================================
    // Check Visit
    // =====================================

    if (!isEdit && !visitId) {
      toast.error("Visit not found. Please create a visit first.");

      return;
    }

    try {
      formik.setSubmitting(true);

      // ===================================
      // Build FormData (Both CREATE & EDIT)
      // ===================================

      const formData = new FormData();

      // Form Fields
      Object.entries(formik.values).forEach(([key, value]) => {
        if (
          key === "patientId" ||
          key === "haemoglobinReport" ||
          key === "creatinineReport"
        )
          return;
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });

      // Files
      if (selectedHaemoglobinReport) {
        formData.append("haemoglobinReport", selectedHaemoglobinReport);
      }
      if (selectedCreatinineReport) {
        formData.append("creatinineReport", selectedCreatinineReport);
      }

      // ===================================
      // API
      // ===================================

      const response = await axios.post(
        `/api/patients/visits/${visitId}/clinical-status`,
        formData,
      );

      if (isEdit) {
        toast.success(
          response.data.message || "Clinical Status updated successfully",
        );
        router.push(`/patients/${patientId || formik.values.patientId}`);
        router.refresh();
        return;
      } else {
        toast.success(response.data.message);
      }

      router.push(`/forms/bodily-wellness?patientId=${formik.values.patientId}`);
      router.refresh();

      // ===================================
      // Reset
      // ===================================

      formik.resetForm();

      resetPatientVisit();

      setSelectedHaemoglobinReport(null);

      setSelectedCreatinineReport(null);

      isPatientValidRef.current = false;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      formik.setSubmitting(false);
    }
  };

  // =====================================
  // Calculate BMI
  // =====================================

  useEffect(() => {
    const weight = Number(formik.values.weight);

    const height = Number(formik.values.height);

    if (weight > 0 && height > 0) {
      const bmi = (weight / Math.pow(height / 100, 2)).toFixed(2);

      formik.setFieldValue("bmi", bmi);
    } else {
      formik.setFieldValue("bmi", "");
    }
  }, [formik.values.weight, formik.values.height, formik.setFieldValue]);

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
          Clinical Status
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

      <form
        onSubmit={(e) => {
          e.preventDefault();

          void handleSubmit();
        }}
        className="space-y-8"
      >
        {/* ================================
            PATIENT / VISIT INFORMATION
        ================================= */}

        <PatientVisitHeader
          patientId={formik.values.patientId}
          visitNumber={visitNumber}
          patientName={patientName}
          isVerifying={isVerifying}
          patientIdDisabled={isEdit || !!patientIdFromUrl}
          onPatientIdChange={formik.handleChange}
          onPatientIdBlur={
            !isEdit && !patientIdFromUrl ? handlePatientBlur : undefined
          }
        />

        {/* Patient ID Validation */}

        {formik.touched.patientId && formik.errors.patientId && (
          <p className="text-sm text-red-500">{formik.errors.patientId}</p>
        )}

        {/* ================================
            CLINICAL STATUS FIELDS
        ================================= */}

        <FormGrid
          fields={clinicalStatusFields}
          formik={formik}
          files={{
            haemoglobinReport: selectedHaemoglobinReport,

            creatinineReport: selectedCreatinineReport,
          }}
          onFileSelect={(fieldName, file) => {
            if (fieldName === "haemoglobinReport") {
              setSelectedHaemoglobinReport(file);
            }

            if (fieldName === "creatinineReport") {
              setSelectedCreatinineReport(file);
            }
          }}
        />

        {/* ================================
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
