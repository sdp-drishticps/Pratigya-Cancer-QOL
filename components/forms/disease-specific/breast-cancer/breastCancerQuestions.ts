const YES_NO = ["Yes", "No"] as const;

// =====================================
// Breast Cancer Questions
// =====================================

export const breastCancerFields = [
  // Disease-Specific QoL
  {
    name: "arm_shoulder_pain",
    label: "Pain/discomfort in arm, shoulder, or chest?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "swelling",
    label: "Swelling in arm, shoulder, or chest?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "difficulty_raising_arm",
    label: "Difficult to raise arm/move freely?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "skin_changes",
    label: "Skin changes (dryness, itching, etc.)?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "difficulty_sleeping",
    label: "Difficult to sleep due to pain/swelling?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "difficulty_carrying",
    label: "Difficulty carrying household loads?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "hesitation_clothes",
    label: "Hesitated to wear clothes due to changes?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "relationship_closeness",
    label: "Closeness affected with partner?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
  {
    name: "uneasy_social",
    label: "Embarrassed in social gatherings?",
    type: "select",
    placeholder: "Select",
    options: [...YES_NO],
  },
];
