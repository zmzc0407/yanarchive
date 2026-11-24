import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Music,
  Hash,
  BookOpen,
  Cherry,
  ArrowRight,
  FolderOpen,
} from 'lucide-react';
import { FilmStrip } from '@/components/FilmStrip';
import { filmTraceData, setDiaryData, itineraryMediaData } from '@/mediaData';
import type { ArchiveEntry } from '@/types';

const archiveIndexItems = [
  {
    path: '/works',
    title: '延而有戏',
    subtitle: '角色万千，光影留痕。',
    desc: '影视作品影像汇总',
    en: 'FILMOGRAPHY',
  },
  {
    path: '/behind-scenes',
    title: '闲延碎影',
    subtitle: '片场一隅，隙光偶拾。',
    desc: '剧组路透纪实存档',
    en: 'BEHIND THE SCENES',
  },
  {
    path: '/itinerary',
    title: '如约延见',
    subtitle: '相逢有时，定格当下。',
    desc: '机场、商务图集收录',
    en: 'ITINERARY',
  },
  {
    path: '/messages',
    title: '延为心声',
    subtitle: '字句寄意，以此叙说。',
    desc: '访客留言板块',
    en: 'MESSAGES',
  },
];

const socialLinks = [
  { name: '抖音', icon: Music, url: 'https://v.douyin.com/vt5gURoQooQ/', badge: '' },
  { name: '花絮号', icon: Music, url: 'https://v.douyin.com/DBZ4t0J2MVQ/', badge: '花絮' },
  { name: '微博', icon: Hash, url: 'https://weibo.com/u/7969137426', badge: '' },
  { name: '小红书', icon: BookOpen, url: 'https://xhslink.cn/o/3yzQrGJNJbw', badge: '' },
  { name: '红果', icon: Cherry, url: 'https://novelquickapp.com/s/sP2DxEg13cA/', badge: '' },
];

// ── Dynamic latest entries: merge all media arrays, sort by date desc ──
function parseDate(dateStr: string): number {
  const m = dateStr.match(/(\d{2})\.(\d{1,2})\.(\d{1,2})/);
  if (!m) return 0;
  return parseInt(m[1]) * 10000 + parseInt(m[2]) * 100 + parseInt(m[3]);
}

type RecentItem = {
  date: string;
  title: string;
  type: string;
  thumb: string;
  target: string;
};

function buildRecentList(): RecentItem[] {
  const all: { entry: ArchiveEntry; type: string; target: string }[] = [
    ...itineraryMediaData.map((e) => ({ entry: e, type: 'ENCOUNTER', target: '/itinerary' })),
    ...setDiaryData.map((e) => ({ entry: e, type: 'SET DIARY', target: '/behind-scenes' })),
    ...filmTraceData.map((e) => ({ entry: e, type: 'FILM TRACES', target: '/behind-scenes' })),
  ];
  return all
    .sort((a, b) => parseDate(b.entry.date) - parseDate(a.entry.date))
    .slice(0, 6)
    .map(({ entry, type, target }) => ({
      date: entry.date,
      title: entry.title,
      type,
      thumb: entry.coverImage,
      target,
    }));
}

const recentList = buildRecentList();

