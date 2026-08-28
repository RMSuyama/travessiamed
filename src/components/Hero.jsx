import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/siteContent';

export default function Hero() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;

  return (
    <section id="inicio" className="frame is-revealed hero-frame">
      <div className="hero-billboard">
        <div className="hero-billboard-copy">
          <h1>Medicina sem vestibular.</h1>
          <p>UCP · Ciudad del Este · 1º semestre R$ 1.840</p>
          <div className="hero-actions">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
              <MessageCircle size={18} /> Falar no WhatsApp
            </a>
            <a href="#formulario" className="btn btn-quiet btn-lg">
              Deixar meu contato
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
