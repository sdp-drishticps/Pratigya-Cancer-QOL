const YES_NO = ["Yes", "No"] as const;

// =====================================
// Head and Neck Cancer Questions
// =====================================

export const headAndNeckCancerFields = [
  // Quality of Life
  {
    name: "pain",
    label: "Pain in mouth, throat or face?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "difficulty_chewing_swallowing",
    label: "Difficult to chew or swallow food?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "choking_coughing",
    label: "Choking/coughing while eating/drinking?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "voice_changes",
    label: "Hoarseness or change in voice?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "wounds_ulcers",
    label: "Discomfort from wounds or ulcers?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "taste_changes",
    label: "Change in your sense of taste?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "appearance_distress",
    label: "Distressed by changes in appearance?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "embarrassed_tube",
    label: "Uncomfortable due to having a tube?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "uncomfortable_eating_out",
    label: "Uncomfortable eating out with others?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "smell_avoidance",
    label: "Smell caused social avoidance?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "self_blame",
    label: "Blamed yourself due to lifestyle/habits?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
];
