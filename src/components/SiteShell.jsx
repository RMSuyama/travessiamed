'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFloating from './WhatsAppFloating';
import { initAntigravity } from '../motion/initAntigravity';
import { scrollToView } from '../utils/viewNavigation';

export default function SiteShell({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const teardown = initAntigravity(document);
    const targetId = window.location.hash.replace('#', '');

    const frame = window.requestAnimationFrame(() => {
      if (targetId) {
        scrollToView(targetId);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      teardown?.();
    };
  }, [pathname]);

  return (
    <div className="app-root">
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}
