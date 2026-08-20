import React, { useState } from 'react';
import { CheckCircle2, Handshake, MessageCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteContent';
import { createWhatsAppUrl, submitContactForm } from '../utils/formSubmission';
import { isFormLocked, lockForm } from '../utils/formGuard';

export default function PartnerNetwork() {
  const [form, setForm] = useState({
    name: '',
    gmail: '',
    city: '',
    service: '',
    phone: '',
    experience: '',
    website: ''
  });
  const [submitted, setSubmitted] = useState(() => isFormLocked('partner'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const whatsappMessage = [
    'Olá! Quero fazer parte da rede de parceiros da Travessia Med.',
    `Nome/empresa: ${form.name}`,
    `Cidade de atendimento: ${form.city}`,
    `Serviço: ${form.service}`,
    `Telefone: ${form.phone}`,
    `Experiência: ${form.experience || 'Não informada'}`
  ].join('\n');

  const submitApplication = async (event) => {
    event.preventDefault();
    if (isSubmitting || submitted) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitContactForm({
        type: 'partner',
        name: form.name,
        googleEmail: form.gmail,
        whatsapp: form.phone,
        location: form.city,
        interest: form.service,
        experience: form.experience,
        website: form.website,
        source: window.location.href
      });
      lockForm('partner');
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="parceiros" className="frame frame-navy">
      <div className="container partner-network-grid">
        <div>
          <Link to="/" className="route-back-link route-back-link-dark">← Voltar para Medicina no Paraguai</Link>
          <div className="badge-pill">
            <Handshake size={16} />
            <span>Rede local de confiança</span>
          </div>
          <h2 style={{ margin: '18px 0' }}>Presta um bom serviço na fronteira?</h2>
          <p style={{ maxWidth: '570px', marginBottom: '24px' }}>
            Estamos formando uma rede de profissionais para atender estudantes e
            famílias em Foz do Iguaçu e Ciudad del Este.
          </p>

          <div className="partner-benefits">
            <div><CheckCircle2 size={18} /> Solicitações alinhadas ao seu tipo de serviço</div>
            <div><CheckCircle2 size={18} /> Contato direto para orçamento e agendamento</div>
            <div><CheckCircle2 size={18} /> Divulgação sem promessa de demanda mínima</div>
          </div>
        </div>

        <div className="lead-panel partner-form">
          <div>
            <span className="form-label">Cadastro inicial</span>
            <h3 style={{ marginTop: '6px' }}>Quero entrar para a rede</h3>
          </div>

          {submitted ? (
            <div className="form-success" role="status">
              <CheckCircle2 size={18} />
              <span>
                Cadastro registrado para análise. Se precisar corrigir algum dado, fale no WhatsApp.{' '}
                <a
                  href={createWhatsAppUrl(siteConfig.contact.whatsappNumber, whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={15} /> continue no WhatsApp
                </a>.
              </span>
            </div>
          ) : (
            <form onSubmit={submitApplication}>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="partner-name">Nome ou empresa</label>
                    <input
                      id="partner-name"
                      className="form-input"
                      name="name"
                      value={form.name}
                      onChange={updateField}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="partner-phone">WhatsApp</label>
                    <input
                      id="partner-phone"
                      className="form-input"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={updateField}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="partner-gmail">Gmail</label>
                  <input
                    id="partner-gmail"
                    className="form-input"
                    name="gmail"
                    type="email"
                    placeholder="nome@gmail.com"
                    value={form.gmail}
                    onChange={updateField}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="partner-city">Cidade de atendimento</label>
                    <select
                      id="partner-city"
                      className="form-select"
                      name="city"
                      value={form.city}
                      onChange={updateField}
                      required
                    >
                      <option value="">Selecione</option>
                      <option>Foz do Iguaçu</option>
                      <option>Ciudad del Este</option>
                      <option>Foz do Iguaçu e Ciudad del Este</option>
                      <option>Outra cidade da região</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="partner-service">Serviço principal</label>
                    <select
                      id="partner-service"
                      className="form-select"
                      name="service"
                      value={form.service}
                      onChange={updateField}
                      required
                    >
                      <option value="">Selecione</option>
                      <option>Carreto e mudança</option>
                      <option>Limpeza residencial</option>
                      <option>Outro serviço</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="partner-experience">Experiência e referências</label>
                  <textarea
                    id="partner-experience"
                    className="form-textarea"
                    name="experience"
                    rows="3"
                    value={form.experience}
                    onChange={updateField}
                    placeholder="Conte brevemente sobre seus serviços."
                  />
                </div>

                <div className="form-honeypot" aria-hidden="true">
                  <label htmlFor="partner-website">Não preencha este campo</label>
                  <input
                    id="partner-website"
                    name="website"
                    tabIndex="-1"
                    autoComplete="off"
                    value={form.website}
                    onChange={updateField}
                  />
                </div>

                <label className="data-consent">
                  <input type="checkbox" required />
                  <span>
                    Li a <Link to="/privacidade">Política de Privacidade</Link> e autorizo o
                    tratamento dos dados para análise do cadastro e contato.
                  </span>
                </label>

                {submitError && <p className="form-error" role="alert">{submitError}</p>}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Salvando com segurança...' : 'Registrar cadastro para análise'}
                </button>

                <p className="partner-form-note">
                  <ShieldCheck size={15} />
                  Um cadastro por Gmail. Correções ficam com a equipe, se o cliente pedir.
                </p>
              </form>
          )}
        </div>
      </div>
    </section>
  );
}
