import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/siteContent';

export default function WhatsAppFloating() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      title="Falar com Consultor da Travessia Med"
    >
      <MessageCircle size={30} />
    </a>
  );
}
