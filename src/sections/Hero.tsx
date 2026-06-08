import { ArrowDown, CircleDot } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Language, SiteContent } from "../types/content";
import { useTypewriter } from "../hooks/useTypewriter";
import { localized } from "../utils/content";

interface HeroProps {
  site: SiteContent;
  language: Language;
}

export function Hero({ site, language }: HeroProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const typed = useTypewriter(site.heroWords[language] || site.heroWords.en, reducedMotion);

  return (
    <section id="home" className="hero-section">
      <div className="hero-aura" />
      <div className="hero-timeline" aria-hidden="true">
        <div className="timeline-ruler">{Array.from({ length: 14 }, (_, index) => <i key={index}>{index + 1}</i>)}</div>
        {[0, 1, 2].map((track) => (
          <div className="hero-track" key={track}>
            <span /><span /><span /><span />
          </div>
        ))}
        <b />
      </div>
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-label"><CircleDot size={14} /> {localized(site.heroLabel, language)}</div>
        <h1>{localized(site.headline, language, site.name)}</h1>
        <p>{localized(site.subtitle, language)}</p>
        <div className="type-stage" aria-live="polite">
          <span>{typed}</span><i aria-hidden="true" />
        </div>
      </motion.div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to about">
        <span>{localized(site.scrollLabel, language)}</span><ArrowDown size={16} />
      </a>
      <span className="hero-corner left">REC ● 00:00:07:14</span>
      <span className="hero-corner right">4K / 24 FPS</span>
    </section>
  );
}
