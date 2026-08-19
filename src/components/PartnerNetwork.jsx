import React, { useState } from 'react';
import { CheckCircle2, Handshake, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../data/siteContent';

export default function PartnerNetwork() {
  const [form, setForm] = useState({
    name: '',
    city: '',
    service: '',
    phone: '',
    experience: ''
  });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitApplication = (event) => {
    event.preventDefault();
    const message = [
      'Olá! Quero fazer parte da rede de parceiros da Travessia Med.',
      `Nome/empresa: ${form.name}`,
      `Cidade de atendimento: ${form.city}`,
      `Serviço: ${form.service}`,
      `Telefone: ${form.phone}`,
      `Experiência: ${form.experience || 'Não informada'}`
    ].join('\n');

    window.open(
      `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="parceiros" className="frame frame-navy">
      <div className="container partner-network-grid">
        <div>
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

        <form className="lead-panel partner-form" onSubmit={submitApplication}>
          <div>
            <span className="form-label">Cadastro inicial</span>
            <h3 style={{ marginTop: '6px' }}>Quero entrar para a rede</h3>
          </div>

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
                <option>Montagem de móveis</option>
                <option>Pequenos reparos</option>
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

          <label className="data-consent">
            <input type="checkbox" required />
            <span>
              Li a <a href="#privacidade">Política de Privacidade</a> e autorizo o
              tratamento dos dados para análise do cadastro e contato.
            </span>
          </label>

          <button type="submit" className="btn btn-primary">
            Enviar cadastro pelo WhatsApp
          </button>

          <p className="partner-form-note">
            <ShieldCheck size={15} />
            O envio não garante credenciamento. A equipe poderá solicitar referências
            e documentos antes de indicar o profissional.
          </p>
        </form>
      </div>
    </section>
  );
}
