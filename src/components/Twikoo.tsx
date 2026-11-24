import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    twikoo?: {
      init: (opts: { envId: string; el: HTMLElement | string; path?: string }) => void;
    };
  }
}

const TWIKOO_ENV_ID = 'https://twikoo-netlify-rrsr.netlify.app/.netlify/functions/twikoo';

export function Twikoo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!containerRef.current) return;

    const initTwikoo = async () => {
      const twikoo = (await import('twikoo')).default;
      window.twikoo = twikoo;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        twikoo.init({
          envId: TWIKOO_ENV_ID,
          el: containerRef.current,
          path: location.pathname,
        });
      }
    };

    initTwikoo();
  }, [location.pathname]);

  return <div ref={containerRef} className="twikoo-container" />;
}
