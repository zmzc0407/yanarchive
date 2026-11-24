import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FolderOpen, Film, Play } from 'lucide-react';
import type { ArchiveEntry } from '@/types';

interface ArchiveModalProps {
  entry: ArchiveEntry | null;
  onClose: () => void;
}

export function ArchiveModal({ entry, onClose }: ArchiveModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (entry) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [entry, onClose]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {entry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-darkroom-bg/90 backdrop-blur-xl" />

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto scrollbar-hide bg-darkroom-surface/60 border border-darkroom-border/50 rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar: breadcrumb + close */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-5 md:px-8 py-4 bg-darkroom-surface/80 backdrop-blur-sm border-b border-darkroom-border/30">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <FolderOpen className="w-4 h-4 text-darkroom-accent shrink-0" />
                <span className="font-mono text-[11px] md:text-xs text-darkroom-muted tracking-widest2 uppercase whitespace-nowrap">
                  ARCHIVE FOLDER · 展开胶片组
                </span>
                <span className="hidden md:inline font-mono text-xs text-darkroom-muted/50">/</span>
                <span className="hidden md:inline font-body text-sm text-darkroom-text truncate">
                  《{entry.title}》
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-darkroom-muted hover:text-darkroom-accent transition-colors shrink-0"
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content body */}
            <div className="px-5 md:px-8 py-6 md:py-8">
              {/* Title block */}
              <div className="mb-6">
                <span className="font-mono text-[10px] text-darkroom-accent tracking-widest2 uppercase">
                  {entry.category}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-darkroom-text mt-2">
                  {entry.title}
                </h2>
                <p className="font-mono text-xs text-darkroom-muted mt-1 tracking-wide">
                  {entry.subtitle} · {entry.date}
                </p>
              </div>

              {/* Info strip */}
              <div className="border-l-2 border-darkroom-accent/50 pl-4 mb-8">
                <p className="font-body text-sm md:text-base text-darkroom-text/80 leading-relaxed">
                  {entry.description}
                </p>
              </div>

              {/* Media grid */}
              <div className="masonry-3">
                {entry.frames.map((frame, i) => (
                  <motion.figure
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                    className="masonry-item group relative"
                  >
                    {/* Film frame border */}
                    <div className="relative overflow-hidden rounded-sm border border-darkroom-border/40 bg-darkroom-bg">
                      {/* Frame label */}
                      <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-sm">
                        <span className="font-mono text-[9px] text-darkroom-text tracking-widest2 uppercase">
                          {frame.label}
                        </span>
                      </div>
                      {frame.isVideo ? (
                        <>
                          <video
                            src={frame.url}
                            controls
                            playsInline
                            preload="metadata"
                            className="natural-media transition-opacity duration-500"
                          />
                          <div className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-sm pointer-events-none">
                            <Play className="w-2.5 h-2.5 text-darkroom-accent fill-darkroom-accent" />
                            <span className="font-mono text-[8px] text-darkroom-accent tracking-widest2 uppercase">VIDEO</span>
                          </div>
                        </>
                      ) : (
                        <img
                          src={frame.url}
                          alt={frame.caption}
                          loading="lazy"
                          className="natural-media transition-opacity duration-500"
                        />
                      )}
                      {/* Subtle scanline overlay */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/20" />
                    </div>
                    <figcaption className="mt-2 font-body text-xs text-darkroom-muted leading-relaxed" style={{ display: 'none' }}>
                      {frame.caption}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>

              {/* Bottom status bar */}
              <div className="mt-8 pt-5 border-t border-darkroom-border/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] text-darkroom-muted tracking-wide">
                  <Film className="w-3 h-3 text-darkroom-accent" />
                  共收录 {entry.frames.length} 帧底片 / 影像资料
                </span>
                <span className="font-mono text-[11px] text-darkroom-muted/60 tracking-wide">
                  按 ESC 或点击遮罩退出
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
