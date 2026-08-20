import React, { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PartnersPage from './pages/PartnersPage';
import PrivacyPage from './pages/PrivacyPage';
import SharkPage from './pages/SharkPage';
import { initAntigravity } from './motion/initAntigravity';
import { scrollToView } from './utils/viewNavigation';

function SiteLayout() {
  const location = useLocation();

  useEffect(() => {
    let teardown;
    const animationFrame = window.requestAnimationFrame(() => {
      teardown = initAntigravity(document);
      const targetId = location.hash.replace('#', '');

      if (targetId) {
        window.requestAnimationFrame(() => scrollToView(targetId));
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      teardown?.();
    };
  }, [location.pathname, location.hash]);

  return (
    <div className={`app-root${location.pathname === '/' ? ' has-view-toc' : ''}`}>
      <TopBar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="shark" element={<SharkPage />} />
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="servicos" element={<ServicesPage />} />
        <Route path="parceiros" element={<PartnersPage />} />
        <Route path="privacidade" element={<PrivacyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
