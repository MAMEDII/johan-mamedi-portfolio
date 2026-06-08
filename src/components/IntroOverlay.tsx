import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { logoPublicPaths } from "../utils/assets";
import { SafeImage } from "./SafeImage";

export function IntroOverlay() {
  const reducedMotion = Boolean(useReducedMotion());
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLeaving(true), reducedMotion ? 100 : 1980);
    const removeTimer = window.setTimeout(() => setVisible(false), reducedMotion ? 180 : 2380);
    const failSafeTimer = window.setTimeout(() => setVisible(false), 3000);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(failSafeTimer);
    };
  }, [reducedMotion]);

  if (!visible) return null;

  return (
        <div
          className={`intro-overlay ${leaving ? "is-leaving" : ""}`}
          aria-hidden="true"
        >
          <div className="intro-particles" />
          <motion.div
            className="intro-logo"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.74, filter: "blur(10px)" }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: [0, 1, 1, 1, 1], scale: [0.74, 1, 1.15, 1.06, 1], filter: ["blur(10px)", "blur(0px)", "brightness(3.2)", "brightness(1.35)", "brightness(1)"] }}
            transition={{ duration: reducedMotion ? 0.1 : 1.8, times: [0, 0.2, 0.34, 0.43, 1], ease: "easeOut" }}
          >
            <SafeImage
              src={logoPublicPaths}
              alt=""
              className="intro-logo-image"
              fallback={<span>M</span>}
            />
            {!reducedMotion && (
              <>
                <svg className="intro-lightning" viewBox="0 0 160 560" aria-hidden="true">
                  <polyline points="82 0 40 116 76 109 34 238 104 194 63 352 124 234 98 242 121 405 80 560" />
                  <polyline className="intro-lightning-core" points="84 18 54 128 82 121 48 242 96 210 70 350 110 246 92 254 108 410 80 560" />
                </svg>
                <span className="intro-impact-burst" />
                <span className="intro-sparks">
                  <i /><i /><i /><i /><i /><i /><i /><i />
                </span>
              </>
            )}
            <i /><b />
          </motion.div>
          <span className="intro-word">MAMEDI / VISUAL EDITING</span>
          {!reducedMotion && <span className="intro-reveal" />}
        </div>
  );
}
