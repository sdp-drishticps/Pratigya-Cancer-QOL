// =====================================
// Sidebar — Menu Data for sidebar navigation
// =====================================

import {
  LuUsers,
  LuCalendarCheck,
  LuStethoscope,
  LuHeartPulse,
  LuActivity,
  LuBrain,
  LuUsersRound,
  LuBanknote,
  LuLandmark,
  LuRibbon,
  LuScanFace,
  LuHeart,
  LuHeartHandshake,
  LuScrollText,
} from "react-icons/lu";

export interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

export const menuItems: MenuItem[] = [
  {
    title: "Demographic Details",
    href: "/forms/demographic-details",
    icon: LuUsers,
  },
  {
    title: "Visit",
    href: "/forms/visit",
    icon: LuCalendarCheck,
  },
  {
    title: "Clinical Status",
    href: "/forms/clinical-status",
    icon: LuStethoscope,
  },
];

export const wellnessItems: MenuItem[] = [
  {
    title: "Bodily Wellness",
    href: "/forms/bodily-wellness",
    icon: LuHeartPulse,
  },
  {
    title: "Performance Wellness",
    href: "/forms/performance-wellness",
    icon: LuActivity,
  },
  {
    title: "Mental Wellness",
    href: "/forms/mental-wellness",
    icon: LuBrain,
  },
  {
    title: "Socio-Cultural Wellness",
    href: "/forms/socio-cultural-wellness",
    icon: LuUsersRound,
  },
  {
    title: "Spiritual Wellness",
    href: "/forms/spiritual-wellness",
    icon: LuLandmark,
  },
  {
    title: "Financial Wellness",
    href: "/forms/financial-wellness",
    icon: LuBanknote,
  },
];

export const diseaseSpecificItems: MenuItem[] = [
  {
    title: "Cervical Cancer",
    href: "/forms/disease-specific/cervical-cancer",
    icon: LuRibbon,
  },
  {
    title: "Breast Cancer",
    href: "/forms/disease-specific/breast-cancer",
    icon: LuHeart,
  },
  {
    title: "Head and Neck Cancer",
    href: "/forms/disease-specific/head-and-neck-cancer",
    icon: LuScanFace,
  },
];

export const otherFormsItems: MenuItem[] = [
  {
    title: "Women's Health",
    href: "/forms/womens-health",
    icon: LuHeartHandshake,
  },
  {
    title: "Patient Narrative",
    href: "/forms/patient-narrative",
    icon: LuScrollText,
  },
];
