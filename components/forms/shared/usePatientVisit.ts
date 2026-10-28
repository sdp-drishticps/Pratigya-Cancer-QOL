/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";

import {
  getCurrentVisit as fetchCurrentVisit,
  verifyPatientRequest,
} from "./patientVisitHelpers";

interface UsePatientVisitProps {
  formik: any;
  isEdit?: boolean;
}

export function usePatientVisit({
  formik,
  isEdit = false,
}: UsePatientVisitProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // =====================================
  // URL Parameters
  // =====================================

  const patientIdFromUrl = searchParams.get("patientId");
  const visitNumberFromUrl = searchParams.get("visitNumber");

  // =====================================
  // State
  // =====================================

  const [patientName, setPatientName] = useState<string>("");
  const [visitNumber, setVisitNumber] = useState<string>("");
  const [visitId, setVisitId] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isPatientValid, setIsPatientValid] = useState<boolean>(false);

  // =====================================
  // Get Current Visit
  // =====================================

  const getCurrentVisit = async (patientId: string, showError = true) => {
    return fetchCurrentVisit(patientId, setVisitNumber, setVisitId, showError);
  };

  // =====================================
  // Verify Patient
  // =====================================

  const verifyPatient = async (id: string, showToast = true) => {
    setIsVerifying(true);

    await verifyPatientRequest(id, {
      visitNumberFromUrl,
      pathname,
      searchParams: searchParams as unknown as URLSearchParams,
      isEdit,
      showToast,
      formik,
      setPatientName,
      setVisitNumber,
      setVisitId,
      setIsPatientValid,
      setIsVerifying,
    });
  };

  // =====================================
  // Patient ID Blur
  // =====================================

  const handlePatientBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    formik.handleBlur(e);

    const id = e.target.value.trim();

    if (!id) {
      setPatientName("");
      setVisitNumber("");
      setVisitId("");
      setIsPatientValid(false);
      return;
    }

    await verifyPatient(id);
  };

  // =====================================
  // Initial Patient Verification
  // =====================================

  useEffect(() => {
    const initialId = patientIdFromUrl || formik.values.patientId;

    if (!initialId) return;

    if (patientIdFromUrl && formik.values.patientId !== patientIdFromUrl) {
      formik.setFieldValue("patientId", patientIdFromUrl);
    }

    void verifyPatient(initialId, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientIdFromUrl, isEdit]);

  // =====================================
  // Reset Patient / Visit
  // =====================================

  const resetPatientVisit = () => {
    setPatientName("");
    setVisitNumber("");
    setVisitId("");
    setIsPatientValid(false);
    setIsVerifying(false);
  };

  // =====================================
  // Return
  // =====================================

  return {
    // URL
    patientIdFromUrl,
    visitNumberFromUrl,

    // Patient
    patientName,
    isPatientValid,
    isVerifying,

    // Visit
    visitNumber,
    visitId,

    // Functions
    verifyPatient,
    getCurrentVisit,
    handlePatientBlur,
    resetPatientVisit,
  };
}
