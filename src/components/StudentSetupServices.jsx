import React from 'react';
import { CalendarCheck2, Truck, Wrench } from 'lucide-react';
import { siteConfig } from '../data/siteContent';

const services = [
  {
    icon: Truck,
    title: 'Carreto e mudança local',
    description: 'Coleta e transporte de malas, caixas, móveis e eletrodomésticos entre Foz do Iguaçu e Ciudad del Este.',
    color: 'var(--crossing)',
    background: 'var(--crossing-soft)'
  },
  {
    icon: Wrench,
    title: 'Montagem e pequenos reparos',
    description: 'Montagem de móveis e ajustes residenciais simples para deixar o apartamento pronto para a rotina de estudos.',
    color: 'var(--signal-dark)',
    background: 'var(--gold-subtle)'
  },
  {
    icon: CalendarCheck2,
    title: 'Orçamento e agendamento',
    description: 'Ajudamos a localizar um parceiro disponível, comparar o orçamento e combinar o melhor horário para o atendimento.',
    color: 'var(--scrub-dark)',
    background: 'var(--success-soft)'
  }
];

export default function StudentSetupServices() {
  const message = encodeURIComponent(
    'Olá! Gostaria de solicitar um orçamento para carreto, mudança ou pequenos reparos.'
  );
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${message}`;

  return (
    <section id="instalacao" className="frame frame-white">
      <div className="container">
        <div className="section-intro">
          <div className="badge-pill badge-green">
            <Truck size={16} />
            <span>Apoio para sua chegada</span>
          </div>
          <h2>Mudança resolvida. Apartamento pronto.</h2>
          <p>
            Além da orientação acadêmica, conectamos você a parceiros locais para
            facilitar a mudança e os primeiros ajustes da nova casa.
          </p>
        </div>

        <div className="grid-3" style={{ marginBottom: '24px' }}>
          {services.map(({ icon: Icon, title, description, color, background }) => (
            <article key={title} className="card-clean">
              <div style={{
                width: '46px',
                height: '46px',
                display: 'grid',
                placeItems: 'center',
                marginBottom: '16px',
                color,
                background
              }}>
                <Icon size={23} />
              </div>
              <h3 style={{ marginBottom: '9px' }}>{title}</h3>
              <p style={{ fontSize: '0.9rem' }}>{description}</p>
            </article>
          ))}
        </div>

        <div className="service-partner-note">
          <p>
            <strong>Serviço sob orçamento:</strong> os atendimentos são executados
            por prestadores independentes e não estão incluídos na assessoria educacional.
            Disponibilidade e valores variam conforme endereço e demanda.
          </p>
          <div className="service-partner-actions">
            <a href="#parceiros" className="btn btn-navy">
              Quero ser parceiro
            </a>
            <a
              href={whatsappUrl}
              className="btn btn-whatsapp"
              target="_blank"
              rel="noreferrer"
            >
              Pedir orçamento
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
