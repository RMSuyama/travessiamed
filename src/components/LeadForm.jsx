'use client';

import React, { useState } from 'react';
import { BookOpen, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '../data/siteContent';
import { createWhatsAppUrl, submitContactForm } from '../utils/formSubmission';
import { isFormLocked, lockForm } from '../utils/formGuard';

function buildWhatsAppMessage({ fullName, state, path }) {
  const intent = path.includes('Transferência')
    ? 'Quero transferência para Medicina na UCP, com análise de aproveitamento de matérias.'
    : 'Quero informações sobre Medicina na UCP, turma 2026.2.';
  return [
    `Olá! Meu nome é ${fullName}${state ? ` (${state})` : ''}.`,
    intent
  ].join('\n');
}

export default function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    state: '',
    path: 'Turma 2026.2',
    website: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(() => isFormLocked('admission'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const whatsappUrl = createWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    buildWhatsAppMessage(formData)
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || formSubmitted) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitContactForm({
        type: 'admission',
        name: formData.fullName,
        googleEmail: formData.email,
        whatsapp: formData.whatsapp,
        location: formData.state,
        interest: formData.path.includes('Transferência') ? 'Transferência UCP' : 'UCP',
        semester: formData.path,
        housing: 'Foz do Iguaçu (Brasil)',
        website: formData.website,
        source: window.location.href
      });
      lockForm('admission');
      setFormSubmitted(true);
      window.location.assign(
        createWhatsAppUrl(
          siteConfig.contact.whatsappNumber,
          buildWhatsAppMessage(formData)
        )
      );
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="formulario" className="frame frame-navy-dark">
      <div className="container-narrow">
        <div className="lead-panel" style={{
          padding: 'clamp(24px, 5vw, 44px)',
          color: 'var(--text-main)'
        }}>
          <div className="section-intro section-intro-compact">
            <div className="badge-pill badge-gold" style={{ marginBottom: '12px' }}>
              <BookOpen size={16} />
              <span>Turma 2026.2 · vagas limitadas</span>
            </div>
            <h2 style={{ color: 'var(--navy-primary)', marginBottom: '10px' }}>
              Deixe seu contato
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Nome, WhatsApp e estado. Diga se é ingresso novo ou transferência.
            </p>
          </div>

          {formSubmitted ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', background: 'var(--success-soft)', border: '1px solid var(--scrub)' }}>
              <CheckCircle2 size={52} color="var(--success)" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--scrub-dark)', marginBottom: '8px' }}>Contato recebido</h3>
              <p style={{ color: 'var(--success)', fontSize: '0.95rem', marginBottom: '18px' }}>
                Se o WhatsApp não abriu, toque no botão abaixo. Se algum dado estiver errado, a equipe corrige no atendimento.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={18} /> Continuar no WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div className="form-group">
                  <label className="form-label">Nome completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ana Clara Rodrigues"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="form-input"
                    autoComplete="name"
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">WhatsApp com DDD *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(45) 99999-9999"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="form-input"
                      autoComplete="tel"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Estado (UF) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: PR, SP, SC"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Como quer ingressar? *</label>
                  <select
                    required
                    value={formData.path}
                    onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                    className="form-select"
                  >
                    <option value="Turma 2026.2">Turma 2026.2 — início</option>
                    <option value="Transferência com aproveitamento de matérias">Transferência — validação e aproveitamento de matérias</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">E-mail (opcional)</label>
                  <input
                    type="email"
                    placeholder="seunome@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    autoComplete="email"
                  />
                </div>

                <div className="form-honeypot" aria-hidden="true">
                  <label htmlFor="admission-website">Não preencha este campo</label>
                  <input
                    id="admission-website"
                    name="website"
                    tabIndex="-1"
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <label className="data-consent">
                  <input type="checkbox" required />
                  <span>
                    Li a <Link href="/privacidade">Política de Privacidade</Link> e autorizo o
                    tratamento dos dados para responder esta solicitação e realizar o contato.
                  </span>
                </label>

                {submitError && <p className="form-error" role="alert">{submitError}</p>}

                <button
                  type="submit"
                  className="btn btn-whatsapp"
                  disabled={isSubmitting}
                  style={{ padding: '16px', fontSize: '1.05rem', marginTop: '8px' }}
                >
                  {isSubmitting ? 'Salvando...' : 'Enviar e falar no WhatsApp'}
                  {!isSubmitting && <ArrowRight size={18} />}
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="var(--success)" /> Sem vestibular. Também transferência com aproveitamento.
                </div>
              </form>
          )}
        </div>
      </div>
    </section>
  );
}
