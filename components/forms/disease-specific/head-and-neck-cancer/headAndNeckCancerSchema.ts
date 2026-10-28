import * as Yup from "yup";

export const headAndNeckCancerSchema = Yup.object().shape({
  pain: Yup.string(),
  difficulty_chewing_swallowing: Yup.string(),
  choking_coughing: Yup.string(),
  voice_changes: Yup.string(),
  wounds_ulcers: Yup.string(),
  taste_changes: Yup.string(),
  appearance_distress: Yup.string(),
  embarrassed_tube: Yup.string(),
  uncomfortable_eating_out: Yup.string(),
  smell_avoidance: Yup.string(),
  self_blame: Yup.string(),
});
