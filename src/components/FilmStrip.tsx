interface FilmStripProps {
  images: string[];
  maxWidth?: number;
  portrait?: boolean;
}

export function FilmStrip({ images, maxWidth = 448, portrait = false }: FilmStripProps) {
  return (
    <div
      className="relative w-full rounded-[2px] overflow-hidden shadow-2xl shadow-black/60"
      style={{
        maxWidth: `${maxWidth}px`,
        background: 'linear-gradient(165deg, #15120a 0%, #1a1610 50%, #12100c 100%)',
        border: '1px solid rgba(60, 50, 35, 0.4)',
      }}
    >
      {/* Top perforation bar with Kodak-style markings */}
      <div className="relative flex items-center justify-center h-7 bg-[#0d0b08] border-b border-[#2a231a]/60">
        <span className="font-mono text-[7px] text-[#6b5a40] tracking-[0.2em] uppercase">
          KODAK · 400TX
        </span>
        {/* Perforation holes */}
        <div className="absolute left-0 top-0 bottom-0 flex items-center">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="mx-[3px] rounded-[1px]"
              style={{
                width: '5px',
                height: '5px',
                background: '#000',
                boxShadow: 'inset 0 0 1px rgba(80,70,50,0.3)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Image area */}
      <div className="flex flex-col relative">
        {images.map((src, i) => (
          <div key={i} className="relative">
            <img
              src={src}
              alt={`底片 ${i + 1}`}
              className="w-full block"
              style={portrait ? { aspectRatio: '3 / 4', objectFit: 'cover' } : undefined}
            />
            {/* Film grain overlay on image */}
            <div className="absolute inset-0 pointer-events-none film-grain-overlay opacity-[0.08] mix-blend-overlay" />
            {/* Chemical development stains */}
            <div className="absolute inset-0 pointer-events-none film-stains" />
            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)',
              }}
            />
            {/* Frame number overlay */}
            <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded-[1px]">
              <span className="font-mono text-[8px] text-[#c4b898] tracking-widest2 uppercase">
                FRAME #{i + 1}
              </span>
            </div>
            {/* Subtle divider between frames */}
            {i < images.length - 1 && (
              <div className="h-[2px] bg-[#0d0b08]" />
            )}
          </div>
        ))}
      </div>

      {/* Bottom perforation bar with frame counter */}
      <div className="relative flex items-center justify-center h-7 bg-[#0d0b08] border-t border-[#2a231a]/60">
        <span className="font-mono text-[7px] text-[#6b5a40] tracking-[0.2em]">
          36 EXP · 35mm
        </span>
        <div className="absolute left-0 top-0 bottom-0 flex items-center">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="mx-[3px] rounded-[1px]"
              style={{
                width: '5px',
                height: '5px',
                background: '#000',
                boxShadow: 'inset 0 0 1px rgba(80,70,50,0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
