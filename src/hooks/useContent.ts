import { useEffect, useState } from "react";
import { publicAsset } from "../utils/assets";

export function useContent<T>(
  fileName: string,
  fallback: T,
  validate: (value: unknown) => T | null,
): T {
  const [content, setContent] = useState(fallback);

  useEffect(() => {
    let active = true;
    fetch(publicAsset(`data/${fileName}`))
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load ${fileName}`);
        return response.json() as Promise<unknown>;
      })
      .then((value) => {
        const safeValue = validate(value);
        if (active && safeValue) setContent(safeValue);
      })
      .catch(() => {
        if (active) setContent(fallback);
      });

    return () => {
      active = false;
    };
  }, [fallback, fileName, validate]);

  return content;
}
