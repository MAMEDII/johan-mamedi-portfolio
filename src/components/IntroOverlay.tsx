import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "../hooks/useMediaQuery";
import { logoPublicPaths } from "../utils/assets";
import { SafeImage } from "./SafeImage";

export function IntroOverlay() {
  const reducedMotion = Boolean(useReducedMotion());
  const isMobile = useIsMobile();
  const fullIntro = !reducedMotion && !isMobile;
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveDelay = reducedMotion ? 80 : isMobile ? 760 : 1980;
    const removeDelay = reducedMotion ? 150 : isMobile ? 1080 : 2380;
    const failSafeDelay = reducedMotion ? 420 : isMobile ? 1400 : 3000;
    const leaveTimer = window.setTimeout(() => setLeaving(true), leaveDelay);
    const removeTimer = window.setTimeout(() => setVisible(false), removeDelay);
    const failSafeTimer = window.setTimeout(() => setVisible(false), failSafeDelay);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(failSafeTimer);
    };
  }, [isMobile, reducedMotion]);

  if (!visible) return null;

  return (
        <div
          className={`intro-overlay ${isMobile ? "is-mobile" : ""} ${leaving ? "is-leaving" : ""}`}
          aria-hidden="true"
        >
          {fullIntro && <div className="intro-particles" />}
          <motion.div
            className="intro-logo"
            initial={reducedMotion ? false : fullIntro ? { opacity: 0, scale: 0.74, filter: "blur(10px)" } : { opacity: 0, scale: 0.92 }}
            animate={reducedMotion ? { opacity: 1 } : fullIntro ? { opacity: [0, 1, 1, 1, 1], scale: [0.74, 1, 1.15, 1.06, 1], filter: ["blur(10px)", "blur(0px)", "brightness(3.2)", "brightness(1.35)", "brightness(1)"] } : { opacity: [0, 1, 1], scale: [0.92, 1.03, 1] }}
            transition={{ duration: reducedMotion ? 0.1 : fullIntro ? 1.8 : 0.72, times: fullIntro ? [0, 0.2, 0.34, 0.43, 1] : [0, 0.42, 1], ease: "easeOut" }}
          >
            <SafeImage
              src={logoPublicPaths}
              alt=""
              className="intro-logo-image"
              width={198}
              height={198}
              loading="eager"
              fetchPriority="high"
              fallback={<span>M</span>}
            />
            {fullIntro && (
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
          {fullIntro && <span className="intro-reveal" />}
        </div>
  );
}
