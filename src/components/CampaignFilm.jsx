import React from 'react';
import { siteConfig } from '../data/siteContent';
import { createWhatsAppUrl } from '../utils/formSubmission';

export default function CampaignFilm() {
  const whatsappUrl = createWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    siteConfig.contact.whatsappMessage
  );

  return (
    <div className="campaign-film" aria-label="Campanha Medicina UCP 2026.2">
      {siteConfig.campaignGallery.map((shot) => (
        <a key={shot.src} href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="campaign-shot">
          <img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            style={{ objectPosition: shot.objectPosition }}
          />
          <span className="campaign-shot-copy">
            <small>{shot.kicker}</small>
            <strong>{shot.caption}</strong>
          </span>
        </a>
      ))}
    </div>
  );
}
