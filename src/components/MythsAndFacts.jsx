import React from 'react';
import { HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { siteConfig } from '../data/siteContent';

export default function MythsAndFacts() {
  return (
    <section id="mitos" className="frame frame-white">
      <div className="container">
        
        <div className="section-intro">
          <div className="badge-pill badge-navy" style={{ marginBottom: '12px' }}>
            <HelpCircle size={16} />
            <span>Mitos & Verdades</span>
          </div>
          <h2 style={{ marginBottom: '16px' }}>
            Tudo o que você precisa saber sem enrolação
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            Separamos as principais dúvidas e medos que alunos e familiares costumam ter antes de iniciar essa jornada transformadora.
          </p>
        </div>

        <div className="grid-2">
          {siteConfig.mythsAndFacts.map((item, index) => (
            <div key={index} className="card-clean" style={{ borderLeft: '4px solid var(--gold-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                <AlertCircle size={20} color="var(--danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-primary)' }}>
                  "{item.myth}"
                </h3>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'var(--bg-subtle)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <CheckCircle2 size={20} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.6 }}>
                  <strong>A Realidade:</strong> {item.fact}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
