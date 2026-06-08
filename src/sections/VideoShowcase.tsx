import { SectionHeading } from "../components/SectionHeading";
import { VideoCarousel } from "../components/VideoCarousel";
import type { Language, VideoItem } from "../types/content";

interface VideoShowcaseProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  videos: VideoItem[];
  language: Language;
  direction: "left" | "right";
  variant?: "default" | "motion";
  onOpen: (video: VideoItem) => void;
}

export function VideoShowcase(props: VideoShowcaseProps) {
  return (
    <section id={props.id} className={`content-section showcase-section ${props.id} ${props.variant === "motion" ? "motion-showcase" : ""}`}>
      <SectionHeading eyebrow={props.eyebrow} title={props.title} description={props.description} />
      <VideoCarousel videos={props.videos} language={props.language} direction={props.direction} variant={props.variant} onOpen={props.onOpen} />
    </section>
  );
}
