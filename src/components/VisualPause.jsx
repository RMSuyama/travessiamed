import React from 'react';

/**
 * Zona de transição entre quadros.
 * - pause: campo neutro (limpa a paleta visual)
 * - trama: massa de bloqueio (impede trespasse entre views)
 * - gargalo: compressão lateral antes da próxima cena
 */
export default function VisualPause({ variant = 'pause', height }) {
  const minHeight = height || (variant === 'trama' ? 72 : variant === 'gargalo' ? 88 : 56);

  return (
    <div
      className={`visual-pause visual-pause--${variant}`}
      style={{ minHeight }}
      aria-hidden="true"
    >
      {variant === 'trama' && <span className="visual-pause-hedge" />}
      {variant === 'pause' && <span className="visual-pause-hairline" />}
      {variant === 'gargalo' && (
        <>
          <span className="visual-pause-wall visual-pause-wall--left" />
          <span className="visual-pause-portal-gap" />
          <span className="visual-pause-wall visual-pause-wall--right" />
        </>
      )}
    </div>
  );
}
