'use client';

import { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '../data/siteContent';
import { createWhatsAppUrl } from '../utils/formSubmission';
import { scrollToView } from '../utils/viewNavigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const whatsappUrl = createWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    siteConfig.contact.whatsappMessage
  );

  const goHomeSection = (event, id) => {
    setMobileMenuOpen(false);
    if (pathname !== '/') return;

    event.preventDefault();
    window.history.replaceState(null, '', `/#${id}`);
    scrollToView(id);
  };

  return (
    <header className="site-header">
      <div className="container header-bar">
        <a href="/#inicio" className="brand-lockup" onClick={(event) => goHomeSection(event, 'inicio')}>
          <span className="logo-mark">
            <img src={siteConfig.brand.logoPath} alt={`Logo ${siteConfig.brand.name}`} />
          </span>
          <div>
            <div className="brand-wordmark">
              TRAVESSIA <span>MED</span>
            </div>
            <div className="brand-tagline">{siteConfig.brand.tagline}</div>
          </div>
        </a>

        <nav className="header-nav-desktop">
          <a href="/#universidades" onClick={(event) => goHomeSection(event, 'universidades')}>Universidades</a>
          <Link href="/custos" aria-current={pathname === '/custos' ? 'page' : undefined}>Custos</Link>
          <Link href="/familia" aria-current={pathname === '/familia' ? 'page' : undefined}>Família</Link>
          <Link href="/duvidas" aria-current={pathname === '/duvidas' ? 'page' : undefined}>Dúvidas</Link>
          <Link href="/servicos" aria-current={pathname === '/servicos' ? 'page' : undefined}>Mudança</Link>
        </nav>

        <div className="header-cta-desktop">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <a href="/#universidades" onClick={(event) => goHomeSection(event, 'universidades')}>Universidades</a>
          <Link href="/custos" onClick={() => setMobileMenuOpen(false)}>Custos e simulador</Link>
          <a href="/#pilares" onClick={(event) => goHomeSection(event, 'pilares')}>Como funciona</a>
          <Link href="/familia" onClick={() => setMobileMenuOpen(false)}>Espaço da família</Link>
          <a href="/#depoimentos" onClick={(event) => goHomeSection(event, 'depoimentos')}>Depoimentos</a>
          <Link href="/duvidas" onClick={() => setMobileMenuOpen(false)}>Dúvidas</Link>
          <Link href="/servicos" onClick={() => setMobileMenuOpen(false)}>Carreto e mudança</Link>
          <Link href="/parceiros" onClick={() => setMobileMenuOpen(false)}>Parceiros</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <MessageCircle size={16} /> Falar no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
