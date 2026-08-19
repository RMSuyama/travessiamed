import React from 'react';
import { DollarSign } from 'lucide-react';
import { siteConfig } from '../data/siteContent';

export default function Comparison() {
  return (
    <section id="comparativo" className="frame frame-navy-dark">
      <div className="container">
        
        <div className="section-intro">
          <div className="badge-pill badge-gold" style={{ marginBottom: '12px' }}>
            <DollarSign size={16} />
            <span>Transparência & Planejamento Financeiro</span>
          </div>
          <h2 style={{ marginBottom: '16px' }}>
            Comparativo Real: Faculdade Privada no Brasil x Paraguai
          </h2>
          <p style={{ fontSize: '1.05rem' }}>
            Veja por que mais de 65.000 brasileiros estão cursando Medicina no exterior com respaldo e economia real.
          </p>
        </div>

        <div className="table-responsive-wrapper" style={{ background: '#ffffff' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '640px' }}>
            <thead>
              <tr style={{ background: 'var(--navy-primary)', color: '#ffffff' }}>
                <th style={{ padding: '18px 20px', fontSize: '0.95rem', width: '28%' }}>Aspecto Avaliado</th>
                <th style={{ padding: '18px 20px', fontSize: '0.95rem', width: '36%', background: 'rgba(255, 255, 255, 0.05)' }}>Faculdade Particular no Brasil</th>
                <th style={{ padding: '18px 20px', fontSize: '0.95rem', width: '36%', background: 'var(--navy-secondary)', color: 'var(--gold-light)' }}>
                  Paraguai com a Travessia Med (UCP / UNADES)
                </th>
              </tr>
            </thead>
            <tbody>
              {siteConfig.comparisonTable.map((row, index) => {
                const isEven = index % 2 === 1;
                return (
                  <tr 
                    key={index}
                    style={{ 
                      borderBottom: index < siteConfig.comparisonTable.length - 1 ? '1px solid var(--border-light)' : 'none',
                      background: isEven ? 'var(--bg-subtle)' : '#ffffff'
                    }}
                  >
                    <td style={{ padding: '16px 20px', fontWeight: '700', color: 'var(--navy-primary)', fontSize: '0.92rem' }}>
                      {row.aspect}
                    </td>
                    <td style={{ padding: '16px 20px', color: row.brazil.startsWith('✕') ? 'var(--danger)' : 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {row.brazil}
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--scrub-dark)', fontWeight: '600', background: 'rgba(0, 168, 132, 0.06)', fontSize: '0.9rem' }}>
                      {row.paraguay}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
          ⇄ Arraste a tabela para os lados no celular para ver todas as colunas<br />
          <span style={{ marginTop: '6px', display: 'inline-block' }}>
            ⚠️ <strong>Aviso:</strong> Os valores são <strong>estimativas de referência</strong> e podem sofrer alterações a qualquer momento. Consulte nossa equipe para informações atualizadas e precisas.
          </span>
        </div>

      </div>
    </section>
  );
}
