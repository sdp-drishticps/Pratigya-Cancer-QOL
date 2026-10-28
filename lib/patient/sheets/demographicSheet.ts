import { joinArray, ExportPatient } from "./exportTypes";

// ============================================================
// SHEET 1 — DEMOGRAPHIC DETAILS
// 1 row per patient
// ============================================================

export const buildDemographicRows = (patients: ExportPatient[]) =>
  patients.map((p) => ({
    "Patient ID": p.patientUniqueId,
    "Full Name": p.demographicDetails?.fullName ?? "",
    "CR No": p.demographicDetails?.crNo ?? "",
    "Date of Birth": p.demographicDetails?.dateOfBirth ?? "",
    Age: p.demographicDetails?.age ?? "",
    Sex: p.demographicDetails?.sex ?? "",
    "Marital Status": p.demographicDetails?.maritalStatus ?? "",
    "Village / Town / City": p.demographicDetails?.villageTownCity ?? "",
    "Block / Tehsil": p.demographicDetails?.blockTehsil ?? "",
    District: p.demographicDetails?.district ?? "",
    State: p.demographicDetails?.state ?? "",
    "Pin Code": p.demographicDetails?.pinCode ?? "",
    Settlement: p.demographicDetails?.settlement ?? "",
    "Distance To Hospital (km)": p.demographicDetails?.distanceToHospital ?? "",
    Education: p.demographicDetails?.education ?? "",
    Occupation: p.demographicDetails?.occupation ?? "",
    "Other Occupation": p.demographicDetails?.otherOccupation ?? "",
    "Monthly Family Income": p.demographicDetails?.monthlyFamilyIncome ?? "",
    "Main Caregiver": p.demographicDetails?.mainCaregiver ?? "",
    "Cancer Type": joinArray(p.demographicDetails?.cancerType),
    "Other Cancer Type": p.demographicDetails?.otherCancerType ?? "",
  }));
