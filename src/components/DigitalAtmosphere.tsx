import { useIsMobile } from "../hooks/useMediaQuery";

const glyphs = ["0", "1", "M", "A", "M", "E", "D", "I", "FX", "REC", "CUT", "AE", "PR", "24", "V2", "10", "//", "01", "^"];
const beamCount = 10;

function createColumn(index: number, length: number) {
  return Array.from({ length }, (_, glyphIndex) => glyphs[(index * 5 + glyphIndex * 3) % glyphs.length]).join("\n");
}

export function BackgroundAtmosphere() {
  const isMobile = useIsMobile();
  const columns = isMobile ? 12 : 44;
  const columnLength = isMobile ? 7 : 15;
  const beams = isMobile ? 3 : beamCount;

  return (
    <div className={`background-atmosphere ${isMobile ? "is-mobile" : ""}`} aria-hidden="true">
      <span className="atmosphere-halo halo-one" />
      <span className="atmosphere-halo halo-two" />
      {!isMobile && (
        <>
          <span className="atmosphere-halo halo-three" />
          <span className="atmosphere-halo halo-four" />
        </>
      )}
      <div className="atmosphere-rays">
        {Array.from({ length: beams }, (_, index) => (
          <i
            key={index}
            style={{
              left: isMobile ? `${18 + index * 30}%` : `${5 + index * 15}%`,
              animationDelay: `${-index * 2.1}s`,
              transform: `rotate(${-14 + index * 5}deg)`,
            }}
          />
        ))}
      </div>
      <div className="matrix-rain">
        {Array.from({ length: columns }, (_, index) => (
          <span
            key={index}
            style={{
              left: isMobile ? `${index * 9}%` : `${-2 + index * 2.42}%`,
              animationDelay: `${-(index % 11) * 2.6}s`,
              animationDuration: `${isMobile ? 46 + (index % 5) * 5 : 28 + (index % 7) * 4}s`,
            }}
          >
            {createColumn(index, columnLength)}
          </span>
        ))}
      </div>
      <div className="atmosphere-scanlines" />
    </div>
  );
}

export function DigitalAtmosphere() {
  return <BackgroundAtmosphere />;
}
