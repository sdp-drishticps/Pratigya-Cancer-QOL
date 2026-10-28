import { FormFieldConfig } from "@/components/forms/shared/FormField";

// =====================================
// Q242–Q244 – Context (dialect & speaker)
// =====================================

export const narrativeContextFields: FormFieldConfig[] = [
  {
    // Q242
    name: "dialect",
    label: "Dialect spoken",
    type: "select",
    placeholder: "Select dialect",
    required: true,
    options: [
      "Bundelkhandi",
      "Malwa (Malwi)",
      "Tribal Madhya Pradesh dialect",
      "Standard Hindi",
      "Other",
    ],
  },
  {
    // Q243
    name: "dialect_other",
    label: "Specify dialect",
    type: "text",
    placeholder: "Please specify the dialect",
    showWhen: (v) => v.dialect === "Other",
  },
  {
    // Q244
    name: "speaker",
    label: "Who is speaking",
    type: "select",
    placeholder: "Select speaker",
    options: [
      "The patient",
      "A caregiver on the patient's behalf",
      "Patient and caregiver together",
    ],
  },
];

// =====================================
// Q245–Q252 – Open narrative questions
// =====================================

export const narrativeOpenFields: FormFieldConfig[] = [
  {
    // Q245
    name: "health_since_last_visit",
    label: "How has your health and daily life been since the last visit?",
    type: "textarea",
    placeholder: "Record the patient's response…",
  },
  {
    // Q246
    name: "most_trouble",
    label: "What troubles you the most right now?",
    type: "textarea",
    placeholder: "Record the patient's response…",
  },
  {
    // Q247
    name: "difficult_tasks",
    label: "Which of your usual daily tasks have become difficult?",
    type: "textarea",
    placeholder: "Record the patient's response…",
  },
  {
    // Q248
    name: "family_impact",
    label: "How has your illness affected your family and your home?",
    type: "textarea",
    placeholder: "Record the patient's response…",
  },
  {
    // Q249
    name: "treatment_cost",
    label: "How are you managing the cost of the treatment?",
    type: "textarea",
    placeholder: "Record the patient's response…",
  },
  {
    // Q250
    name: "support",
    label: "Who supports you, and what support do you still need?",
    type: "textarea",
    placeholder: "Record the patient's response…",
  },
  {
    // Q251
    name: "future_hopes_worries",
    label: "What are you hoping for, and what worries you about the future?",
    type: "textarea",
    placeholder: "Record the patient's response…",
  },
  {
    // Q252
    name: "anything_else",
    label:
      "Is there anything you want to tell the doctor that nobody has asked you?",
    type: "textarea",
    placeholder: "Record the patient's response…",
  },
];

// =====================================
// Q253–Q257 – Clinician summary fields
// =====================================

export const NARRATIVE_THEMES = [
  "Pain",
  "Fatigue",
  "Eating and swallowing",
  "Sleep",
  "Breathlessness",
  "Appearance and body changes",
  "Fear of recurrence",
  "Fear of dying",
  "Money and debt",
  "Loss of work or income",
  "Travel to hospital",
  "Being a burden",
  "Loneliness",
  "Family relationships",
  "Faith and meaning",
  "Not understanding the illness",
  "Wanting to stop treatment",
  "Hope",
] as const;

export const narrativeSummaryFields: FormFieldConfig[] = [
  {
    // Q253
    name: "keywords",
    label: "Key words from the transcript",
    type: "textarea",
    placeholder: "Enter key words…",
  },
  {
    // Q254
    name: "themes",
    label: "Themes raised",
    type: "multiselect",
    placeholder: "Select all that apply",
    options: [...NARRATIVE_THEMES],
  },
  {
    // Q255
    name: "support_terms",
    label: "Support terms",
    type: "textarea",
    placeholder: "Enter support terms…",
  },
  {
    // Q256
    name: "most_important_sentence",
    label: "Most important sentence, in the patient's own words",
    type: "textarea",
    placeholder: "Enter the sentence…",
  },
  {
    // Q257
    name: "narrative_vs_scores",
    label: "Does the narrative match the scores?",
    type: "select",
    placeholder: "Select",
    options: [
      "Yes",
      "Narrative is worse than the scores",
      "Narrative is better than the scores",
      "Cannot judge",
    ],
  },
];
