import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Film } from 'lucide-react';
import { motion } from 'framer-motion';

interface SubPageHeaderProps {
  title: string;
  subtitle: string;
}

export function SubPageHeader({ title, subtitle }: SubPageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="pt-24 lg:pt-32 pb-10 lg:pb-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Top bar: back + archive label */}
        <div className="flex items-center justify-between mb-10 lg:mb-14">
          <button
            onClick={() => navigate('/')}
            className="group p-1 -ml-1 text-darkroom-muted hover:text-darkroom-accent transition-all duration-300 hover:-translate-x-1"
            aria-label="返回首页"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <div className="inline-flex items-center gap-2 font-mono text-[10px] text-darkroom-muted tracking-widest2 uppercase">
            <Film className="w-3 h-3 text-darkroom-accent" />
            <span className="hidden sm:inline">延究报告 · 暗房档案馆</span>
            <span className="hidden sm:inline text-darkroom-muted/40">/</span>
            <span>DARKROOM ARCHIVE</span>
          </div>
        </div>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-darkroom-text leading-tight">
            {title.split('').map((char, i) => (
              <span
                key={i}
                className={char === '延' ? 'text-darkroom-accent develop-accent' : ''}
              >
                {char}
              </span>
            ))}
          </h1>
          <div className="mt-5 lg:mt-7 border-l-2 border-darkroom-accent/40 pl-4 lg:pl-5 max-w-2xl">
            <p className="font-body text-sm md:text-base text-darkroom-text/70 leading-relaxed text-balance">
              {subtitle}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
