import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { siteConfig } from '../data/siteContent';
import { scrollToView } from '../utils/viewNavigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToView = (event, id) => {
    event.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname === '/') {
      window.history.replaceState(null, '', `/#${id}`);
      scrollToView(id);
      return;
    }

    navigate(`/#${id}`);
  };

  return (
    <header className="site-header">
      <div className="container header-bar">
        <a href="/#inicio" className="brand-lockup" onClick={(event) => navigateToView(event, 'inicio')}>
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
          <a href="/#universidades" onClick={(event) => navigateToView(event, 'universidades')}>Universidades</a>
          <a href="/#pilares" onClick={(event) => navigateToView(event, 'pilares')}>Como funciona</a>
          <a href="/#comparativo" onClick={(event) => navigateToView(event, 'comparativo')}>Brasil vs Paraguai</a>
          <a href="/#depoimentos" onClick={(event) => navigateToView(event, 'depoimentos')}>Alunos</a>
          <Link to="/servicos" aria-current={location.pathname === '/servicos' ? 'page' : undefined}>Serviços</Link>
          <a href="/#faq" onClick={(event) => navigateToView(event, 'faq')}>Dúvidas</a>
        </nav>

        <div className="header-cta-desktop">
          <a href="/#formulario" className="btn btn-primary" onClick={(event) => navigateToView(event, 'formulario')}>Garantir minha vaga</a>
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
          <a href="/#universidades" onClick={(event) => navigateToView(event, 'universidades')}>Universidades (UCP & UNADES)</a>
          <a href="/#pilares" onClick={(event) => navigateToView(event, 'pilares')}>Como funciona a assessoria</a>
          <a href="/#comparativo" onClick={(event) => navigateToView(event, 'comparativo')}>Comparativo Brasil vs Paraguai</a>
          <a href="/#calculadora" onClick={(event) => navigateToView(event, 'calculadora')}>Simulador de economia</a>
          <a href="/#depoimentos" onClick={(event) => navigateToView(event, 'depoimentos')}>Depoimentos</a>
          <Link to="/servicos" onClick={() => setMobileMenuOpen(false)}>Carreto e mudança</Link>
          <Link to="/parceiros" onClick={() => setMobileMenuOpen(false)}>Seja parceiro</Link>
          <a href="/#faq" onClick={(event) => navigateToView(event, 'faq')}>Perguntas frequentes</a>
          <a href="/#formulario" className="btn btn-primary" onClick={(event) => navigateToView(event, 'formulario')}>Garantir minha vaga</a>
        </div>
      )}
    </header>
  );
}
