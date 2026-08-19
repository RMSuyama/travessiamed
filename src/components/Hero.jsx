import React from 'react';
import { ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/siteContent';

export default function Hero() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;

  return (
    <section id="inicio" className="frame frame-navy-dark is-revealed hero-frame">
      <svg className="border-route" viewBox="0 0 760 640" aria-hidden="true">
        <path className="border-route-line" d="M48 540C174 472 194 348 330 326C476 302 466 152 700 88" />
        <path className="border-route-bridge" d="M286 348L378 286M302 368L394 306M318 388L410 326" />
        <circle cx="48" cy="540" r="11" />
        <circle cx="700" cy="88" r="11" />
      </svg>

      <div className="container hero-wrap">
        <div className="hero-coordinates">
          <span>25°32′S · 54°35′W</span>
          <span>Fronteira Brasil — Paraguai</span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              Medicina começa
              <span>do outro lado da ponte.</span>
            </h1>

            <p className="hero-desc">
              Estude em Ciudad del Este, more em Foz do Iguaçu e conte com uma equipe
              presente em cada etapa — da matrícula ao preparo para o CRM.
            </p>

            <div className="hero-actions">
              <a href="#formulario" className="btn btn-primary btn-lg">
                Analisar meu ingresso <ArrowRight size={18} />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-quiet">
                <MessageCircle size={19} /> Falar com um orientador
              </a>
            </div>
          </div>

          <aside className="route-dossier" aria-label="Rota acadêmica">
            <div className="route-dossier-head">
              <span className="route-country">BR</span>
              <div className="route-arrow" aria-hidden="true"><span /></div>
              <span className="route-country route-country-py">PY</span>
            </div>
            <div className="route-cities">
              <strong>FOZ</strong>
              <span>Ponte da Amizade</span>
              <strong>CDE</strong>
            </div>
            <dl className="route-data">
              <div>
                <dt>Ingresso</dt>
                <dd>Sem vestibular tradicional</dd>
              </div>
              <div>
                <dt>Mensalidade</dt>
                <dd>Desde R$ 1.500 · UCP R$ 1.825</dd>
              </div>
              <div>
                <dt>Turmas</dt>
                <dd>{siteConfig.hero.infoCard.nextTerms}</dd>
              </div>
              <div>
                <dt>Instituições</dt>
                <dd>UCP · UNADES</dd>
              </div>
            </dl>
            <div className="route-stamp">
              <img src={siteConfig.brand.logoPath} alt="" />
              <span>Acolhimento<br />dos dois lados</span>
            </div>
          </aside>
        </div>

        <ul className="hero-trust">
          {siteConfig.hero.trustChecks.map((item) => (
            <li key={item}>
              <CheckCircle2 size={16} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
