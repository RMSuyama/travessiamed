import React from 'react';

const ITEMS = [
  'UCP',
  'Foz do Iguaçu',
  'Enamed INEP também no Brasil',
  'Revalida com mentoria',
  'Transferência com aproveitamento',
  'Sem vestibular tradicional',
  'Mensalidade a partir de R$ 1.655',
  'Turmas 2026.2 e 2027.1',
];

export default function MarqueeStrip() {
  const line = ITEMS.join('  —  ');

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{line}  —  {line}  —  {line}</span>
        <span>{line}  —  {line}  —  {line}</span>
      </div>
    </div>
  );
}
