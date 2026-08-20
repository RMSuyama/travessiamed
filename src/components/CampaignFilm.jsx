import React from 'react';
import { siteConfig } from '../data/siteContent';

export default function CampaignFilm() {
  return (
    <div className="campaign-film" aria-label="Campanha Medicina UCP 2026.2">
      {siteConfig.campaignGallery.map((shot) => (
        <a key={shot.src} href="#formulario" className="campaign-shot">
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
