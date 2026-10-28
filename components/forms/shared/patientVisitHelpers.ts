/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import axios from "axios";
import toast from "react-hot-toast";

import {
  routeToKey,
  sectionSequence,
  detectCurrentSection,
} from "./sequentialOrderConfig";

// =====================================
// Get Current / Latest Visit
// =====================================

export async function getCurrentVisit(
  patientId: string,
  setVisitNumber: (v: string) => void,
  setVisitId: (v: string) => void,
  showError = true,
) {
  try {
    const response = await axios.get("/api/patients/visits/current", {
      params: { patientId },
    });

    const data = response.data;

    // No Visit Found
    if (!data.hasVisit || !data.visit) {
      setVisitNumber("");
      setVisitId("");
      return null;
    }

    // Visit Found
    const currentVisit = data.visit;
    setVisitId(String(currentVisit._id));
    setVisitNumber(String(currentVisit.visitNumber));

    return currentVisit;
  } catch (error: any) {
    setVisitNumber("");
    setVisitId("");

    if (showError) {
      toast.error(
        error?.response?.data?.message || "Unable to get patient visit",
      );
    }

    return null;
  }
}

// =====================================
// Check Sequential Order
// Returns null if ok, or an error message string
// =====================================

export function checkSequentialOrder(
  resolvedVisit: any,
  currentSection: string,
  patient?: any,
): string | null {
  const sectionStatus = resolvedVisit.sectionStatus ?? {};
  const diseaseSpecificStatus = (sectionStatus.diseaseSpecific ?? {}) as Record<
    string,
    boolean
  >;

  // -----------------------------------------------------------------------
  // Disease-specific section names → their nested sectionStatus key
  // -----------------------------------------------------------------------
  const diseaseSpecificKeyMap: Record<string, string> = {
    "cervical-cancer": "cervicalCancer",
    "breast-cancer": "breastCancer",
    "head-and-neck-cancer": "headAndNeckCancer",
  };

  // 1. Already filled? — disease-specific forms use a nested status path
  if (diseaseSpecificKeyMap[currentSection]) {
    const dsKey = diseaseSpecificKeyMap[currentSection];
    if (diseaseSpecificStatus[dsKey] === true) {
      return "You have already filled this form. Please go to Patient Details to update it.";
    }
  } else {
    // Normal (flat) sections
    const currentKey = routeToKey[currentSection];
    if (currentKey && sectionStatus[currentKey] === true) {
      return "You have already filled this form. Please go to Patient Details to update it.";
    }
  }

  // 2. Special case: womens-health requires disease-specific form FIRST
  //    when the patient has a relevant cancer type.
  if (currentSection === "womens-health" && patient) {
    const cancerTypes: string[] = Array.isArray(
      patient.demographicDetails?.cancerType,
    )
      ? patient.demographicDetails.cancerType
      : patient.demographicDetails?.cancerType
        ? [patient.demographicDetails.cancerType]
        : [];

    if (cancerTypes.includes("Cervical Cancer")) {
      if (!diseaseSpecificStatus.cervicalCancer) {
        return "Please fill out Cervical Cancer (Disease-Specific) form first.";
      }
      return null; // disease-specific done → allow womens-health
    }

    if (cancerTypes.includes("Breast Cancer")) {
      if (!diseaseSpecificStatus.breastCancer) {
        return "Please fill out Breast Cancer (Disease-Specific) form first.";
      }
      return null;
    }

    if (cancerTypes.includes("Head and Neck Cancer")) {
      if (!diseaseSpecificStatus.headAndNeckCancer) {
        return "Please fill out Head and Neck Cancer (Disease-Specific) form first.";
      }
      return null;
    }

    // No disease-specific applicable — fall through to normal financial wellness check
  }

  // 2b. Special case: patient-narrative requires womens-health ONLY for female patients
  if (currentSection === "patient-narrative" && patient) {
    const sex = patient.demographicDetails?.sex;

    if (sex === "Female" && sectionStatus.womensHealth !== true) {
      return "Please fill out Women's Health form first.";
    }

    // Non-female patients: skip womensHealth check — fall through to financialWellness check below
  }

  // 3. Previous section filled? (use backend boolean flag)
  const matchedSection = sectionSequence.find(
    (s) => s.route === currentSection,
  );

  if (matchedSection && sectionStatus[matchedSection.requiredPrev] !== true) {
    return `Please fill out ${matchedSection.requiredPrevTitle} first.`;
  }

  return null;
}

