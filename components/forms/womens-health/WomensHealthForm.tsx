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

import { womensHealthInitialValues } from "./womensHealthInitialValues";
import { womensHealthSchema } from "./womensHealthSchema";
import {
  menstrualHistoryFields,
  gynecologicHistoryFields,
  obstetricFertilityFields,
  cervicalHpvFields,
  breastHealthFields,
  boneHealthFields,
  bloodCountFields,
  preventiveHealthFields,
  alarmingSignsFields,
  postmenopausalChecklistFields,
} from "./womensHealthQuestions";

// =====================================
// Combine all main fields in one flat list
// =====================================

const allFields = [
  ...menstrualHistoryFields,
  ...gynecologicHistoryFields,
  ...obstetricFertilityFields,
  ...cervicalHpvFields,
  ...breastHealthFields,
  ...boneHealthFields,
  ...bloodCountFields,
  ...preventiveHealthFields,
  ...alarmingSignsFields,
] as const;

// =====================================
// Props
// =====================================

interface WomensHealthFormProps {
  patientId?: string;
  isEdit?: boolean;
  initialValues?: typeof womensHealthInitialValues;
}

// =====================================
// Component
// =====================================

export default function WomensHealthForm({
  patientId,
  isEdit = false,
  initialValues,
}: WomensHealthFormProps) {
  const router = useRouter();
  const isPatientValidRef = useRef(false);

  // =====================================
  // Formik
  // =====================================

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      ...womensHealthInitialValues,
      ...(initialValues ?? {}),
      patientId: patientId ?? "",
    },

    validationSchema: womensHealthSchema,

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
  // Postmenopausal Detection
  // =====================================

  const isPostmenopausal =
    (formik.values.menopause_age !== "" &&
      formik.values.menopause_age !== "0") ||
    formik.values.menses_frequency === "Not applicable / Postmenopausal";

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
          `/api/patients/visits/${visitId}/womens-health`,
          formik.values,
        );
        toast.success("Women's Health updated successfully");
        router.push(`/patients/${patientId || formik.values.patientId}`);
        router.refresh();
        return;
      }

      const response = await axios.post(
        `/api/patients/visits/${visitId}/womens-health`,
        formik.values,
      );

      toast.success(response.data.message);

      router.push(`/forms/patient-narrative?patientId=${formik.values.patientId}`);
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
          Women&apos;s Health
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
            POSTMENOPAUSAL CHECKLIST
            (shown only when postmenopausal)
        ================================= */}

        {isPostmenopausal && (
          <FormGrid
            fields={postmenopausalChecklistFields as any}
            formik={formik}
          />
        )}

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
