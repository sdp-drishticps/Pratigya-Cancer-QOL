"use client";

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import PatientVisitHeader from "@/components/forms/shared/PatientVisitHeader";
import { usePatientVisit } from "@/components/forms/shared/usePatientVisit";
import FormGrid from "@/components/forms/shared/FormGrid";

import { visitInitialValues } from "./visitInitialValues";
import { visitSchema } from "./visitSchema";
import { visitFields } from "./visitFields";

import { LuLayoutDashboard } from "react-icons/lu";
import { Button } from "@/components/ui/button";

interface VisitFormProps {
  initialValues?: typeof visitInitialValues;
  patientId?: string;
  isEdit?: boolean;
}

export default function VisitForm({
  initialValues,
  patientId,
  isEdit = false,
}: VisitFormProps) {
  const router = useRouter();

  // =====================================
  // File States
  // =====================================

  const [selectedBiopsyReport, setSelectedBiopsyReport] = useState<File | null>(
    null,
  );

  const [selectedClinicalReport, setSelectedClinicalReport] =
    useState<File | null>(null);

  const [selectedOralCavityPhoto, setSelectedOralCavityPhoto] =
    useState<File | null>(null);

  // =====================================
  // Formik
  // =====================================

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      ...visitInitialValues,
      ...(initialValues ?? {}),
      patientId: patientId ?? "",
    },

    validationSchema: visitSchema,

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

  const { setFieldValue } = formik;


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

      // Show appropriate error toast
      if (errors.patientId) {
        toast.error(errors.patientId as string);
      } else {
        toast.error("Please fill all required fields correctly.");
      }

      return;
    }

    // ===================================
    // Verify Patient
    // ===================================

    if (!isEdit && !isPatientValid) {
      toast.error("Please verify patient first");

      return;
    }

    try {
      formik.setSubmitting(true);

      // ===================================
      // EDIT
      // ===================================

      if (isEdit) {
        if (!visitId) {
          toast.error("Visit ID not found");
          formik.setSubmitting(false);
          return;
        }

        const editFormData = new FormData();

        Object.entries(formik.values).forEach(([key, value]) => {
          if (
            key === "biopsyReport" ||
            key === "clinicalReport" ||
            key === "oralCavityPhoto"
          ) {
            return;
          }
          if (Array.isArray(value)) {
            editFormData.append(key, JSON.stringify(value));
            return;
          }
          editFormData.append(key, String(value ?? ""));
        });

        if (selectedBiopsyReport) {
          editFormData.append("biopsyReport", selectedBiopsyReport);
        }
        if (selectedClinicalReport) {
          editFormData.append("clinicalReport", selectedClinicalReport);
        }
        if (selectedOralCavityPhoto) {
          editFormData.append("oralCavityPhoto", selectedOralCavityPhoto);
        }

        await axios.put(`/api/patients/visits/${visitId}`, editFormData);

        toast.success("Visit updated successfully");

        router.push(`/patients/${formik.values.patientId}`);
        router.refresh();

        return;
      }

      // ===================================
      // CREATE NEW
      // ===================================

      const formData = new FormData();
      formData.append("patientUniqueId", formik.values.patientId);

      const dataObj: any = { ...formik.values };

      Object.entries(dataObj).forEach(([key, value]) => {
        if (
          key === "biopsyReport" ||
          key === "clinicalReport" ||
          key === "oralCavityPhoto" ||
          key === "patientId"
        ) {
          return;
        }
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
          return;
        }
        formData.append(key, String(value ?? ""));
      });

      if (selectedBiopsyReport) {
        formData.append("biopsyReport", selectedBiopsyReport);
      }
      if (selectedClinicalReport) {
        formData.append("clinicalReport", selectedClinicalReport);
      }
      if (selectedOralCavityPhoto) {
        formData.append("oralCavityPhoto", selectedOralCavityPhoto);
      }

      const response = await axios.post("/api/patients/visits", formData);

      toast.success(response.data.message || "Visit created successfully");

      // ===================================
      // Redirect
      // ===================================

      router.push(`/forms/clinical-status?patientId=${formik.values.patientId}`);

      router.refresh();

      // ===================================
      // Reset
      // ===================================

      formik.resetForm();

      setSelectedBiopsyReport(null);
      setSelectedClinicalReport(null);
      setSelectedOralCavityPhoto(null);

      resetPatientVisit();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      formik.setSubmitting(false);
    }
  };

  // =====================================
  // Auto-calculate Months Since Diagnosis
  // =====================================

  useEffect(() => {
    const diagDate = formik.values.diagnosisDate;

    if (!diagDate) {
      setFieldValue("monthsSinceDiagnosis", "");

      return;
    }

    const diagnosis = new Date(diagDate);

    if (Number.isNaN(diagnosis.getTime())) {
      setFieldValue("monthsSinceDiagnosis", "");

      return;
    }

    const today = new Date();

    const months =
      (today.getFullYear() - diagnosis.getFullYear()) * 12 +
      (today.getMonth() - diagnosis.getMonth());

    setFieldValue(
      "monthsSinceDiagnosis",
      months >= 0 ? String(months) : "",
    );
  }, [formik.values.diagnosisDate, setFieldValue]);

  // =====================================
  // Clear Treatment Completion Date
  // =====================================

  useEffect(() => {
    if (formik.values.phaseOfCare !== "Treatment completed") {
      setFieldValue("treatmentCompletionDate", "");
    }
  }, [formik.values.phaseOfCare, setFieldValue]);


  // =====================================
  // File Select
  // =====================================

  const handleFileSelect = (fieldName: string, file: File) => {
    if (fieldName === "biopsyReport") {
      setSelectedBiopsyReport(file);
      formik.setFieldValue("biopsyReport", { fileName: file.name, filePath: "" });
    }

    if (fieldName === "clinicalReport") {
      setSelectedClinicalReport(file);
      formik.setFieldValue("clinicalReport", { fileName: file.name, filePath: "" });
    }

    if (fieldName === "oralCavityPhoto") {
      setSelectedOralCavityPhoto(file);
      formik.setFieldValue("oralCavityPhoto", { fileName: file.name, filePath: "" });
    }
  };

  const files = {
    biopsyReport: selectedBiopsyReport,
    clinicalReport: selectedClinicalReport,
    oralCavityPhoto: selectedOralCavityPhoto,
  };

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
          Visit Details
        </h1>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/dashboard')}
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

        {/* ================================
            PATIENT ID VALIDATION
        ================================= */}

        {formik.touched.patientId && formik.errors.patientId && (
          <p className="text-sm text-red-500">{formik.errors.patientId}</p>
        )}

        {/* ================================
            VISIT FIELDS
        ================================= */}

        <FormGrid
          fields={visitFields}
          formik={formik}
          files={files}
          onFileSelect={(fieldName, file) => {
            handleFileSelect(fieldName, file);
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
