import React from 'react';
import { Phone } from 'lucide-react';
import { siteConfig } from '../data/siteContent';
import { scrollToView } from '../utils/viewNavigation';

export default function TopBar() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;

  return (
    <div className="utility-bar">
      <div className="container utility-bar-inner">
        <p><span>BR</span> Foz do Iguaçu <b>↔</b> Ciudad del Este <span>PY</span></p>
        <div className="utility-links">
          <a
            href="#calculadora"
            onClick={(event) => {
              event.preventDefault();
              scrollToView('calculadora');
            }}
          >
            Calcular investimento
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Phone size={13} /> Plantão de admissões
          </a>
        </div>
      </div>
    </div>
  );
}
