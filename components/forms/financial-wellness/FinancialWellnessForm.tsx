/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import { LuLayoutDashboard } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import QuestionSlider from "@/components/ui/QuestionSlider";
import PatientVisitHeader from "@/components/forms/shared/PatientVisitHeader";
import { usePatientVisit } from "@/components/forms/shared/usePatientVisit";

import { financialWellnessInitialValues } from "./financialWellnessInitialValues";
import { financialWellnessQuestions } from "./financialWellnessQuestions";
import WellnessRatingScale from "@/components/forms/shared/WellnessRatingScale";

interface FinancialWellnessFormProps {
  initialValues?: typeof financialWellnessInitialValues;
  patientId?: string;
  isEdit?: boolean;
}

export default function FinancialWellnessForm({
  initialValues,
  patientId,
  isEdit = false,
}: FinancialWellnessFormProps) {
  const router = useRouter();

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
      ...financialWellnessInitialValues,
      ...(initialValues ?? {}),
      patientId: patientId ?? "",
    },

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
    // -------------------------------------
    // Verify Patient
    // -------------------------------------

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

      // ===================================
      // EDIT
      // ===================================

      if (isEdit) {
        await axios.post(`/api/patients/visits/${visitId}/financial-wellness`, formik.values);

        toast.success("Financial Wellness updated successfully");

        router.push(`/patients/${patientId || formik.values.patientId}`);

        router.refresh();

        return;
      }

      // ===================================
      // CREATE
      // ===================================

      const response = await axios.post(
        `/api/patients/visits/${visitId}/financial-wellness`,
        formik.values,
      );

      toast.success(response.data.message);

      // ===================================
      // Smart Navigation: check cancer type & gender
      // ===================================

      const pid = formik.values.patientId;
      let nextRoute = `/forms/patient-narrative?patientId=${pid}`; // fallback: patient narrative

      try {
        const patientRes = await axios.get(`/api/patients/${pid}`);
        const demographic = patientRes.data.patient?.demographicDetails || {};
        const cancerTypes: string[] = Array.isArray(demographic.cancerType)
          ? demographic.cancerType
          : demographic.cancerType ? [demographic.cancerType] : [];
        const isFemale = demographic.sex === "Female";

        // Disease-specific first (in priority order)
        if (cancerTypes.includes("Cervical Cancer")) {
          nextRoute = `/forms/disease-specific/cervical-cancer?patientId=${pid}`;
        } else if (cancerTypes.includes("Breast Cancer")) {
          nextRoute = `/forms/disease-specific/breast-cancer?patientId=${pid}`;
        } else if (cancerTypes.includes("Head and Neck Cancer")) {
          nextRoute = `/forms/disease-specific/head-and-neck-cancer?patientId=${pid}`;
        } else if (isFemale) {
          // No disease-specific form, but patient is female
          nextRoute = `/forms/womens-health?patientId=${pid}`;
        }
      } catch {
        // If lookup fails, fall back gracefully
      }

      router.push(nextRoute);

      router.refresh();

      // Reset Form
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
          Financial Wellness
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

        {/* Patient ID Validation */}

        {formik.touched.patientId && formik.errors.patientId && (
          <p className="text-sm text-red-500">{formik.errors.patientId}</p>
        )}

        {/* ================================
            FINANCIAL WELLNESS QUESTIONS
        ================================= */}

        <div className="space-y-5">
          <WellnessRatingScale />

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {financialWellnessQuestions.map((item) => (
              <QuestionSlider
                key={item.name}
                number={item.number}
                question={item.question}
                value={formik.values[item.name]}
                onChange={(value) => formik.setFieldValue(item.name, value)}
              />
            ))}
          </div>
        </div>

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
