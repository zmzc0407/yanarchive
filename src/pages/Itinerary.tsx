import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowUpRight, Play } from 'lucide-react';
import { SubPageHeader } from '@/components/SubPageHeader';
import { ArchiveModal } from '@/components/ArchiveModal';
import { Twikoo } from '@/components/Twikoo';
import { itineraryMediaData } from '@/mediaData';
import type { ArchiveEntry } from '@/types';

export function Itinerary() {
  const [selected, setSelected] = useState<ArchiveEntry | null>(null);

  return (
    <div>
      <SubPageHeader
        title="如约延见"
        subtitle="收录旅途与公开活动里的影像，记录每一次奔赴相见的时刻，留存短暂相遇里的模样。"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-20">
        <div className="masonry-3">
          {itineraryMediaData.map((entry, i) => (
            <motion.button
              key={entry.id}
              onClick={() => setSelected(entry)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="masonry-item group text-left"
            >
              <div className="relative overflow-hidden rounded-sm border border-darkroom-border/40 bg-darkroom-surface/20 hover:border-darkroom-accent/40 transition-all duration-500">
                <div className="relative overflow-hidden">
                  <img
                    src={entry.coverImage}
                    alt={entry.title}
                    loading="lazy"
                    className="natural-media group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkroom-bg/90 via-darkroom-bg/20 to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-sm">
                    <span className="font-mono text-[9px] text-darkroom-text tracking-widest2 uppercase">
                      {entry.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-darkroom-bg/50 backdrop-blur-sm border border-darkroom-border/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-darkroom-accent/20">
                    <ArrowUpRight className="w-3.5 h-3.5 text-darkroom-accent" />
                  </div>
                  {entry.frames.some((f) => f.isVideo) && (
                    <span className="absolute top-12 right-3 flex items-center gap-1 px-2 py-1 bg-black/55 backdrop-blur-sm rounded-sm">
                      <Play className="w-2.5 h-2.5 text-darkroom-accent fill-darkroom-accent" />
                      <span className="font-mono text-[8px] text-darkroom-accent tracking-widest2 uppercase">VIDEO</span>
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-darkroom-accent" />
                    <span className="font-mono text-[10px] text-darkroom-text tracking-wide">
                      {entry.date}
                    </span>
                  </div>
                </div>

                <div className="p-5 lg:p-6">
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-darkroom-accent shrink-0 mt-1" />
                    <h3 className="font-serif text-lg font-bold text-darkroom-text group-hover:text-darkroom-accent transition-colors duration-300 leading-snug">
                      {entry.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-darkroom-muted leading-relaxed line-clamp-2">
                    {entry.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-darkroom-border/20 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-darkroom-muted tracking-widest2 uppercase">
                      {entry.frames.length} FRAMES
                    </span>
                    <span className="font-mono text-[10px] text-darkroom-accent tracking-widest2 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      展开档案 →
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <ArchiveModal entry={selected} onClose={() => setSelected(null)} />

      <div className="mx-auto max-w-4xl px-6 lg:px-10 pb-20 mt-8">
        <Twikoo />
      </div>
    </div>
  );
}
