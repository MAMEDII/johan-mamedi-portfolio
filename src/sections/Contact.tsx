import {
  ExternalLink,
  Mail,
  type LucideIcon,
} from "lucide-react";
import type { SVGProps } from "react";
import type { Language, SiteContent, SocialItem } from "../types/content";
import { localized } from "../utils/content";

function DiscordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.5 5.3A17 17 0 0 0 15.4 4l-.5 1a15.4 15.4 0 0 0-5.8 0l-.5-1a17 17 0 0 0-4.1 1.3C1.9 9.2 1.2 13 1.5 16.7A16.6 16.6 0 0 0 6.6 19l1.2-1.7a10.5 10.5 0 0 1-1.9-.9l.5-.4c3.7 1.7 7.6 1.7 11.2 0l.6.4a12 12 0 0 1-2 .9l1.2 1.7a16.6 16.6 0 0 0 5.1-2.3c.4-4.4-.7-8.1-3-11.4ZM8.3 14.6c-1.1 0-2-1-2-2.2 0-1.2.9-2.2 2-2.2s2 1 2 2.2c0 1.2-.9 2.2-2 2.2Zm7.4 0c-1.1 0-2-1-2-2.2 0-1.2.9-2.2 2-2.2s2 1 2 2.2c0 1.2-.9 2.2-2 2.2Z" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 2H22l-6.8 7.8L23.2 22H17l-4.9-6.4L6.5 22H3.4l7.2-8.2L2.8 2h6.4l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L8.3 4H6.5l11.3 15.9Z" />
    </svg>
  );
}

const socialIcons: Record<string, LucideIcon> = {
  email: Mail,
};

const allowedSocials = new Set(["email", "twitter", "x", "discord"]);
const isExternalUrl = (url: string): boolean => url.toLowerCase().startsWith("https://");

export function Contact({ site, socials, language }: { site: SiteContent; socials: SocialItem[]; language: Language }) {
  const visibleSocials = socials.filter((social) => allowedSocials.has(social.id.toLowerCase()));

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <span className="availability"><i /> {localized(site.contactBadge, language)}</span>
        <h2>{localized(site.contactTitle, language)}</h2>
        <p>{localized(site.contactDescription, language)}</p>
        <div className="social-links">
          {visibleSocials.map((social) => {
            const socialId = social.id.toLowerCase();
            const Icon = socialId === "discord"
              ? DiscordIcon
              : socialId === "twitter" || socialId === "x"
                ? XIcon
                : socialIcons[socialId] || ExternalLink;
            return (
              <a
                key={social.id}
                href={social.url}
                target={isExternalUrl(social.url) ? "_blank" : undefined}
                rel={isExternalUrl(social.url) ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                title={social.label}
              >
                <Icon />
                <span>{social.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
