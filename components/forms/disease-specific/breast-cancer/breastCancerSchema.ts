import * as Yup from "yup";

export const breastCancerSchema = Yup.object().shape({
  arm_shoulder_pain: Yup.string(),
  swelling: Yup.string(),
  difficulty_raising_arm: Yup.string(),
  skin_changes: Yup.string(),
  difficulty_sleeping: Yup.string(),
  difficulty_carrying: Yup.string(),
  hesitation_clothes: Yup.string(),
  relationship_closeness: Yup.string(),
  uneasy_social: Yup.string(),
});
