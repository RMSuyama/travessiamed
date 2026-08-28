import React from 'react';
import { Building2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '../data/siteContent';

export default function Universities() {
  const uni = siteConfig.universities.find((item) => item.id === 'ucp') || siteConfig.universities[0];

  return (
    <section id="universidades" className="frame frame-cream">
      <div className="container">
        <div className="section-intro">
          <div className="badge-pill badge-navy" style={{ marginBottom: '12px' }}>
            <Building2 size={16} />
            <span>Habilitada e credenciada</span>
          </div>
          <h2 style={{ marginBottom: '16px' }}>Medicina na UCP</h2>
          <p>
            Universidad Central del Paraguay, em Ciudad del Este. Hospital universitário próprio,
            ingresso sem vestibular e transferência com aproveitamento de matérias.
          </p>
        </div>

        <article className="uni-dossier">
          <div className="uni-dossier-main">
            <span className="uni-dossier-seal">{uni.sealTag}</span>
            <h3>{uni.name}</h3>
            <p>{uni.description}</p>
            <ul className="uni-facts">
              {uni.highlights.map((item) => (
                <li key={item.label}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>
                    <strong>{item.label}:</strong> {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="uni-dossier-aside">
            <div>
              <div className="uni-dossier-kicker">Mensalidade inicial</div>
              <div className="uni-dossier-price">
                {uni.monthlyLabel} <span>/mês</span>
              </div>
              {uni.monthlyDiscountLabel && (
                <div className="uni-dossier-discount">{uni.monthlyDiscountLabel}</div>
              )}
              {uni.pricingReference && (
                <div className="uni-dossier-ref">{uni.pricingReference}</div>
              )}
            </div>
            <a href="#formulario" className="btn btn-navy">
              {uni.buttonText}
            </a>
          </aside>
        </article>

        <Link href="/duvidas" className="section-continue">
          Mitos, verdades e perguntas frequentes →
        </Link>
      </div>
    </section>
  );
}
