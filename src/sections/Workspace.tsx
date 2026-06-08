import { useReducedMotion } from "framer-motion";
import { EditorWorkspace } from "../components/EditorWorkspace";
import { SectionHeading } from "../components/SectionHeading";
import type { Language, SiteContent } from "../types/content";
import { localized } from "../utils/content";

export function Workspace({ site, language }: { site: SiteContent; language: Language }) {
  return (
    <section className="content-section workspace-section">
      <SectionHeading eyebrow={site.sectionEyebrows[language]?.workspace || site.sectionEyebrows.en.workspace} title={localized(site.workspaceTitle, language)} />
      <EditorWorkspace labels={site.workspaceLabels[language] || site.workspaceLabels.en} reducedMotion={Boolean(useReducedMotion())} />
    </section>
  );
}
