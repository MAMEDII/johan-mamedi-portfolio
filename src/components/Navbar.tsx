import { Languages, Menu, X } from "lucide-react";
import { useState } from "react";
import type { Language, SiteContent } from "../types/content";
import { logoPublicPaths } from "../utils/assets";
import { SafeImage } from "./SafeImage";

interface NavbarProps {
  site: SiteContent;
  language: Language;
  setLanguage: (language: Language) => void;
}

const links = [
  ["home", "home"],
  ["about", "about"],
  ["long-form", "longForm"],
  ["shorts", "shorts"],
  ["faq", "faq"],
  ["contact", "contact"],
] as const;
export function Navbar({ site, language, setLanguage }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const nav = site.nav[language] || site.nav.en;
  const scrollToSection = (id: string) => {
    setOpen(false);
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    window.requestAnimationFrame(scroll);
    window.setTimeout(scroll, 450);
  };

  return (
    <header className="nav-shell">
      <nav className="nav-bar" aria-label="Main navigation">
        <a className="brand-mark" href="#home" aria-label={`${site.name} home`} onClick={(event) => { event.preventDefault(); scrollToSection("home"); }}>
          <SafeImage
            src={logoPublicPaths}
            alt={`${site.brandName} logo`}
            className="brand-image"
            expectedPath="public/assets/logo/mamedi-logo.(png|jpg|jpeg|webp)"
            fallback={<span>M</span>}
          />
          <strong>
            <span className="brand-name-full">{site.name}</span>
            <span className="brand-name-short">{site.brandName}</span>
          </strong>
        </a>

        <div className={`nav-links ${open ? "is-open" : ""}`}>
          {links.map(([id, key]) => (
            <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); scrollToSection(id); }}>
              {nav[key] || site.nav.en[key]}
            </a>
          ))}
          <label className="language-select">
            <Languages size={15} aria-hidden="true" />
            <span className="sr-only">Language</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
              aria-label="Select language"
            >
              <option value="en">EN</option>
              <option value="pt">PT</option>
              <option value="es">ES</option>
            </select>
          </label>
        </div>

        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  );
}
