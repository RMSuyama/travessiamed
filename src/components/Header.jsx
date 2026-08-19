import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../data/siteContent';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-bar">
        <a href="#inicio" className="brand-lockup">
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
          <a href="#universidades">Universidades</a>
          <a href="#pilares">Como funciona</a>
          <a href="#comparativo">Brasil vs Paraguai</a>
          <a href="#depoimentos">Alunos</a>
          <a href="#faq">Dúvidas</a>
        </nav>

        <div className="header-cta-desktop">
          <a href="#formulario" className="btn btn-primary">Garantir minha vaga</a>
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
          <a href="#universidades" onClick={closeMenu}>Universidades (UCP & UNADES)</a>
          <a href="#pilares" onClick={closeMenu}>Como funciona a assessoria</a>
          <a href="#comparativo" onClick={closeMenu}>Comparativo Brasil vs Paraguai</a>
          <a href="#calculadora" onClick={closeMenu}>Simulador de economia</a>
          <a href="#depoimentos" onClick={closeMenu}>Depoimentos</a>
          <a href="#faq" onClick={closeMenu}>Perguntas frequentes</a>
          <a href="#formulario" className="btn btn-primary" onClick={closeMenu}>Garantir minha vaga</a>
        </div>
      )}
    </header>
  );
}
