import { useEffect, useMemo, useState } from "react";

export const useTypewriter = (words: string[], reducedMotion: boolean) => {
  const wordsKey = words.join("\u0001");
  const stableWords = useMemo(() => words.filter(Boolean), [wordsKey]);
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setWordIndex(0);
    setDeleting(false);
    setVisible(reducedMotion ? stableWords[0] ?? "" : "");
  }, [reducedMotion, wordsKey]);

  useEffect(() => {
    if (!stableWords.length || reducedMotion) return;

    const word = stableWords[wordIndex % stableWords.length];
    const finishedTyping = visible === word;
    const finishedDeleting = visible === "";
    const delay = finishedTyping ? 1300 : finishedDeleting && deleting ? 250 : deleting ? 42 : 78;

    const timer = window.setTimeout(() => {
      if (finishedTyping && !deleting) {
        setDeleting(true);
        return;
      }
      if (finishedDeleting && deleting) {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % stableWords.length);
        return;
      }
      setVisible(word.slice(0, visible.length + (deleting ? -1 : 1)));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, reducedMotion, stableWords, visible, wordIndex]);

  return visible;
};
