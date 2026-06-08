import { FAQAccordion } from "../components/FAQAccordion";
import { SectionHeading } from "../components/SectionHeading";
import type { FAQItem, Language, SiteContent } from "../types/content";
import { localized } from "../utils/content";

export function FAQ({ site, items, language }: { site: SiteContent; items: FAQItem[]; language: Language }) {
  return (
    <section id="faq" className="content-section faq-section">
      <SectionHeading
        eyebrow={site.sectionEyebrows[language]?.faq || site.sectionEyebrows.en.faq}
        title={localized(site.faqTitle, language)}
        description={localized(site.faqDescription, language)}
      />
      <FAQAccordion items={items} language={language} />
    </section>
  );
}
