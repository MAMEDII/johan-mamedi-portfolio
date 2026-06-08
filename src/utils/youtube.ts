const YOUTUBE_ID = /^[a-zA-Z0-9_-]{11}$/;

export const extractYouTubeId = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const input = value.trim();
  if (YOUTUBE_ID.test(input)) return input;

  try {
    const url = new URL(input);
    const host = url.hostname.replace(/^www\./, "");
    let candidate = "";

    if (host === "youtu.be") candidate = url.pathname.split("/")[1] ?? "";
    if (host === "youtube.com" || host === "m.youtube.com") {
      candidate =
        url.pathname.startsWith("/shorts/") || url.pathname.startsWith("/embed/")
          ? url.pathname.split("/")[2] ?? ""
          : url.searchParams.get("v") ?? "";
    }

    return YOUTUBE_ID.test(candidate) ? candidate : null;
  } catch {
    return null;
  }
};

export const youtubeThumbnail = (id: string): string =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export const youtubeEmbed = (id: string): string =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&enablejsapi=1`;
