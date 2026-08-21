import React from 'react';
import { DollarSign, Home, Coffee, Bus, GraduationCap } from 'lucide-react';
import { siteConfig } from '../data/siteContent';
import PageBack from './PageBack';

export default function CostOfLiving({ showBack = false }) {
  const iconMap = [
    <GraduationCap key="graduation" size={22} color="var(--navy-primary)" />,
    <Home key="home" size={22} color="var(--crossing)" />,
    <Coffee key="coffee" size={22} color="var(--signal)" />,
    <Bus key="bus" size={22} color="var(--scrub)" />
  ];

  return (
    <section id="custo" className="frame frame-cream-gold">
      <div className="container">
        {showBack && <PageBack />}
        <div className="section-intro">
          <div className="badge-pill badge-gold" style={{ marginBottom: '12px' }}>
            <DollarSign size={16} />
            <span>Transparência Financeira Familiar</span>
          </div>
          <h2 style={{ marginBottom: '16px' }}>
            Guia Real de Custo de Vida em Foz do Iguaçu & CDE
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            Sem surpresas no fim do mês. Veja a estimativa média completa de um estudante de Medicina vivendo com conforto e segurança na fronteira.
          </p>
        </div>

        <div className="grid-4" style={{ marginBottom: '36px' }}>
          {siteConfig.costOfLiving.map((item, index) => (
            <div key={index} className="card-clean" style={{ textAlign: 'center', padding: '24px 20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                {iconMap[index] || iconMap[0]}
              </div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '8px', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.item}
              </h3>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--gold-dark)', marginBottom: '8px' }}>
                {item.value}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* SUMMARY CALLOUT */}
        <div className="card-highlight" style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--navy-primary)', marginBottom: '8px' }}>
            Custo Total Mensal Estimado: <span style={{ color: 'var(--gold-dark)', fontWeight: '900' }}>~R$ 3.000 a R$ 4.200 / mês</span>
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 20px' }}>
            Isso inclui <strong>faculdade, moradia, alimentação e transporte</strong>. No Brasil, apenas a mensalidade de uma faculdade privada custa mais que o triplo disso!
          </p>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ padding: '12px 28px' }}
            >
            Quero o orçamento no WhatsApp
          </a>
          <p style={{
            marginTop: '16px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            lineHeight: '1.6'
          }}>
            ⚠️ Os valores são <strong>estimativas de referência</strong> e podem variar conforme o período letivo, variação cambial (BRL/PYG) e reajustes das instituições. Consulte nossa equipe para confirmar os valores atualizados.
          </p>
        </div>

      </div>
    </section>
  );
}
