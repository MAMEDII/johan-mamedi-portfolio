import { useEffect, useState } from "react";

export const MOBILE_MEDIA_QUERY = "(max-width: 700px), (pointer: coarse)";

export function useMediaQuery(query: string, defaultValue = false) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? defaultValue : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const sync = () => setMatches(media.matches);

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

export function useIsMobile() {
  return useMediaQuery(MOBILE_MEDIA_QUERY);
}
