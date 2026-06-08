export type Language = "en" | "pt" | "es";
export type LocalizedText = Record<Language, string>;
export type VideoAspectRatio = "horizontal" | "vertical" | "16:9" | "9:16" | "square" | "1:1";

export interface ToolItem {
  name: string;
  badge: string;
  icon: string;
}

export interface SiteContent {
  name: string;
  brandName: string;
  heroLabel: LocalizedText;
  headline: LocalizedText;
  subtitle: LocalizedText;
  heroWords: Record<Language, string[]>;
  nav: Record<Language, Record<string, string>>;
  sectionEyebrows: Record<Language, Record<string, string>>;
  scrollLabel: LocalizedText;
  aboutTitle: LocalizedText;
  aboutText: LocalizedText;
  toolsTitle: LocalizedText;
  toolStatus: LocalizedText;
  tools: ToolItem[];
  workspaceTitle: LocalizedText;
  workspaceLabels: Record<Language, string[]>;
  longFormTitle: LocalizedText;
  longFormDescription: LocalizedText;
  shortsTitle: LocalizedText;
  shortsDescription: LocalizedText;
  motionDesignTitle: LocalizedText;
  motionDesignDescription: LocalizedText;
  faqTitle: LocalizedText;
  faqDescription: LocalizedText;
  contactBadge: LocalizedText;
  contactTitle: LocalizedText;
  contactDescription: LocalizedText;
  footerText: LocalizedText;
  languageLabels: Record<Language, string>;
}

export interface VideoItem {
  id: string;
  youtube: string;
  title: LocalizedText;
  category: LocalizedText;
  kind?: "long" | "short" | "motion";
  aspectRatio: VideoAspectRatio;
  thumbnail?: string;
  active: boolean;
  order: number;
}

export interface SocialItem {
  id: string;
  label: string;
  url: string;
  active: boolean;
}

export interface FAQItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
  active: boolean;
  order: number;
}
