import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../data/siteContent';
import { scrollToView } from '../utils/viewNavigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigateTo = (event, id) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    scrollToView(id);
  };

  return (
    <header className="site-header">
      <div className="container header-bar">
        <a href="#inicio" className="brand-lockup" onClick={(event) => navigateTo(event, 'inicio')}>
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
          <a href="#universidades" onClick={(event) => navigateTo(event, 'universidades')}>Universidades</a>
          <a href="#pilares" onClick={(event) => navigateTo(event, 'pilares')}>Como funciona</a>
          <a href="#instalacao" onClick={(event) => navigateTo(event, 'instalacao')}>Mudança & reparos</a>
          <a href="#comparativo" onClick={(event) => navigateTo(event, 'comparativo')}>Brasil vs Paraguai</a>
          <a href="#depoimentos" onClick={(event) => navigateTo(event, 'depoimentos')}>Alunos</a>
          <a href="#faq" onClick={(event) => navigateTo(event, 'faq')}>Dúvidas</a>
        </nav>

        <div className="header-cta-desktop">
          <a href="#formulario" className="btn btn-primary" onClick={(event) => navigateTo(event, 'formulario')}>Garantir minha vaga</a>
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
          <a href="#universidades" onClick={(event) => navigateTo(event, 'universidades')}>Universidades (UCP & UNADES)</a>
          <a href="#pilares" onClick={(event) => navigateTo(event, 'pilares')}>Como funciona a assessoria</a>
          <a href="#instalacao" onClick={(event) => navigateTo(event, 'instalacao')}>Carreto, mudança e reparos</a>
          <a href="#comparativo" onClick={(event) => navigateTo(event, 'comparativo')}>Comparativo Brasil vs Paraguai</a>
          <a href="#calculadora" onClick={(event) => navigateTo(event, 'calculadora')}>Simulador de economia</a>
          <a href="#depoimentos" onClick={(event) => navigateTo(event, 'depoimentos')}>Depoimentos</a>
          <a href="#faq" onClick={(event) => navigateTo(event, 'faq')}>Perguntas frequentes</a>
          <a href="#formulario" className="btn btn-primary" onClick={(event) => navigateTo(event, 'formulario')}>Garantir minha vaga</a>
        </div>
      )}
    </header>
  );
}
