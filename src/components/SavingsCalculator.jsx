import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

// Valores mensais estimados em reais divulgados pela UCP para 2026.2 (câmbio 1.190).
// Os valores oficiais são fixados em guaranis e variam em reais conforme o câmbio.
// 7º semestre: R$ 2.765 = 3.290.000 Gs / 1.190 (o flyer promocional repetiu R$ 2.512 por engano).
const UCP_2026_SEMESTER_TUITION = [
  1840, 1924, 2092, 2176, 2394, 2512,
  2765, 2932, 3268, 3352, 3605, 3605
];

const PROGRESSIVE_TUITION = Array.from({ length: 6 }, (_, year) => {
  const firstSemester = UCP_2026_SEMESTER_TUITION[year * 2];
  const secondSemester = UCP_2026_SEMESTER_TUITION[year * 2 + 1];
  return Math.round((firstSemester + secondSemester) / 2);
});

function calcProgressiveTotal() {
  return UCP_2026_SEMESTER_TUITION.reduce((acc, monthly) => acc + monthly * 6, 0);
}

export default function SavingsCalculator() {
  const [brazilTuition, setBrazilTuition] = useState(11000);

  const brazilTotal6Years = brazilTuition * 12 * 6;
  const pyTotal6Years = calcProgressiveTotal();
  const totalSavings = brazilTotal6Years - pyTotal6Years;

  return (
    <section id="calculadora" className="frame frame-white">
      <div className="container-narrow">

        <div className="card-highlight">
          <div className="section-intro section-intro-compact">
            <div className="badge-pill badge-gold" style={{ marginBottom: '12px' }}>
              <Calculator size={16} />
              <span>Simulador de Economia Financeira</span>
            </div>
            <h2 style={{ marginBottom: '10px' }}>
              Quanto você economiza cursando no Paraguai?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Na tabela UCP 2026.2, a mensalidade começa em <strong>R$ 1.840/mês</strong>{' '}
              no 1º semestre e chega a <strong>R$ 3.605/mês</strong> no 6º ano.
              A tabela abaixo usa a média de cada ano.
            </p>
          </div>

          {/* Tabela de progressão por ano */}
          <div style={{ marginBottom: '28px', overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.88rem',
              textAlign: 'center',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(61, 99, 255, 0.1)' }}>
                  <th style={{
                    padding: '10px 14px',
                    fontWeight: '700',
                    color: 'var(--navy-primary)',
                    textAlign: 'left'
                  }}>
                    Ano
                  </th>
                  {PROGRESSIVE_TUITION.map((_, i) => (
                    <th key={i} style={{
                      padding: '10px 8px',
                      fontWeight: '700',
                      color: 'var(--navy-primary)'
                    }}>
                      {i + 1}º
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{
                    padding: '10px 14px',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    textAlign: 'left'
                  }}>
                    🇵🇾 UCP 2026.2
                  </td>
                  {PROGRESSIVE_TUITION.map((val, i) => (
                    <td key={i} style={{
                      padding: '10px 8px',
                      fontWeight: '700',
                      color: 'var(--gold-dark)'
                    }}>
                      R$ {val.toLocaleString('pt-BR')}
                    </td>
                  ))}
                </tr>
                <tr style={{ backgroundColor: 'rgba(11, 25, 48, 0.04)' }}>
                  <td style={{
                    padding: '10px 14px',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    textAlign: 'left'
                  }}>
                    🇧🇷 Brasil (fixo)
                  </td>
                  {PROGRESSIVE_TUITION.map((_, i) => (
                    <td key={i} style={{
                      padding: '10px 8px',
                      fontWeight: '700',
                      color: 'var(--danger)'
                    }}>
                      R$ {brazilTuition.toLocaleString('pt-BR')}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Slider Brasil */}
          <div style={{ marginBottom: '28px' }}>
            <label
              className="form-label"
              style={{ marginBottom: '8px', display: 'block' }}
            >
              Ajuste a mensalidade estimada no Brasil (R$):
            </label>
            <input
              type="range"
              min="8000"
              max="16000"
              step="500"
              value={brazilTuition}
              onChange={(e) => setBrazilTuition(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--navy-primary)', marginBottom: '8px' }}
            />
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-primary)' }}>
              R$ {brazilTuition.toLocaleString('pt-BR')} / mês
            </div>
          </div>

          {/* RESULT CARD */}
          <div
            className="calc-results-grid"
            style={{
              background: 'var(--navy-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              color: '#ffffff'
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--on-dark-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Custo Total no Brasil
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ff9489' }}>
                R$ {brazilTotal6Years.toLocaleString('pt-BR')}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--on-dark-muted)' }}>6 anos de mensalidades</div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--on-dark-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Custo no Paraguai
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#5ee0bf' }}>
                R$ {pyTotal6Years.toLocaleString('pt-BR')}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--on-dark-muted)' }}>tabela regular UCP 2026.2</div>
            </div>

            <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.15)', paddingLeft: '16px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold-light)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: '700' }}>
                Economia Estimada
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: '900', color: 'var(--gold-light)' }}>
                R$ {totalSavings.toLocaleString('pt-BR')}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--on-dark-muted)' }}>Capital preservado para sua família</div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <a href="#formulario" className="btn btn-primary" style={{ padding: '14px 28px' }}>
              Quero Planejar Meu Ingresso
            </a>
          </div>

          {/* Disclaimer */}
          <p style={{
            marginTop: '20px',
            textAlign: 'center',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            lineHeight: '1.6',
            borderTop: '1px solid rgba(61, 99, 255, 0.24)',
            paddingTop: '16px'
          }}>
            ⚠️ <strong>Aviso importante:</strong> A UCP fixa os valores originais em guaranis. Os valores em reais são estimativas da tabela oficial 2026.2 com câmbio de 1.190 Gs por R$ 1,00 e podem variar. Matrícula à parte: R$ 1.800. Descontos promocionais não foram considerados no total.
          </p>

        </div>

      </div>
    </section>
  );
}
