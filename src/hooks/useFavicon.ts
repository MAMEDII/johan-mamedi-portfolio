import { useEffect } from "react";
import { logoPublicPaths } from "../utils/assets";

const fallbackIcon =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#050505"/><rect x="2" y="2" width="60" height="60" rx="12" fill="none" stroke="#00ff88" stroke-opacity=".65"/><text x="32" y="42" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" font-weight="700" fill="#00ff88">M</text></svg>',
  );

export const useFavicon = () => {
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]') ?? document.createElement("link");
    link.rel = "icon";
    if (!link.parentNode) document.head.appendChild(link);
    link.href = fallbackIcon;

    let index = 0;
    const tryNext = () => {
      if (index >= logoPublicPaths.length) return;
      const image = new Image();
      const candidate = logoPublicPaths[index++];
      image.onload = () => {
        link.href = candidate;
      };
      image.onerror = tryNext;
      image.src = candidate;
    };
    tryNext();
  }, []);
};
