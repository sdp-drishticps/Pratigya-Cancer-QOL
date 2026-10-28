/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import { LuLayoutDashboard } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import FormGrid from "@/components/forms/shared/FormGrid";
import PatientVisitHeader from "@/components/forms/shared/PatientVisitHeader";
import { usePatientVisit } from "@/components/forms/shared/usePatientVisit";

import { cervicalCancerInitialValues } from "./cervicalCancerInitialValues";
import { cervicalCancerSchema } from "./cervicalCancerSchema";
import { cervicalCancerFields } from "./cervicalCancerQuestions";

// =====================================
// Combine all main fields in one flat list
// =====================================

const allFields = [...cervicalCancerFields] as const;

// =====================================
// Props
// =====================================

interface CervicalCancerFormProps {
  patientId?: string;
  isEdit?: boolean;
  initialValues?: typeof cervicalCancerInitialValues;
}

// =====================================
// Component
// =====================================

export default function CervicalCancerForm({
  patientId,
  isEdit = false,
  initialValues,
}: CervicalCancerFormProps) {
  const router = useRouter();
  const isPatientValidRef = useRef(false);

  // =====================================
  // Formik
  // =====================================

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      ...cervicalCancerInitialValues,
      ...(initialValues ?? {}),
      patientId: patientId ?? "",
    },

    validationSchema: cervicalCancerSchema,

    onSubmit: async () => {
      // Handled by handleSubmit below
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
  } = usePatientVisit({ formik, isEdit });

  useEffect(() => {
    isPatientValidRef.current = isPatientValid;
  }, [isPatientValid]);

  // =====================================
  // Submit
  // =====================================

  const handleSubmit = async () => {
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

    if (!isEdit && !isPatientValidRef.current) {
      toast.error("Please verify patient first");
      return;
    }

    try {
      formik.setSubmitting(true);

      if (!visitId) {
        toast.error("Visit not found for this patient");
        formik.setSubmitting(false);
        return;
      }

      if (isEdit) {
        await axios.post(
          `/api/patients/visits/${visitId}/disease-specific/cervical-cancer`,
          formik.values,
        );
        toast.success("Cervical Cancer updated successfully");
        router.push(`/patients/${patientId || formik.values.patientId}`);
        router.refresh();
        return;
      }

      const response = await axios.post(
        `/api/patients/visits/${visitId}/disease-specific/cervical-cancer`,
        formik.values,
      );

      toast.success(response.data.message);

      // Route to next disease specific, or womens-health if female, else patient narrative
      const pid = formik.values.patientId;
      let nextRoute = `/forms/patient-narrative?patientId=${pid}`;
      try {
        const patientRes = await axios.get(`/api/patients/${pid}`);
        const demographic = patientRes.data.patient?.demographicDetails || {};
        const cancerTypes: string[] = Array.isArray(demographic.cancerType)
          ? demographic.cancerType
          : demographic.cancerType ? [demographic.cancerType] : [];
          
        if (cancerTypes.includes("Breast Cancer")) {
          nextRoute = `/forms/disease-specific/breast-cancer?patientId=${pid}`;
        } else if (cancerTypes.includes("Head and Neck Cancer")) {
          nextRoute = `/forms/disease-specific/head-and-neck-cancer?patientId=${pid}`;
        } else if (demographic.sex === "Female") {
          nextRoute = `/forms/womens-health?patientId=${pid}`;
        }
      } catch {
        /* fall back to patient narrative */
      }

      router.push(nextRoute);
      router.refresh();

      formik.resetForm();
      resetPatientVisit();
      isPatientValidRef.current = false;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      formik.setSubmitting(false);
    }
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
          Cervical Cancer
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

        {formik.touched.patientId && formik.errors.patientId && (
          <p className="text-sm text-red-500">{formik.errors.patientId}</p>
        )}

        {/* ================================
            WOMEN'S HEALTH FIELDS
        ================================= */}

        <FormGrid fields={allFields as any} formik={formik} />

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
