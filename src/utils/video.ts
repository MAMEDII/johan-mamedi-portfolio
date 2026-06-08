import type { VideoItem } from "../types/content";

export type NormalizedAspect = "horizontal" | "vertical" | "square";

export function normalizeAspectRatio(video: VideoItem): NormalizedAspect {
  if (video.aspectRatio === "vertical" || video.aspectRatio === "9:16") return "vertical";
  if (video.aspectRatio === "square" || video.aspectRatio === "1:1") return "square";
  return "horizontal";
}

export const normalizeVideoAspectRatio = normalizeAspectRatio;

export function videoAspectClass(video: VideoItem): string {
  return `aspect-${normalizeAspectRatio(video)}`;
}
