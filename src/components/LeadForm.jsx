import React, { useState } from 'react';
import { BookOpen, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../data/siteContent';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    state: '',
    university: 'UCP',
    semester: '2026.2',
    livingPreference: 'Foz do Iguaçu (Brasil)'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const whatsappDirectUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // Create WhatsApp message link with form details
    const msg = `Olá! Meu nome é *${formData.fullName}* (${formData.state}).%0A` +
      `Gostaria de informações sobre Medicina no Paraguai:%0A` +
      `• Universidade: *${formData.university}*%0A` +
      `• Semestre: *${formData.semester}*%0A` +
      `• Moradia pretendida: *${formData.livingPreference}*%0A` +
      `• E-mail: ${formData.email}`;

    // Open WhatsApp in new tab after 1.2s
    setTimeout(() => {
      window.open(`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${msg}`, '_blank');
    }, 1200);
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
              Preencha os dados para falar com um consultor acadêmico da Travessia Med e receber a grade curricular e custos detalhados.
            </p>
          </div>

          {formSubmitted ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', background: 'var(--success-soft)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 168, 132, 0.28)' }}>
              <CheckCircle2 size={52} color="var(--success)" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--scrub-dark)', marginBottom: '8px' }}>Solicitação Recebida com Sucesso!</h3>
              <p style={{ color: 'var(--success)', fontSize: '0.95rem', marginBottom: '20px' }}>
                Estamos redirecionando você para o nosso consultor no WhatsApp com os dados pré-preenchidos.
              </p>
              <a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <MessageCircle size={18} /> Abrir WhatsApp Agora
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
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  className="form-input"
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
                    onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Seu Melhor E-mail *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="ana@email.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label">Estado de Origem (UF) *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ex: PR, SP, SC"
                    value={formData.state}
                    onChange={e => setFormData({...formData, state: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Universidade Preferida *</label>
                  <select 
                    value={formData.university}
                    onChange={e => setFormData({...formData, university: e.target.value})}
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
                    onChange={e => setFormData({...formData, semester: e.target.value})}
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
                  onChange={e => setFormData({...formData, livingPreference: e.target.value})}
                  className="form-select"
                >
                  <option value="Foz do Iguaçu (Brasil)">Foz do Iguaçu (PR) - Brasil</option>
                  <option value="Ciudad del Este (Paraguai)">Ciudad del Este - Paraguai</option>
                  <option value="Preciso de orientação">Preciso de orientação da assessoria</option>
                </select>
              </div>

              <label className="data-consent">
                <input type="checkbox" required />
                <span>
                  Li a <a href="#privacidade">Política de Privacidade</a> e autorizo o
                  tratamento dos dados para responder esta solicitação e realizar o contato.
                </span>
              </label>

              <button type="submit" className="btn btn-primary" style={{ padding: '16px', fontSize: '1.05rem', marginTop: '8px' }}>
                Garantir Atendimento & Receber Informações <ArrowRight size={18} />
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="var(--success)" /> O envio será concluído pelo WhatsApp, conforme nossa política de privacidade.
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
