'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFloating from './WhatsAppFloating';
import { initAntigravity } from '../motion/initAntigravity';
import { scrollToView } from '../utils/viewNavigation';

function scrollToHash() {
  const targetId = window.location.hash.replace('#', '');
  if (targetId) {
    scrollToView(targetId);
    return;
  }
  window.scrollTo({ top: 0, behavior: 'auto' });
}

export default function SiteShell({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const teardown = initAntigravity(document);

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToHash);
    });

    window.addEventListener('hashchange', scrollToHash);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', scrollToHash);
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
