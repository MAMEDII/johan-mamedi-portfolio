import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Language, VideoItem } from "../types/content";
import { localized } from "../utils/content";
import { videoAspectClass } from "../utils/video";
import { youtubeEmbed } from "../utils/youtube";

interface VideoModalProps {
  video: VideoItem | null;
  language: Language;
  onClose: () => void;
}

export function VideoModal({ video, language, onClose }: VideoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const playerRef = useRef<HTMLIFrameElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!video) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeRef.current?.focus(), 30);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previousFocus.current?.focus();
    };
  }, [onClose, video]);

  if (!video) return null;

  const setComfortableVolume = () => {
    // YouTube may ignore volume commands until its internal player is ready.
    const setVolume = () =>
      playerRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "setVolume", args: [50] }),
        "https://www.youtube-nocookie.com",
      );
    setVolume();
    window.setTimeout(setVolume, 600);
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={localized(video.title, language, "Video player")}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div className={`modal-card ${videoAspectClass(video)}`}>
        <button ref={closeRef} className="modal-close" type="button" onClick={onClose} aria-label="Close video">
          <X />
        </button>
        <iframe
          ref={playerRef}
          src={youtubeEmbed(video.youtube)}
          title={localized(video.title, language, "Video player")}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={setComfortableVolume}
        />
      </div>
    </div>
  );
}
