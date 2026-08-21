import React from 'react';
import { ShieldCheck, FileText, Home, HeartPulse } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '../data/siteContent';

export default function ProcessSteps() {
  const iconMap = [
    { icon: <FileText size={24} />, bg: 'var(--crossing-soft)', color: 'var(--crossing)' },
    { icon: <ShieldCheck size={24} />, bg: 'var(--success-soft)', color: 'var(--scrub-dark)' },
    { icon: <Home size={24} />, bg: 'var(--paper-deep)', color: 'var(--ink)' },
    { icon: <HeartPulse size={24} />, bg: 'var(--gold-subtle)', color: 'var(--signal)' }
  ];

  return (
    <section id="pilares" className="frame frame-blue-light">
      <div className="container">
        
        <div className="section-intro">
          <div className="badge-pill badge-navy" style={{ marginBottom: '12px' }}>
            <ShieldCheck size={16} />
            <span>Cuidado Integral de Ponta a Ponta</span>
          </div>
          <h2 style={{ marginBottom: '12px' }}>
            Como funciona
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            Quatro etapas. Você estuda. A gente resolve o resto.
          </p>
        </div>

        <div className="grid-4">
          {siteConfig.steps.map((step, index) => {
            const currentIcon = iconMap[index] || iconMap[0];
            return (
              <div key={index} className="card-clean">
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: currentIcon.bg,
                  color: currentIcon.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  {currentIcon.icon}
                </div>
                <div style={{ fontSize: '0.8rem', color: currentIcon.color, fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Etapa {step.number}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        <Link href="/familia" className="section-continue">
          Espaço da família: canal para pais e responsáveis →
        </Link>

      </div>
    </section>
  );
}
