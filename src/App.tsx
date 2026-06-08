import { useCallback, useMemo, useState } from "react";
import { Navbar } from "./components/Navbar";
import { CinematicHud } from "./components/CinematicHud";
import { BackgroundAtmosphere } from "./components/DigitalAtmosphere";
import { IntroOverlay } from "./components/IntroOverlay";
import { VideoModal } from "./components/VideoModal";
import { fallbackFaq, fallbackSite, fallbackSocials, fallbackVideos } from "./data/fallback";
import { useContent } from "./hooks/useContent";
import { useLanguage } from "./hooks/useLanguage";
import { useFavicon } from "./hooks/useFavicon";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { FAQ } from "./sections/FAQ";
import { Hero } from "./sections/Hero";
import { VideoShowcase } from "./sections/VideoShowcase";
import { Workspace } from "./sections/Workspace";
import type { FAQItem, SiteContent, SocialItem, VideoItem } from "./types/content";
import { isSiteContent, localized, sanitizeFaq, sanitizeSocials, sanitizeVideos } from "./utils/content";
import { normalizeAspectRatio } from "./utils/video";

const validateSite = (value: unknown): SiteContent | null => isSiteContent(value) ? value : null;
const validateVideos = (value: unknown): VideoItem[] | null => {
  const items = sanitizeVideos(value);
  return items.length ? items : null;
};
const validateSocials = (value: unknown): SocialItem[] | null => {
  const items = sanitizeSocials(value);
  return items.length ? items : null;
};
const validateFaq = (value: unknown): FAQItem[] | null => {
  const items = sanitizeFaq(value);
  return items.length ? items : null;
};

const getDisplayCategory = (video: VideoItem): "long" | "short" => {
  if (video.kind === "short") return "short";
  if (video.kind === "long") return "long";
  if (video.kind === "motion") {
    return normalizeAspectRatio(video) === "vertical" ? "short" : "long";
  }
  return normalizeAspectRatio(video) === "vertical" ? "short" : "long";
};

export default function App() {
  useFavicon();
  const { language, setLanguage } = useLanguage();
  const site = useContent("site.json", fallbackSite, validateSite);
  const videos = useContent("videos.json", fallbackVideos, validateVideos);
  const socials = useContent("socials.json", fallbackSocials, validateSocials);
  const faq = useContent("faq.json", fallbackFaq, validateFaq);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const closeVideo = useCallback(() => setSelectedVideo(null), []);

  const longVideos = useMemo(() => videos.filter((video) => getDisplayCategory(video) === "long"), [videos]);
  const shortVideos = useMemo(() => videos.filter((video) => getDisplayCategory(video) === "short"), [videos]);

  return (
    <>
      <IntroOverlay />
      <BackgroundAtmosphere />
      <CinematicHud />
      <Navbar site={site} language={language} setLanguage={setLanguage} />
      <main>
        <Hero site={site} language={language} />
        <About site={site} language={language} />
        <Workspace site={site} language={language} />
        <VideoShowcase
          id="long-form"
          eyebrow={site.sectionEyebrows[language]?.longForm || site.sectionEyebrows.en.longForm}
          title={localized(site.longFormTitle, language)}
          description={localized(site.longFormDescription, language)}
          videos={longVideos}
          language={language}
          direction="left"
          onOpen={setSelectedVideo}
        />
        <VideoShowcase
          id="shorts"
          eyebrow={site.sectionEyebrows[language]?.shorts || site.sectionEyebrows.en.shorts}
          title={localized(site.shortsTitle, language)}
          description={localized(site.shortsDescription, language)}
          videos={shortVideos}
          language={language}
          direction="right"
          onOpen={setSelectedVideo}
        />
        <FAQ site={site} items={faq} language={language} />
        <Contact site={site} socials={socials} language={language} />
      </main>
      <footer>
        <span>{localized(site.footerText, language)}</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
      <VideoModal video={selectedVideo} language={language} onClose={closeVideo} />
    </>
  );
}
