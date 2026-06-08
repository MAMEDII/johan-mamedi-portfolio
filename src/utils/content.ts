import type {
  FAQItem,
  Language,
  LocalizedText,
  SiteContent,
  SocialItem,
  VideoItem,
  VideoAspectRatio,
} from "../types/content";
import { extractYouTubeId } from "./youtube";

export const languages: Language[] = ["en", "pt", "es"];

export const localized = (
  value: Partial<LocalizedText> | undefined,
  language: Language,
  fallback = "",
): string => value?.[language] || value?.en || fallback;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const aspectRatios: VideoAspectRatio[] = ["horizontal", "vertical", "16:9", "9:16", "square", "1:1"];

const normalizeSourceAspect = (item: Record<string, unknown>): VideoAspectRatio => {
  if (aspectRatios.includes(item.aspectRatio as VideoAspectRatio)) return item.aspectRatio as VideoAspectRatio;
  const youtube = typeof item.youtube === "string" ? item.youtube.toLowerCase() : "";
  const category = typeof item.category === "string" ? item.category.toLowerCase() : "";
  if (youtube.includes("/shorts/") || category.includes("short")) return "vertical";
  return "horizontal";
};

const normalizeVideoKind = (item: Record<string, unknown>): VideoItem["kind"] => {
  if (item.kind === "long" || item.kind === "short" || item.kind === "motion") return item.kind;
  if (typeof item.category !== "string") return undefined;
  const category = item.category.toLowerCase();
  if (category === "longform" || category === "long-form" || category === "long") return "long";
  if (category === "shorts" || category === "short") return "short";
  if (category === "motion" || category === "motion-design") return "motion";
  return undefined;
};

export const isSiteContent = (value: unknown): value is SiteContent => {
  if (!isRecord(value)) return false;
  const heroWords = value.heroWords;
  const workspaceLabels = value.workspaceLabels;
  const nav = value.nav;
  const localizedKeys = [
    "heroLabel", "headline", "subtitle", "scrollLabel", "aboutTitle", "aboutText", "toolsTitle", "toolStatus",
    "workspaceTitle", "longFormTitle", "longFormDescription", "shortsTitle",
    "shortsDescription", "motionDesignTitle", "motionDesignDescription",
    "faqTitle", "faqDescription", "contactBadge",
    "contactTitle", "contactDescription", "footerText",
  ];
  const validLocalized = localizedKeys.every((key) => isRecord(value[key]));
  const validTools =
    Array.isArray(value.tools) &&
    value.tools.every(
      (tool) =>
        isRecord(tool) &&
        typeof tool.name === "string" &&
        typeof tool.badge === "string" &&
        typeof tool.icon === "string",
    );
  const validWordGroups =
    isRecord(heroWords) &&
    languages.every((language) => Array.isArray(heroWords[language]));
  const validWorkspaceLabels =
    isRecord(workspaceLabels) &&
    languages.every((language) => Array.isArray(workspaceLabels[language]));
  const sectionEyebrows = value.sectionEyebrows;
  const validEyebrows =
    isRecord(sectionEyebrows) &&
    languages.every((language) => isRecord(sectionEyebrows[language]));

  return typeof value.name === "string" &&
    typeof value.brandName === "string" &&
    validLocalized &&
    validTools &&
    validWordGroups &&
    validWorkspaceLabels &&
    validEyebrows &&
    isRecord(nav) &&
    languages.every((language) => isRecord(nav[language])) &&
    isRecord(value.languageLabels);
};

export const sanitizeVideos = (value: unknown): VideoItem[] => {
  if (!Array.isArray(value)) return [];
  return value
    .filter(isRecord)
    .filter(
      (item) =>
        item.active !== false &&
        Boolean(extractYouTubeId(item.youtube)),
    )
    .map((item, index) => ({
      id: typeof item.id === "string" ? item.id : `video-${index}`,
      youtube: extractYouTubeId(item.youtube) ?? "",
      title: isRecord(item.title)
        ? (item.title as unknown as LocalizedText)
        : { en: "Untitled video", pt: "VÃ­deo sem tÃ­tulo", es: "Video sin tÃ­tulo" },
      category: isRecord(item.category)
        ? (item.category as unknown as LocalizedText)
        : item.category === "motion" || item.category === "motion-design"
          ? { en: "Motion Design", pt: "Motion Design", es: "Motion Design" }
          : { en: "Video edit", pt: "Video edit", es: "Video edit" },
      kind: normalizeVideoKind(item),
      aspectRatio: normalizeSourceAspect(item),
      thumbnail: typeof item.thumbnail === "string" ? item.thumbnail : undefined,
      active: true,
      order: typeof item.order === "number" ? item.order : index,
    }))
    .sort((a, b) => a.order - b.order);
};

export const sanitizeSocials = (value: unknown): SocialItem[] => {
  if (!Array.isArray(value)) return [];
  return value.filter(isRecord).flatMap((item, index) => {
    if (item.active === false || typeof item.url !== "string") return [];
    const url = item.url.trim();
    if (!/^(https?:\/\/|mailto:)/i.test(url)) return [];
    return [{
      id: typeof item.id === "string" ? item.id : `social-${index}`,
      label: typeof item.label === "string" ? item.label : "Social",
      url,
      active: true,
    }];
  });
};

export const sanitizeFaq = (value: unknown): FAQItem[] => {
  if (!Array.isArray(value)) return [];
  return value
    .filter(isRecord)
    .filter((item) => item.active !== false && isRecord(item.question) && isRecord(item.answer))
    .map((item, index) => ({
      id: typeof item.id === "string" ? item.id : `faq-${index}`,
      question: item.question as unknown as LocalizedText,
      answer: item.answer as unknown as LocalizedText,
      active: true,
      order: typeof item.order === "number" ? item.order : index,
    }))
    .sort((a, b) => a.order - b.order);
};

