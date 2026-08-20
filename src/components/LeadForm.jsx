import React, { useState } from 'react';
import { BookOpen, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteContent';
import { createWhatsAppUrl, submitContactForm } from '../utils/formSubmission';
import { isFormLocked, lockForm } from '../utils/formGuard';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    gmail: '',
    whatsapp: '',
    state: '',
    university: 'UCP',
    semester: '2026.2',
    livingPreference: 'Foz do Iguaçu (Brasil)',
    website: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(() => isFormLocked('admission'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const whatsappMessage = [
    `Olá! Meu nome é ${formData.fullName} (${formData.state}).`,
    'Preenchi o formulário da Travessia Med e gostaria de informações:',
    `• Universidade: ${formData.university}`,
    `• Semestre: ${formData.semester}`,
    `• Moradia: ${formData.livingPreference}`
  ].join('\n');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || formSubmitted) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitContactForm({
        type: 'admission',
        name: formData.fullName,
        googleEmail: formData.gmail,
        whatsapp: formData.whatsapp,
        location: formData.state,
        interest: formData.university,
        semester: formData.semester,
        housing: formData.livingPreference,
        website: formData.website,
        source: window.location.href
      });
      lockForm('admission');
      setFormSubmitted(true);
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
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(24px, 5vw, 44px)',
          color: 'var(--text-main)'
        }}>
          <div className="section-intro section-intro-compact">
            <div className="badge-pill badge-gold" style={{ marginBottom: '12px' }}>
              <BookOpen size={16} />
              <span>Atendimento Personalizado & Vagas Limitadas</span>
            </div>
            <h2 style={{ color: 'var(--navy-primary)', marginBottom: '10px' }}>
              Inicie Seu Processo de Admissão em Medicina
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Informe um Gmail. Cada endereço envia uma vez; se algum dado precisar de correção, a equipe ajusta no painel.
            </p>
          </div>

          {formSubmitted ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', background: 'var(--success-soft)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 168, 132, 0.28)' }}>
              <CheckCircle2 size={52} color="var(--success)" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--scrub-dark)', marginBottom: '8px' }}>Solicitação Recebida com Sucesso!</h3>
              <p style={{ color: 'var(--success)', fontSize: '0.95rem', marginBottom: '18px' }}>
                Esta conta Gmail já tem um envio. Se algum dado estiver errado, fale no WhatsApp que a equipe corrige no painel.
              </p>
              <a
                href={createWhatsAppUrl(siteConfig.contact.whatsappNumber, whatsappMessage)}
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
                  <label className="form-label">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ana Clara Rodrigues"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Gmail *</label>
                  <input
                    type="email"
                    required
                    placeholder="nome@gmail.com"
                    value={formData.gmail}
                    onChange={(e) => setFormData({ ...formData, gmail: e.target.value })}
                    className="form-input"
                    autoComplete="email"
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
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Estado de Origem (UF) *</label>
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

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Universidade Preferida *</label>
                    <select
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      className="form-select"
                    >
                      <option value="UCP">UCP (Ciudad del Este / PJC)</option>
                      <option value="UNADES">UNADES (Ciudad del Este)</option>
                      <option value="Ainda em dúvida / Quero comparar">Quero Comparar Ambas</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Semestre Desejado *</label>
                    <select
                      value={formData.semester}
                      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                      className="form-select"
                    >
                      <option value="2026.2">2026.2 (Próxima Turma)</option>
                      <option value="2027.1">2027.1</option>
                      <option value="Transferência de Outra Faculdade">Transferência Externa</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Onde pretende residir durante o curso?</label>
                  <select
                    value={formData.livingPreference}
                    onChange={(e) => setFormData({ ...formData, livingPreference: e.target.value })}
                    className="form-select"
                  >
                    <option value="Foz do Iguaçu (Brasil)">Foz do Iguaçu (PR) - Brasil</option>
                    <option value="Ciudad del Este (Paraguai)">Ciudad del Este - Paraguai</option>
                    <option value="Preciso de orientação">Preciso de orientação da assessoria</option>
                  </select>
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
                    Li a <Link to="/privacidade">Política de Privacidade</Link> e autorizo o
                    tratamento dos dados para responder esta solicitação e realizar o contato.
                  </span>
                </label>

                {submitError && <p className="form-error" role="alert">{submitError}</p>}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{ padding: '16px', fontSize: '1.05rem', marginTop: '8px' }}
                >
                  {isSubmitting ? 'Salvando com segurança...' : 'Registrar solicitação'}
                  {!isSubmitting && <ArrowRight size={18} />}
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="var(--success)" /> Um envio por Gmail. Correções ficam com a equipe.
                </div>
              </form>
          )}
        </div>
      </div>
    </section>
  );
}
