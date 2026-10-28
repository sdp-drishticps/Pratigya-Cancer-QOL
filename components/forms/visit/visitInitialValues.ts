export const visitInitialValues = {
  // Patient
  patientId: "",

  // Visit
  visitDate: new Date().toISOString().split("T")[0],

  phaseOfCare: "",

  // Date of Diagnosis — used to auto-calculate monthsSinceDiagnosis
  diagnosisDate: "",

  monthsSinceDiagnosis: "",

  biopsyReport: {
    fileName: "",
    filePath: "",
  },

  stageAtDiagnosis: "",
  extent: "",

  treatmentReceived: [],
  treatmentStatus: "",

  treatmentCompletionDate: "",

  diseaseStatus: "",
  recurrenceDate: "",

  clinicalReport: {
    fileName: "",
    filePath: "",
  },

  ptnmStaging: "",
  durationOfSurvival: "",

  tobaccoUse: "",
  tobaccoType: "",

  oralCavityPhoto: {
    fileName: "",
    filePath: "",
  },

  partnerTobaccoUse: "",
  alcoholUse: "",

  respondent: "",

  consent: false,
};
