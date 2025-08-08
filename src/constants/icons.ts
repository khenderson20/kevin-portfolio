/**
 * Icon Constants and Mappings
 * Separated from components to avoid Fast Refresh warnings
 */

// React Icons imports - organized by category
import {
  // Navigation & UI
  LuHouse,
  LuMusic,
  LuCode,
  LuUser,
  LuMail,
  LuMenu,
  LuX,
  LuExternalLink,
  LuGitBranch,
  LuTrendingUp,
  LuStar,
  LuSearch,
  LuLayers,
  LuSmartphone,
  LuDatabase,
  LuMapPin,
  LuPhone,
  LuLinkedin,
  LuGithub,
  LuFileText,
  LuCalendar,
  LuSend,
  LuCheck,
  LuMessageCircle,
} from 'react-icons/lu';

import {
  // Social & Brand icons
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaExternalLinkAlt,
  FaCode,
  FaCalendarAlt,
  FaFire,
} from 'react-icons/fa';

import {
  // Additional UI icons
  HiOutlineUser,
  HiOutlineDevicePhoneMobile,
} from 'react-icons/hi2';

// Icon categories for organized access
export const NavigationIcons = {
  home: LuHouse,
  music: LuMusic,
  development: LuCode,
  about: LuUser,
  contact: LuMail,
  menu: LuMenu,
  close: LuX,
} as const;

export const ProjectIcons = {
  external: LuExternalLink,
  github: LuGitBranch,
  stats: LuTrendingUp,
  star: LuStar,
  code: LuCode,
} as const;

export const DevelopmentIcons = {
  search: LuSearch,
  layers: LuLayers,
  mobile: LuSmartphone,
  database: LuDatabase,
  code: LuCode,
  user: HiOutlineUser,
  phone: HiOutlineDevicePhoneMobile,
} as const;

export const ContactIcons = {
  location: LuMapPin,
  phone: LuPhone,
  email: LuMail,
  linkedin: LuLinkedin,
  github: LuGithub,
  resume: LuFileText,
  calendar: LuCalendar,
  send: LuSend,
  success: LuCheck,
  error: LuX,
  message: LuMessageCircle,
} as const;

export const SocialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  download: FaDownload,
  external: FaExternalLinkAlt,
  code: FaCode,
  calendar: FaCalendarAlt,
  fire: FaFire,
} as const;

// Unified icon map for easy access
export const Icons = {
  ...NavigationIcons,
  ...ProjectIcons,
  ...DevelopmentIcons,
  ...ContactIcons,
  ...SocialIcons,
} as const;

// Type for icon names
export type IconName = keyof typeof Icons;

// Helper function to get icon component directly
export function getIcon(name: IconName) {
  return Icons[name] || null;
}
