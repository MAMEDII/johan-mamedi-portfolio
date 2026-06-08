import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface EditorWorkspaceProps {
  labels: string[];
  reducedMotion: boolean;
}

const clipWidths = ["wide", "short", "medium", "tiny", "wide", "medium"];
const photoshopToolLabels = ["Move", "Marq", "Lasso", "Crop", "Brush", "Pen", "Hand", "T", "Shape", "Zoom", "Grad", "Eye"];

function Panel({ title, count = 5, className = "" }: { title: string; count?: number; className?: string }) {
  return (
    <aside className={`editor-panel ${className}`}>
      <strong>{title}</strong>
      {Array.from({ length: count }, (_, index) => <span key={index}><i /> <b /></span>)}
    </aside>
  );
}

function TrackRows({ motion = false }: { motion?: boolean }) {
  return (
    <div className={`detailed-tracks ${motion ? "keyframe-tracks" : ""}`}>
      <div className="track-ruler">{Array.from({ length: 10 }, (_, index) => <i key={index}>{index * 2}</i>)}</div>
      {[0, 1, 2, 3, 4].map((track) => (
        <div className="detail-track" key={track}>
          <em>{track < 3 ? `V${track + 1}` : `A${track - 2}`}</em>
          {motion
            ? Array.from({ length: track + 2 }, (_, index) => <span className="keyframe" key={index} />)
            : clipWidths.slice(0, track + 2).map((clip, index) => <span className={clip} key={index}><i /></span>)}
        </div>
      ))}
      <b className="playhead" />
    </div>
  );
}

function PremiereWorkspace() {
  return (
    <div className="workspace-ui premiere-ui">
      <span className="workspace-cursor premiere-cursor" aria-hidden="true" />
      <div className="editor-commandbar"><span>PROJECT / MAMEDI_01</span><i /><i /><i /></div>
      <Panel title="PROJECT" count={6} className="premiere-project" />
      <div className="premiere-viewer">
        <div className="viewer-frame"><span>PROGRAM / 01</span><b>STORY / CUT</b></div>
        <div className="transport"><i /><i /><i /><i /><i /></div>
      </div>
      <Panel title="EFFECTS" count={6} className="premiere-effects" />
      <TrackRows />
    </div>
  );
}

function AfterEffectsWorkspace() {
  return (
    <div className="workspace-ui ae-ui">
      <span className="workspace-cursor ae-cursor" aria-hidden="true" />
      <div className="editor-commandbar"><span>COMPOSITION / RETENTION</span><i /><i /><i /></div>
      <Panel title="PROJECT" count={5} className="ae-project" />
      <div className="composition-viewer">
        <div className="composition-grid"><div className="motion-shape"><span /></div><small>ACTIVE CAMERA / 50%</small></div>
      </div>
      <div className="ae-side-stack">
        <Panel title="EFFECT CONTROLS" count={4} />
        <Panel title="PRESETS" count={3} />
      </div>
      <TrackRows motion />
    </div>
  );
}

function PhotoshopWorkspace() {
  const tools = ["↖", "□", "◯", "✦", "✎", "⌁", "✋", "T", "◫", "⌕"];
  return (
    <div className="workspace-ui photoshop-ui">
      <span className="workspace-cursor photoshop-cursor" aria-hidden="true" />
      <div className="editor-commandbar"><span>CANVAS / COVER_ART.PSD</span><i /><i /><i /></div>
      <aside className="creative-tools">
        {photoshopToolLabels.map((tool) => <span key={tool} data-tool={tool} aria-label={tool} />)}
      </aside>
      <div className="creative-canvas">
        <div className="canvas-art">
          <span className="selection-frame" />
          <span className="shape-frame" />
          <i className="brush-stroke one" /><i className="brush-stroke two" />
          <b>MAMEDI</b><small>RETENTION FRAME</small>
        </div>
      </div>
      <aside className="creative-sidebar">
        <div className="color-panel"><strong>COLOR</strong><span /><i /><b /></div>
        <div className="properties-panel"><strong>PROPERTIES</strong><span /><span /><span /></div>
        <div className="layer-stack"><strong>LAYERS</strong>{["Highlights", "Title", "Color grade", "Footage"].map((layer) => <span key={layer}><i />{layer}</span>)}</div>
      </aside>
    </div>
  );
}

const workspaces = [PremiereWorkspace, AfterEffectsWorkspace, PhotoshopWorkspace];

export function EditorWorkspace({ labels, reducedMotion }: EditorWorkspaceProps) {
  const [active, setActive] = useState(0);
  const Workspace = workspaces[active];

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % workspaces.length), 12500);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div className="workspace-shell">
      <div className="workspace-tabs" role="tablist" aria-label="Editing workspaces">
        {workspaces.map((_, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={active === index}
            className={active === index ? "active" : ""}
            key={index}
            onClick={() => setActive(index)}
          >
            <i>{String(index + 1).padStart(2, "0")}</i>{labels[index] ?? `VIEW ${index + 1}`}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={reducedMotion ? false : { opacity: 0, y: 10, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -10, filter: "blur(3px)" }}
          transition={{ duration: 0.42 }}
        >
          <Workspace />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
