import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import type { Language, VideoItem } from "../types/content";
import { localized } from "../utils/content";
import { publicAsset } from "../utils/assets";
import { youtubeThumbnail } from "../utils/youtube";
import { videoAspectClass } from "../utils/video";
import { SafeImage } from "./SafeImage";

interface VideoCarouselProps {
  videos: VideoItem[];
  language: Language;
  direction: "left" | "right";
  onOpen: (video: VideoItem) => void;
  variant?: "default" | "motion";
}

export function VideoCarousel({ videos, language, direction, onOpen, variant = "default" }: VideoCarouselProps) {
  const [mobileScroll, setMobileScroll] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 700px), (pointer: coarse)");
    const sync = () => setMobileScroll(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  if (!videos.length) return <div className="empty-state">No active videos yet.</div>;
  const copies = videos.length < 4 ? 4 : 2;
  const loop = mobileScroll ? videos : Array.from({ length: copies }, () => videos).flat();

  return (
    <div className={`carousel-window ${mobileScroll ? "is-touch-scroll" : ""}`}>
      <div className={`carousel-track ${mobileScroll ? "" : `move-${direction}`}`}>
        {loop.map((video, index) => {
          const title = localized(video.title, language, "Untitled video");
          const image = video.thumbnail
            ? publicAsset(video.thumbnail)
            : youtubeThumbnail(video.youtube);
          return (
            <button
              key={`${video.id}-${index}`}
              className={`video-card ${videoAspectClass(video)} ${variant === "motion" ? "motion-video-card" : ""}`}
              type="button"
              onClick={() => onOpen(video)}
              aria-label={`Play ${title}`}
            >
              <div className="video-image">
                <SafeImage
                  src={image}
                  alt=""
                  className="video-thumbnail"
                  fallback={<div className="thumbnail-fallback">JM / EDIT</div>}
                />
                <span className="play-button"><Play size={18} fill="currentColor" /></span>
                <span className="timecode">00:{String((index * 7 + 12) % 60).padStart(2, "0")}:14</span>
              </div>
              <span className="video-copy sr-only">
                <small>{localized(video.category, language, "Video edit")}</small>
                <strong>{title}</strong>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
