import { useEffect, useState, type ReactNode } from "react";

const warnedPaths = new Set<string>();

interface SafeImageProps {
  src: string | string[];
  alt: string;
  className?: string;
  fallback: ReactNode;
  expectedPath?: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
}

export function SafeImage({
  src,
  alt,
  className = "",
  fallback,
  expectedPath,
  width,
  height,
  loading = "lazy",
  fetchPriority = "auto",
  sizes,
}: SafeImageProps) {
  const sources = Array.isArray(src) ? src : [src];
  const sourceKey = sources.join("|");
  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => setSourceIndex(0), [sourceKey]);

  if (!sources[sourceIndex]) return <>{fallback}</>;

  return (
    <img
      src={sources[sourceIndex]}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      sizes={sizes}
      onError={() => {
        const nextIndex = sourceIndex + 1;
        if (nextIndex < sources.length) {
          setSourceIndex(nextIndex);
          return;
        }
        if (import.meta.env.DEV && expectedPath && !warnedPaths.has(expectedPath)) {
          warnedPaths.add(expectedPath);
          console.warn(`[Mamedi Portfolio] No supported image found. Expected folder/files: ${expectedPath}`);
        }
        setSourceIndex(sources.length);
      }}
    />
  );
}
