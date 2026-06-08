const glyphs = ["0", "1", "M", "A", "M", "E", "D", "I", "FX", "REC", "CUT", "AE", "PR", "24", "V2", "10", "//", "01", "∆"];
const beamCount = 10;

function createColumn(index: number) {
  return Array.from({ length: 15 }, (_, glyphIndex) => glyphs[(index * 5 + glyphIndex * 3) % glyphs.length]).join("\n");
}

export function BackgroundAtmosphere() {
  return (
    <div className="background-atmosphere" aria-hidden="true">
      <span className="atmosphere-halo halo-one" />
      <span className="atmosphere-halo halo-two" />
      <span className="atmosphere-halo halo-three" />
      <span className="atmosphere-halo halo-four" />
      <div className="atmosphere-rays">
        {Array.from({ length: beamCount }, (_, index) => (
          <i
            key={index}
            style={{
              left: `${5 + index * 15}%`,
              animationDelay: `${-index * 2.1}s`,
              transform: `rotate(${-14 + index * 5}deg)`,
            }}
          />
        ))}
      </div>
      <div className="matrix-rain">
        {Array.from({ length: 44 }, (_, index) => (
          <span
            key={index}
            style={{
              left: `${-2 + index * 2.42}%`,
              animationDelay: `${-(index % 11) * 2.6}s`,
              animationDuration: `${28 + (index % 7) * 4}s`,
            }}
          >
            {createColumn(index)}
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
