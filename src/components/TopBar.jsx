import React from 'react';
import { Phone } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '../data/siteContent';

export default function TopBar() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;

  return (
    <div className="utility-bar">
      <div className="container utility-bar-inner">
        <p><span>BR</span> Foz do Iguaçu <b>↔</b> Ciudad del Este <span>PY</span></p>
        <div className="utility-links">
          <Link href="/custos">
            Ver mensalidades
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Phone size={13} /> Plantão de admissões
          </a>
        </div>
      </div>
    </div>
  );
}
