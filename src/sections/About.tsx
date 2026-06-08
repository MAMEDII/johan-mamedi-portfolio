import { motion } from "framer-motion";
import type { Language, SiteContent } from "../types/content";
import { photoPublicPaths, publicAsset } from "../utils/assets";
import { localized } from "../utils/content";
import { getCurrentAge, getExperienceLabel } from "../utils/date";
import { SafeImage } from "../components/SafeImage";
import { SectionHeading } from "../components/SectionHeading";

interface AboutProps {
  site: SiteContent;
  language: Language;
}
export function About({ site, language }: AboutProps) {
  const aboutText = localized(site.aboutText, language)
    .replaceAll("{age}", String(getCurrentAge("2007-01-14")))
    .replaceAll("{experience}", getExperienceLabel("2024-05-01", language));

  return (
    <section id="about" className="content-section about-section">
      <div className="section-grid">
        <div>
          <SectionHeading eyebrow={site.sectionEyebrows[language]?.about || site.sectionEyebrows.en.about} title={localized(site.aboutTitle, language)} />
          <div className="about-copy">
            {aboutText.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        <motion.div
          className="portrait-card"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <SafeImage
            src={photoPublicPaths}
            alt={site.name}
            className="portrait-image"
            expectedPath="public/assets/photo/johan-mamedi.(png|jpg|jpeg|webp)"
            fallback={
              <div className="portrait-fallback">
                <span>JM</span>
                <small>JOHAN MAMEDI / VIDEO EDITOR</small>
              </div>
            }
          />
          <span className="focus-corner top-left" /><span className="focus-corner top-right" />
          <span className="focus-corner bottom-left" /><span className="focus-corner bottom-right" />
        </motion.div>
      </div>
      <div className="tools-block">
        <span className="micro-title">{localized(site.toolsTitle, language)}</span>
        <div className="tool-cards">
          {site.tools.map((tool) => (
            <div className="tool-card" key={tool.name}>
              <SafeImage
                src={publicAsset(tool.icon)}
                alt=""
                className="tool-icon"
                fallback={<span className="tool-badge">{tool.badge}</span>}
              />
              <span>{tool.name}</span>
              <small>{localized(site.toolStatus, language)}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