// ── Replaceable hero images (swap these URLs to update the film strip) ──
const heroFilmImages = [
  '/images/IMG_5250.jpeg',
  'https://images.pexels.com/photos/12179119/pexels-photo-12179119.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/34658408/pexels-photo-34658408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="pt-16 lg:pt-20">
      {/* ===== Hero Section: left-right split ===== */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* Darkroom atmosphere background */}
        <div className="absolute inset-0 darkroom-atmosphere" />
        {/* Faint background image */}
        <div className="absolute inset-0">
          <img
            src={heroFilmImages[0]}
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-darkroom-bg/80 via-darkroom-bg/88 to-darkroom-bg" />

        {/* Drying line — horizontal rope near top with hanging film clips */}
        <div className="absolute top-[12%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-darkroom-accent/20 to-transparent" />
        {/* Clip 1 */}
        <div className="absolute top-[12%] left-[18%] w-px h-10 bg-darkroom-accent/15" />
        <div className="absolute top-[calc(12%+2.5rem)] left-[18%] -translate-x-1/2 w-10 h-14 rounded-[1px] border border-darkroom-accent/10 bg-darkroom-surface/20 darkroom-img opacity-20" />
        {/* Clip 2 */}
        <div className="absolute top-[12%] right-[22%] w-px h-6 bg-darkroom-accent/15" />
        <div className="absolute top-[calc(12%+1.5rem)] right-[22%] translate-x-1/2 w-8 h-10 rounded-[1px] border border-darkroom-accent/10 bg-darkroom-surface/20 darkroom-img opacity-15" />
        {/* Clip 3 — far left small */}
        <div className="absolute top-[12%] left-[8%] w-px h-8 bg-darkroom-accent/10" />
        <div className="absolute top-[calc(12%+2rem)] left-[8%] -translate-x-1/2 w-6 h-8 rounded-[1px] border border-darkroom-accent/10 bg-darkroom-surface/20 opacity-20" />

        {/* Drying line — lower, with hanging negatives */}
        <div className="absolute bottom-[15%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-darkroom-muted/10 to-transparent" />
        <div className="absolute bottom-[15%] left-[25%] w-px h-8 bg-darkroom-muted/8" />
        <div className="absolute bottom-[calc(15%+2rem)] left-[25%] -translate-x-1/2 w-24 h-5 rounded-[1px] bg-darkroom-surface/10 border border-darkroom-border/20 opacity-30 darkroom-img" />
        <div className="absolute bottom-[15%] right-[15%] w-px h-6 bg-darkroom-muted/8" />
        <div className="absolute bottom-[calc(15%+1.5rem)] right-[15%] translate-x-1/2 w-16 h-4 rounded-[1px] bg-darkroom-surface/10 border border-darkroom-border/20 opacity-20" />

        {/* Film grain overlay on the section */}
        <div className="absolute inset-0 pointer-events-none film-grain-overlay opacity-[0.05]" />

        {/* Content: two-column grid, vertically centered */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 w-full py-12 lg:py-0">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-10 lg:gap-12">
            {/* ===== Left Column: Text ===== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col"
            >
              {/* Light-orange caption with blinking indicator dot */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2.5 mb-5 md:mb-7"
              >
                <span
                  className="indicator-dot inline-block rounded-full shrink-0"
                  style={{ width: '7px', height: '7px', backgroundColor: '#d4a574' }}
                />
                <span
                  className="font-mono text-xs md:text-sm tracking-widest2 uppercase"
                  style={{ color: '#d4a574' }}
                >
                  一座关于演员王培延的暗房档案馆
                </span>
              </motion.div>

              {/* Large artistic title — bigger and bolder */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif font-bold text-darkroom-text leading-[1.1] develop-title"
              >
                <span className="block text-6xl md:text-7xl lg:text-8xl">底片所载</span>
                <span className="block text-6xl md:text-7xl lg:text-8xl mt-2 md:mt-3">
                  皆是<span className="text-darkroom-accent develop-accent">延</span>说
                </span>
              </motion.h1>

              {/* Korean + ALL FOR WPY line, left-aligned */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-left text-sm md:text-base text-darkroom-muted/70 leading-relaxed mt-8 md:mt-10 max-w-md"
              >
                배연이가 있는 그대로 사랑한다. // ALL FOR WPY
              </motion.p>

              {/* Description, left-aligned */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-left font-body text-sm md:text-base text-darkroom-muted leading-relaxed mt-5 md:mt-6 max-w-xl text-balance"
              >
                在光影交错的时间里，我们收藏关于他的每一帧底片，等待被再次打捞、注视、延续。
              </motion.p>

              {/* Social links pill — unchanged */}
              <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-2 md:gap-2.5 px-4 md:px-5 py-3 md:py-4 rounded-full border border-darkroom-border/50 bg-darkroom-surface/40 backdrop-blur-md w-fit max-w-full">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center gap-2 px-2.5 md:px-3.5 py-1.5 rounded-full border border-transparent hover:border-darkroom-accent/40 hover:bg-darkroom-accent/10 transition-all duration-300"
                    >
                      <Icon className="w-4 h-4 text-darkroom-muted group-hover:text-darkroom-accent transition-colors" />
                      <span className="font-mono text-[11px] md:text-xs text-darkroom-muted group-hover:text-darkroom-text tracking-wide transition-colors whitespace-nowrap">
                        {social.name}
                      </span>
                      {social.badge && (
                        <span className="absolute -top-1.5 -right-0.5 px-1.5 py-px text-[8px] font-mono bg-darkroom-accent text-darkroom-bg rounded-full tracking-wide leading-none">
                          {social.badge}
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* ===== Right Column: Single vertical film frame ===== */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-[min(76vw,280px)] flex-shrink-0 mx-auto md:mx-0 md:self-center md:-translate-x-12 lg:-translate-x-20"
            >
              <FilmStrip images={[heroFilmImages[0]]} maxWidth={280} portrait />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator — unchanged */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-darkroom-muted tracking-widest2 uppercase">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-darkroom-accent to-transparent"
          />
        </motion.div>
      </section>

      {/* ===== Archive Index Section ===== */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-darkroom-border/40">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-darkroom-text">
              档案索引
            </h2>
            <p className="font-mono text-xs text-darkroom-accent tracking-widest2 uppercase mt-1">
              ARCHIVE INDEX
            </p>
          </div>
          <p className="font-mono text-[11px] md:text-xs text-darkroom-muted tracking-widest2 uppercase">
            CLICKS TO NAVIGATE INDEPENDENT PAGES
          </p>
        </div>

        {/* List cards */}
        <div className="space-y-0">
          {archiveIndexItems.map((item, i) => (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group w-full text-left border-t border-darkroom-border/30 last:border-b py-6 md:py-7 px-2 md:px-4 hover:bg-darkroom-surface/30 transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-4 md:gap-8 min-w-0 flex-1">
                  <span className="font-mono text-xs text-darkroom-muted tracking-widest2 shrink-0">
                    0{i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-darkroom-text group-hover:text-darkroom-accent transition-colors duration-300">
                        {item.title}
                      </h3>
                      <span className="font-mono text-[10px] text-darkroom-muted tracking-widest2 uppercase">
                        {item.en}
                      </span>
                    </div>
                    <p className="font-body text-sm md:text-base text-darkroom-muted mt-1">
                      {item.subtitle}
                      <span className="hidden md:inline text-darkroom-muted/50 ml-2">
                        · {item.desc}
                      </span>
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-darkroom-muted group-hover:text-darkroom-accent transition-all duration-300 group-hover:translate-x-1 shrink-0" />
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ===== Latest frames: compact info list ===== */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-12">
        <div className="flex items-center gap-3 mb-5">
          <FolderOpen className="w-4 h-4 text-darkroom-accent" />
          <h3 className="font-mono text-xs text-darkroom-muted tracking-widest2 uppercase">
            LATEST FRAMES · 最新收录
          </h3>
        </div>
        <div className="border-t border-darkroom-border/30">
          {recentList.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => navigate(item.target)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="group flex items-center gap-4 w-full text-left border-b border-darkroom-border/20 py-3 px-2 hover:bg-darkroom-surface/30 transition-all duration-300 cursor-pointer"
            >
              {/* Tiny thumbnail */}
              <div className="w-9 h-9 rounded-sm overflow-hidden border border-darkroom-border/30 shrink-0">
                <img
                  src={item.thumb}
                  alt=""
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
              {/* Date */}
              <span className="font-mono text-[11px] text-darkroom-accent tracking-wide whitespace-nowrap shrink-0 w-24">
                {item.date}
              </span>
              {/* Title */}
              <span className="font-body text-sm text-darkroom-text/80 group-hover:text-darkroom-text transition-colors flex-1 min-w-0 truncate">
                {item.title}
              </span>
              {/* Type badge */}
              <span className="hidden sm:inline font-mono text-[9px] text-darkroom-muted tracking-widest2 uppercase border border-darkroom-border/40 px-1.5 py-0.5 rounded-sm shrink-0">
                {item.type}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-darkroom-muted/50 group-hover:text-darkroom-accent group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}
