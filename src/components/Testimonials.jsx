import React from 'react';
import { UserCheck } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '../data/siteContent';

export default function Testimonials() {
  return (
    <section id="depoimentos" className="frame frame-cream">
      <div className="container">
        
        <div className="section-intro">
          <div className="badge-pill badge-green" style={{ marginBottom: '12px' }}>
            <UserCheck size={16} />
            <span>Histórias de Quem Já Está no Caminho</span>
          </div>
          <h2 style={{ marginBottom: '12px' }}>
            Quem já fez a travessia
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            Famílias, alunos e médicos revalidados.
          </p>
        </div>

        <div className="grid-3">
          {siteConfig.testimonials.map((item, index) => (
            <div key={index} className="card-clean" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ color: 'var(--warning)', marginBottom: '12px', fontSize: '1.1rem' }}>
                  {'★'.repeat(item.stars)}
                </div>
                <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.95rem' }}>
                  "{item.quote}"
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: item.color, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {item.initials}
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--navy-primary)', fontSize: '0.95rem' }}>{item.author}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/familia" className="section-continue">
          Espaço da família →
        </Link>

      </div>
    </section>
  );
}
