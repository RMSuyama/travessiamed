import React from 'react';
import { HeartHandshake, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/siteContent';
import PageBack from './PageBack';

export default function ParentsSupport({ showBack = false }) {
  const whatsappParentsUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappParentsMessage)}`;

  return (
    <section id="familia" className="frame frame-navy frame-flow">
      <div className="container">
        {showBack && <PageBack dark />}
        <div className="family-panel">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }} className="hero-grid">
            
            <div>
              <div className="badge-pill badge-gold" style={{ marginBottom: '16px' }}>
                <HeartHandshake size={16} />
                <span>Espaço da Família</span>
              </div>

              <h2 style={{ color: '#ffffff', marginBottom: '18px' }}>
                Um recado especial para Pais e Mães de futuros Médicos
              </h2>

              <p style={{ color: 'var(--on-dark-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '24px' }}>
                Sabemos que ver um filho se mudar para estudar medicina traz orgulho, mas também muitas preocupações legítimas: <em>segurança, idoneidade da faculdade, qualidade de vida e validade do diploma</em>.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--on-dark)', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={18} color="var(--scrub)" style={{ flexShrink: 0 }} />
                  <span>Acompanhamento direto e relatórios de status aos responsáveis</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--on-dark)', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={18} color="var(--scrub)" style={{ flexShrink: 0 }} />
                  <span>Ajuda presencial na escolha de condomínios fechados em Foz do Iguaçu</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--on-dark)', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={18} color="var(--scrub)" style={{ flexShrink: 0 }} />
                  <span>Total transparência sobre a legislação do Revalida no Brasil</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href={whatsappParentsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ padding: '14px 28px' }}>
                  <MessageCircle size={20} /> Conversar com a Coordenação de Acolhimento
                </a>
              </div>
            </div>

            {/* RIGHT SIDE BADGE */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '0',
              padding: '32px 28px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '0',
                background: 'var(--gold-subtle)',
                color: 'var(--gold-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '10px' }}>
                Segurança & Presença
              </h3>
              <p style={{ color: 'var(--on-dark-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Estamos fisicamente presentes em Foz do Iguaçu (PR) e Ciudad del Este (PY) para dar todo o suporte sempre que sua família precisar.
              </p>
              <div style={{ fontSize: '0.85rem', color: 'var(--gold-light)', fontWeight: '700' }}>
                Plantão de Apoio Familiar Ativo
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