// =====================================
// Verify Patient
// =====================================

export async function verifyPatientRequest(
  id: string,
  options: {
    visitNumberFromUrl: string | null;
    pathname: string;
    searchParams: URLSearchParams;
    isEdit: boolean;
    showToast: boolean;
    formik: any;
    setPatientName: (v: string) => void;
    setVisitNumber: (v: string) => void;
    setVisitId: (v: string) => void;
    setIsPatientValid: (v: boolean) => void;
    setIsVerifying: (v: boolean) => void;
  },
) {
  const {
    visitNumberFromUrl,
    pathname,
    searchParams,
    isEdit,
    showToast,
    formik,
    setPatientName,
    setVisitNumber,
    setVisitId,
    setIsPatientValid,
    setIsVerifying,
  } = options;

  try {
    const response = await axios.get(`/api/patients/${id}`);
    const patient = response.data.patient;

    // =====================================
    // Gender Check for Women's Health
    // =====================================
    if (
      pathname.includes("womens-health") &&
      patient.demographicDetails?.sex !== "Female"
    ) {
      toast.error("This form is only applicable for female patients.");
      setPatientName("");
      setVisitNumber("");
      setVisitId("");
      setIsPatientValid(false);
      return;
    }

    // =====================================
    // Cancer Type Check for Disease-Specific Forms
    // =====================================
    if (pathname.includes("disease-specific")) {
      const cancerTypes: string[] =
        patient.demographicDetails?.cancerType || [];
      let requiredCancerType = "";

      if (pathname.includes("cervical-cancer"))
        requiredCancerType = "Cervical Cancer";
      if (pathname.includes("breast-cancer"))
        requiredCancerType = "Breast Cancer";
      if (pathname.includes("head-and-neck-cancer"))
        requiredCancerType = "Head and Neck Cancer";

      if (requiredCancerType && !cancerTypes.includes(requiredCancerType)) {
        toast.error(
          `This form is only for patients with ${requiredCancerType}.`,
        );
        setPatientName("");
        setVisitNumber("");
        setVisitId("");
        setIsPatientValid(false);
        return;
      }
    }

    // Patient Name
    setPatientName(patient.demographicDetails?.fullName || "");

    // Patient Valid
    setIsPatientValid(true);

    // All Visits
    const visits = patient.clinicalVisits || [];
    let resolvedVisit: any = null;

    if (visitNumberFromUrl) {
      const selectedVisit = visits.find(
        (visit: any) =>
          String(visit.visitNumber) === String(visitNumberFromUrl),
      );

      if (!selectedVisit) {
        setVisitNumber("");
        setVisitId("");
        toast.error(`Visit ${visitNumberFromUrl} not found`);
        return;
      }

      resolvedVisit = selectedVisit;
      setVisitNumber(String(selectedVisit.visitNumber));
      setVisitId(String(selectedVisit._id));
    } else {
      const latestVisit = patient.clinicalVisits?.[0];

      if (latestVisit) {
        resolvedVisit = latestVisit;
        setVisitNumber(String(latestVisit.visitNumber));
        setVisitId(String(latestVisit._id));
      } else {
        setVisitNumber("");
        setVisitId("");
      }
    }

    // Enforce Sequential Order (only on create, not edit)
    if (resolvedVisit && !isEdit) {
      let currentSection = searchParams.get("section");

      if (!currentSection) {
        currentSection = detectCurrentSection(pathname);
      }

      if (currentSection) {
        const errorMessage = checkSequentialOrder(
          resolvedVisit,
          currentSection,
          patient,
        );

        if (errorMessage) {
          setPatientName("");
          setVisitNumber("");
          setVisitId("");
          setIsPatientValid(false);
          formik.setFieldValue("patientId", "");
          toast.error(errorMessage);
          setIsVerifying(false);
          return;
        }
      }
    }

    // Success
    if (showToast) {
      toast.success("Patient verified");
    }
  } catch (error: any) {
    setPatientName("");
    setVisitNumber("");
    setVisitId("");
    setIsPatientValid(false);

    toast.error(error?.response?.data?.message || "Patient not found");
  } finally {
    setIsVerifying(false);
  }
}
