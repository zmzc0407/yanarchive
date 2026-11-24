import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Camera, Film, MapPin, Play } from 'lucide-react';
import { SubPageHeader } from '@/components/SubPageHeader';
import { Twikoo } from '@/components/Twikoo';
import { ArchiveModal } from '@/components/ArchiveModal';
import { filmTraceData, setDiaryData } from '@/mediaData';
import type { ArchiveEntry } from '@/types';

interface SceneCardProps {
  entry: ArchiveEntry;
  index: number;
  onOpen: (entry: ArchiveEntry) => void;
}

function getLocation(subtitle: string): string {
  return subtitle.split('·')[0].trim();
}

function SceneCard({ entry, index, onOpen }: SceneCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(entry)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
      className="masonry-item group text-left"
    >
      <div className="relative overflow-hidden rounded-sm border border-darkroom-border/40 bg-darkroom-surface/20 hover:border-darkroom-accent/50 transition-colors duration-300">
        <div className="relative overflow-hidden">
          <img
            src={entry.coverImage}
            alt={entry.title}
            loading="lazy"
            className="natural-media group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-darkroom-bg/90 via-transparent to-transparent" />
          <span className="absolute top-3 left-3 px-2 py-1 bg-black/55 backdrop-blur-sm rounded-sm font-mono text-[9px] text-darkroom-text tracking-widest2 uppercase">
            SET DIARY
          </span>
          {entry.frames.some((f) => f.isVideo) && (
            <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/55 backdrop-blur-sm rounded-sm">
              <Play className="w-2.5 h-2.5 text-darkroom-accent fill-darkroom-accent" />
              <span className="font-mono text-[8px] text-darkroom-accent tracking-widest2 uppercase">VIDEO</span>
            </span>
          )}
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-darkroom-bg/70 border border-darkroom-accent/40 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Camera className="w-3 h-3 text-darkroom-accent" />
            <span className="font-mono text-[9px] text-darkroom-accent tracking-widest2 uppercase">
              展开底片组
            </span>
          </span>
        </div>

        <div className="p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-3.5 h-3.5 text-darkroom-accent" />
            <span className="font-mono text-[10px] text-darkroom-muted tracking-wide">
              {entry.date}
            </span>
          </div>
          <h3 className="font-serif text-lg font-bold text-darkroom-text leading-snug group-hover:text-darkroom-accent transition-colors duration-300">
            {entry.title}
          </h3>
          <p className="flex items-center gap-1.5 font-body text-sm text-darkroom-muted mt-2">
            <MapPin className="w-3.5 h-3.5 text-darkroom-accent" />
            {getLocation(entry.subtitle)}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function HangingFilmStrip({ entry, index, onOpen }: SceneCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="film-photo-card relative flex flex-col items-center pt-10"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="w-3 h-4 rounded-b-sm border-x border-b border-darkroom-accent/60 bg-darkroom-surface" />
        <span className="w-px h-7 bg-darkroom-accent/35" />
      </div>

      <button
        type="button"
        onClick={() => onOpen(entry)}
        className="film-hanging-strip relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-darkroom-accent"
        aria-label={`打开${entry.title}胶片档案`}
      >
        <div className="relative overflow-hidden border-y border-[#3b3022] bg-[#0d0b08] px-5 py-3 shadow-2xl shadow-black/40">
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-[#15110c] border-r border-[#3b3022] film-perforations" />
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-[#15110c] border-l border-[#3b3022] film-perforations" />

          <div className="relative space-y-2">
            {entry.frames.slice(0, 2).map((frame, frameIndex) => (
              <div key={frame.label} className="relative overflow-hidden border border-[#56442e]/70 bg-black">
                <img
                  src={frame.url}
                  alt={`${entry.title} ${frame.label}`}
                  loading="lazy"
                  className="natural-media"
                />
                <div className="absolute inset-0 pointer-events-none film-grain-overlay opacity-[0.09] mix-blend-overlay" />
                <div className="absolute inset-0 pointer-events-none film-stains" />
                <span className="absolute top-1 left-1 font-mono text-[7px] text-[#d0bd9c] bg-black/60 px-1 py-0.5">
                  {String(frameIndex + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </button>

      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <Calendar className="w-3 h-3 text-darkroom-accent" />
          <span className="font-mono text-[10px] text-darkroom-muted tracking-wide">
            {entry.date}
          </span>
        </div>
        <h3 className="font-serif text-base font-bold text-darkroom-text mt-2 leading-snug">
          {entry.title}
        </h3>
        <span className="font-mono text-[8px] text-darkroom-accent tracking-widest2 uppercase mt-2 inline-block">
          OPEN ARCHIVE
        </span>
      </div>
    </motion.div>
  );
}

export function BehindScenes() {
  const [selected, setSelected] = useState<ArchiveEntry | null>(null);

  return (
    <div>
      <SubPageHeader
        title="闲延碎影"
        subtitle="散落的路透，未修的胶片，拼贴出最真实的时间切片。点击首图可展开整组现场高画质档案。"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-5 border-b border-darkroom-border/40">
            <div>
              <div className="flex items-center gap-3">
                <Film className="w-4 h-4 text-darkroom-accent" />
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-darkroom-text">胶片留痕</h2>
              </div>
              <p className="font-body text-sm text-darkroom-muted mt-3 max-w-2xl leading-relaxed">
                用胶片定格片场时光，把现场的细碎画面，封存在底片的颗粒之中。
              </p>
            </div>
            <span className="font-mono text-[10px] text-darkroom-accent tracking-widest2 uppercase">
              FILM TRACES · {filmTraceData.length} ARCHIVES
            </span>
          </div>

          <div className="relative pb-5">
            <div className="absolute top-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-darkroom-accent/40 to-transparent" />
            <div className="film-photo-wall pt-6">
              {filmTraceData.map((entry, index) => (
                <HangingFilmStrip key={entry.id} entry={entry} index={index} onOpen={setSelected} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 md:mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-5 border-b border-darkroom-border/40">
            <div>
              <div className="flex items-center gap-3">
                <Camera className="w-4 h-4 text-darkroom-accent" />
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-darkroom-text">片场纪实</h2>
              </div>
              <p className="font-body text-sm text-darkroom-muted mt-3 max-w-2xl leading-relaxed">
                片场日常的影像记录，收录照片与视频，留住拍摄期间一个个鲜活的瞬间。
              </p>
            </div>
            <span className="font-mono text-[10px] text-darkroom-accent tracking-widest2 uppercase">
              SET DIARY · {setDiaryData.length} ARCHIVES
            </span>
          </div>

          <div className="masonry-3">
            {setDiaryData.map((entry, index) => (
              <SceneCard key={entry.id} entry={entry} index={index} onOpen={setSelected} />
            ))}
          </div>
        </section>
      </div>

      <ArchiveModal entry={selected} onClose={() => setSelected(null)} />

      <div className="mx-auto max-w-4xl px-6 lg:px-10 pb-20 mt-8">
        <Twikoo />
      </div>
    </div>
  );
}
