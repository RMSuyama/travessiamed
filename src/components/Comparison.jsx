import React from 'react';
import { DollarSign } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '../data/siteContent';

export default function Comparison() {
  return (
    <section id="comparativo" className="frame frame-navy-dark">
      <div className="container">
        <div className="section-intro">
          <div className="badge-pill badge-gold" style={{ marginBottom: '12px' }}>
            <DollarSign size={16} />
            <span>Brasil × Paraguai</span>
          </div>
          <h2 style={{ marginBottom: '12px' }}>
            O mesmo sonho, outro orçamento.
          </h2>
          <p>
            Mensalidade UCP a partir de R$ 1.655. Vida em Foz, aula em Ciudad del Este.
          </p>
        </div>

        <dl className="cost-strip">
          {siteConfig.costOfLiving.map((item) => (
            <div key={item.item} className="cost-strip-item">
              <dt>{item.shortItem || item.item}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="table-responsive-wrapper" style={{ background: '#ffffff' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '640px' }}>
            <thead>
              <tr style={{ background: 'var(--navy-primary)', color: '#ffffff' }}>
                <th style={{ padding: '18px 20px', fontSize: '0.95rem', width: '22%' }}> </th>
                <th style={{ padding: '18px 20px', fontSize: '0.95rem', width: '39%', background: 'rgba(255, 255, 255, 0.05)' }}>Brasil particular</th>
                <th style={{ padding: '18px 20px', fontSize: '0.95rem', width: '39%', background: 'var(--navy-secondary)', color: 'var(--gold-light)' }}>
                  Paraguai · UCP
                </th>
              </tr>
            </thead>
            <tbody>
              {siteConfig.comparisonTable.map((row, index) => {
                const isEven = index % 2 === 1;
                return (
                  <tr
                    key={row.aspect}
                    style={{
                      borderBottom: index < siteConfig.comparisonTable.length - 1 ? '1px solid var(--border-light)' : 'none',
                      background: isEven ? 'var(--bg-subtle)' : '#ffffff'
                    }}
                  >
                    <td style={{ padding: '16px 20px', fontWeight: '700', color: 'var(--navy-primary)', fontSize: '0.92rem' }}>
                      {row.aspect}
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {row.brazil}
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--scrub-dark)', fontWeight: '600', background: 'rgba(26, 92, 58, 0.08)', fontSize: '0.9rem' }}>
                      {row.paraguay}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="section-note">
          Valores em reais são estimativas da tabela UCP 2026.2 (câmbio 1.190). Matrícula UCP: R$ 1.800.
        </p>
        <Link href="/custos" className="section-continue">
          Custo de vida e simulador de economia →
        </Link>
      </div>
    </section>
  );
}
