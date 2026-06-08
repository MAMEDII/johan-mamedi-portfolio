export function CinematicHud() {
  return (
    <div className="cinematic-hud" aria-hidden="true">
      <span className="hud-rec">REC <i /> 00:00:12:08</span>
      <span className="hud-fps"><b /> FPS</span>
      <span className="hud-mark top-left" />
      <span className="hud-mark top-right" />
      <span className="hud-mark bottom-left" />
      <span className="hud-mark bottom-right" />
    </div>
  );
}
