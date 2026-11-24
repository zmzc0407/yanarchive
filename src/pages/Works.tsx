import { motion } from 'framer-motion';
import { Film, UserRound } from 'lucide-react';
import { SubPageHeader } from '@/components/SubPageHeader';
import { Twikoo } from '@/components/Twikoo';
import { worksTimeline } from '@/data';

type WorkTimelineEntry = (typeof worksTimeline)[number];

const years = ['2026', '2025', '2024'];

function WorkRecord({ work, index }: { work: WorkTimelineEntry; index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.025, 0.2) }}
      className="relative grid md:grid-cols-[1fr_56px_1fr] gap-4 md:gap-0 items-center"
    >
      <div className="absolute left-[13px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-darkroom-accent ring-4 ring-darkroom-bg z-10 md:left-1/2 md:-translate-x-1/2" />

      <div
        className={`pl-10 md:pl-0 ${
          isLeft ? 'md:col-start-1 md:pr-8' : 'md:col-start-3 md:pl-8'
        }`}
      >
        <div className="group flex items-center gap-4 border border-darkroom-border/40 bg-darkroom-surface/30 p-3 md:p-4 hover:border-darkroom-accent/50 hover:bg-darkroom-surface/50 transition-all duration-300">
          <div className="min-w-0">
            <p className="font-mono text-[9px] text-darkroom-muted tracking-widest2 uppercase mb-2">
              FRAME {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="font-serif text-base md:text-lg font-bold text-darkroom-text leading-snug group-hover:text-darkroom-accent transition-colors">
              {work.title}
            </h3>
            <p className="flex items-center gap-1.5 font-body text-sm text-darkroom-muted mt-2">
              <UserRound className="w-3.5 h-3.5 text-darkroom-accent shrink-0" />
              饰 {work.role}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Works() {
  return (
    <div>
      <SubPageHeader
        title="延而有戏"
        subtitle="卷宗徐徐摊开，戏文落笔成册。这里汇集现阶段收集到的角色与剧目，各色人物故事收录在册，档案会持续搜集与补录。"
      />

      <div className="mx-auto max-w-6xl px-6 lg:px-10 pb-24">
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-7 -translate-x-1/2 film-sprocket-rail opacity-80" />

          <div className="relative space-y-16 md:space-y-24">
            {years.map((year) => {
              const yearWorks = worksTimeline.filter((work) => work.year === year);

              return (
                <section key={year} className="relative">
                  <div className="relative flex items-center justify-center mb-8 md:mb-10">
                    <div className="absolute left-0 right-0 h-px bg-darkroom-border/40" />
                    <div className="relative flex items-center gap-3 px-5 bg-darkroom-bg border border-darkroom-border/50 py-2">
                      <Film className="w-4 h-4 text-darkroom-accent" />
                      <span className="font-mono text-2xl md:text-3xl text-darkroom-accent tracking-widest2">
                        {year}
                      </span>
                      <span className="font-mono text-[9px] text-darkroom-muted tracking-widest2 uppercase">
                        ARCHIVE REEL
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-5">
                    {yearWorks.map((work, index) => (
                      <WorkRecord key={work.id} work={work} index={index} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        <div className="mt-16 flex items-center justify-center gap-3 border-t border-darkroom-border/30 pt-6">
          <span className="h-px w-10 bg-darkroom-accent/40" />
          <p className="font-mono text-[10px] text-darkroom-muted tracking-widest2 uppercase">
            ARCHIVE CONTINUES · 持续搜集与补录
          </p>
          <span className="h-px w-10 bg-darkroom-accent/40" />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-10 pb-20 mt-8">
        <Twikoo />
      </div>
    </div>
  );
}
