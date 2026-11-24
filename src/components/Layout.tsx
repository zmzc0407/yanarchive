import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Menu, X, Cat } from 'lucide-react';

const navItems = [
  { path: '/', label: '首页', en: 'HOME' },
  { path: '/works', label: '延而有戏', en: 'WORKS' },
  { path: '/behind-scenes', label: '闲延碎影', en: 'SCENES' },
  { path: '/itinerary', label: '如约延见', en: 'ITINERARY' },
  { path: '/messages', label: '延为心声', en: 'MESSAGES' },
];

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`transition-all duration-500 ${
          isHome
            ? 'bg-transparent'
            : 'bg-darkroom-bg/85 backdrop-blur-md border-b border-darkroom-border/50'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left: Logo + badge */}
            <Link to="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
              <span className="font-serif font-bold text-lg lg:text-xl text-darkroom-text tracking-wide group-hover:text-darkroom-accent transition-colors duration-300 whitespace-nowrap">
                延究报告
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-darkroom-accent/40 rounded-full text-[10px] font-mono text-darkroom-accent tracking-widest2 uppercase group-hover:border-darkroom-accent/70 transition-all duration-300 whitespace-nowrap">
                <Settings className="w-2.5 h-2.5" />
                暗房档案馆
              </span>
            </Link>

            {/* Desktop nav: full 4-char titles */}
            <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `relative px-2.5 lg:px-3.5 py-2 font-body text-sm tracking-wide transition-colors duration-300 whitespace-nowrap ${
                      isActive
                        ? 'text-darkroom-text'
                        : 'text-darkroom-muted hover:text-darkroom-text'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-px bg-darkroom-accent"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Mobile: hamburger button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 text-darkroom-muted hover:text-darkroom-accent transition-colors"
              aria-label="菜单"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-darkroom-bg/95 backdrop-blur-md border-b border-darkroom-border/50"
            >
              <nav className="flex flex-col px-5 py-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-3 border-b border-darkroom-border/20 last:border-0 font-body text-base transition-colors ${
                        isActive ? 'text-darkroom-accent' : 'text-darkroom-text/80'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] text-darkroom-muted tracking-widest2 uppercase">
                      {item.en}
                    </span>
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-darkroom-border/40 mt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 lg:py-14">
        {/* Two-column layout: restored side-by-side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Left card: the quote */}
          <div className="border border-darkroom-border/40 rounded-sm p-6 lg:p-8 bg-darkroom-surface/30 flex flex-col justify-center">
            <p className="font-mono text-xs text-darkroom-accent tracking-widest2 uppercase mb-4">
              底片会褪色.
            </p>
            <p className="font-serif text-2xl lg:text-3xl font-bold text-darkroom-text leading-snug">
              但故事会被记得更久。
            </p>
            <p className="font-mono text-xs text-darkroom-muted mt-6 tracking-wide">
              记录者 · 持续显影中
            </p>
          </div>

          {/* Right card: darkroom mode status */}
          <div className="border border-darkroom-border/40 rounded-sm p-6 lg:p-8 bg-darkroom-surface/30 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-xs text-darkroom-muted tracking-widest2 uppercase">
                档案状态 / ARCHIVE STATUS
              </p>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-darkroom-accent tracking-widest2 uppercase border border-darkroom-accent/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-darkroom-accent animate-pulse" />
                DARKROOM MODE
              </span>
            </div>
            <p className="font-body text-sm text-darkroom-text/70 leading-relaxed">
              暗房持续显影中，新底片将不定期归档。
            </p>
            <p className="font-body text-sm text-darkroom-text/70 leading-relaxed mt-2">
              所有内容由记录者手工整理，未经授权不得转载。
            </p>
          </div>
        </div>

        {/* Copyright row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8 border-t border-darkroom-border/30">
          <a
            href="https://v.douyin.com/vCuMhtNsns4/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-darkroom-muted hover:text-darkroom-accent transition-colors tracking-wide"
          >
            Made by 之末之初-
          </a>
          <p className="font-mono text-[11px] text-darkroom-muted tracking-wide text-center">
            延究报告·档案馆·© {new Date().getFullYear()} ZhiMoZhiChu. All Rights Reserved.
          </p>
          <p className="font-mono text-[11px] text-darkroom-muted tracking-wide inline-flex items-center gap-1.5">
            档案由一只
            <Cat className="w-3 h-3 text-darkroom-accent inline" />
           监督整理
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="film-grain min-h-screen flex flex-col">
      {/* SVG filter for develop effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="develop-distort">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
