import React from 'react';
import { Building2, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/siteContent';
import CampaignFilm from './CampaignFilm';

export default function Universities() {
  return (
    <section id="universidades" className="frame frame-cream">
      <div className="container">
        
        <div className="section-intro">
          <div className="badge-pill badge-navy" style={{ marginBottom: '12px' }}>
            <Building2 size={16} />
            <span>Instituições Habilitadas & Reconhecidas</span>
          </div>
          <h2 style={{ marginBottom: '16px' }}>
            UCP e UNADES
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            Duas instituições em Ciudad del Este, com prática hospitalar, ingresso direto e transferência com aproveitamento de matérias.
          </p>
        </div>

        <CampaignFilm />

        <div className="uni-frames">
          {siteConfig.universities.map((uni, uniIndex) => (
            <React.Fragment key={uni.id}>
            {uniIndex > 0 && <div className="trama-vertical" aria-hidden="true" />}
            <div
              className={`card-clean${uni.photo ? ' has-photo' : ''}`}
              style={{
                border: `2px solid ${uni.badgeBg}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {uni.photo && (
                <figure className="uni-photo">
                  <img
                    src={uni.photo}
                    alt={uni.photoAlt}
                    loading="lazy"
                    style={{ objectPosition: uni.photoPosition || 'center' }}
                  />
                </figure>
              )}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '12px' }}>
                  <div>
                    <span style={{
                      background: uni.badgeBg,
                      color: uni.badgeColor,
                      fontWeight: '800',
                      fontSize: '0.78rem',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      display: 'inline-block',
                      marginBottom: '6px'
                    }}>
                      {uni.sealTag}
                    </span>
                    <h3 style={{ marginTop: '4px', color: 'var(--navy-primary)' }}>
                      {uni.name}
                    </h3>
                  </div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: uni.avatarBg,
                    border: `2px solid ${uni.badgeColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '900',
                    color: uni.badgeColor,
                    fontSize: '1.2rem',
                    flexShrink: 0
                  }}>
                    {uni.sealInitial}
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  {uni.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {uni.highlights.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--navy-primary)' }}>
                      <CheckCircle2 size={16} color={uni.badgeColor} style={{ flexShrink: 0, marginTop: '3px' }} /> 
                      <span><strong>{item.label}:</strong> {item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="uni-footer-flex" style={{
                background: 'var(--bg-subtle)',
                padding: '18px 20px',
                borderRadius: 'var(--radius-md)',
                borderTop: '1px solid var(--border-light)'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Mensalidade inicial</div>
                  <div style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--navy-primary)' }}>
                    {uni.monthlyLabel} <span style={{ fontSize: '0.85rem', fontWeight: '400', color: 'var(--text-muted)' }}>/mês</span>
                  </div>
                  {uni.monthlyDiscountLabel && (
                    <div style={{ color: 'var(--scrub-dark)', fontSize: '0.78rem', fontWeight: '700' }}>
                      {uni.monthlyDiscountLabel}
                    </div>
                  )}
                  {uni.pricingReference && (
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>
                      {uni.pricingReference}
                    </div>
                  )}
                </div>
                <a href="#formulario" className="btn btn-navy" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
                  {uni.buttonText}
                </a>
              </div>
            </div>
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
