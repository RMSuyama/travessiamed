import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '../data/siteContent';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--navy-dark)',
      color: 'var(--on-dark-muted)',
      padding: 'clamp(40px, 6vw, 60px) 0 24px',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container">
        
        <div className="footer-grid" style={{ marginBottom: '48px' }}>
          
          {/* BRAND INFO */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="logo-mark">
                <img
                  src={siteConfig.brand.logoPath}
                  alt={siteConfig.brand.name}
                />
              </span>
              <div>
                <div style={{ color: '#ffffff', fontFamily: 'var(--font-brand)', fontSize: '1.3rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                  TRAVESSIA <span style={{ color: 'var(--gold-primary)' }}>MED</span>
                </div>
                <div style={{ color: 'var(--gold-light)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.05em' }}>
                  {siteConfig.brand.tagline}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--on-dark-muted)', lineHeight: 1.6, maxWidth: '380px' }}>
              {siteConfig.brand.description}
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '16px' }}>Links Rápidos</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><a href="/#universidades" style={{ color: 'var(--on-dark-muted)', textDecoration: 'none' }}>UCP — habilitada e credenciada</a></li>
              <li><a href="/#universidades" style={{ color: 'var(--on-dark-muted)', textDecoration: 'none' }}>UNADES — habilitada e credenciada</a></li>
              <li><Link href="/custos" style={{ color: 'var(--on-dark-muted)', textDecoration: 'none' }}>Custos, custo de vida e simulador</Link></li>
              <li><Link href="/familia" style={{ color: 'var(--on-dark-muted)', textDecoration: 'none' }}>Espaço da família</Link></li>
              <li><Link href="/duvidas" style={{ color: 'var(--on-dark-muted)', textDecoration: 'none' }}>Mitos, verdades e dúvidas</Link></li>
              <li><Link href="/servicos" style={{ color: 'var(--on-dark-muted)', textDecoration: 'none' }}>Carreto e mudança</Link></li>
              <li><Link href="/parceiros" style={{ color: 'var(--on-dark-muted)', textDecoration: 'none' }}>Faça parte da rede de parceiros</Link></li>
              <li><Link href="/privacidade" style={{ color: 'var(--on-dark-muted)', textDecoration: 'none' }}>Privacidade, LGPD e Termos</Link></li>
            </ul>
          </div>

          {/* LOCATIONS & CONTACT */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '16px' }}>Atendimento & Sedes</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--on-dark-muted)' }}>
              {siteConfig.contact.locations.map((loc, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <MapPin size={18} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{loc}</span>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={18} color="#25D366" style={{ flexShrink: 0 }} />
                <span>Plantão de Admissões via WhatsApp</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.8rem',
          color: 'var(--on-dark-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} {siteConfig.brand.name}. Todos os direitos reservados.
          </div>
          <div>
            Conformidade com a legislação educacional e migratória Mercosul / MEC Paraguai.
          </div>
        </div>

      </div>
    </footer>
  );
}
