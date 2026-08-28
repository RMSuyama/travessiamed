'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/siteContent';

export default function Faq() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <section id="faq" className="frame frame-white frame-flow">
      <div className="container-narrow">
        
        <div className="section-intro">
          <div className="badge-pill badge-navy" style={{ marginBottom: '12px' }}>
            <HelpCircle size={16} />
            <span>Dúvidas Frequentes</span>
          </div>
          <h2 style={{ marginBottom: '12px' }}>
            Perguntas frequentes
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            Diploma, vestibular, transferência com aproveitamento, moradia e o que os pais mais perguntam.
          </p>
        </div>

        <div>
          {siteConfig.faq.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="accordion-item">
                <div className="accordion-header" onClick={() => toggleFaq(index)}>
                  <span style={{ fontSize: '1.05rem' }}>{item.q}</span>
                  <ChevronDown 
                    size={20} 
                    style={{ 
                      transform: isOpen ? 'rotate(180deg)' : 'none', 
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                      marginLeft: '16px',
                      color: 'var(--navy-primary)'
                    }} 
                  />
                </div>
                {isOpen && (
                  <div className="accordion-content">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
